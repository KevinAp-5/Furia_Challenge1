package com.usermanager.manager.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import com.usermanager.manager.dto.authentication.AccessTokenDTO;
import com.usermanager.manager.dto.authentication.ActivateUserDTO;
import com.usermanager.manager.dto.authentication.AuthenticationDTO;
import com.usermanager.manager.dto.authentication.CreateUserDTO;
import com.usermanager.manager.dto.authentication.LoginResponseDTO;
import com.usermanager.manager.dto.authentication.PasswordResetWithEmailDTO;
import com.usermanager.manager.dto.authentication.TokensDTO;
import com.usermanager.manager.dto.authentication.UserCreatedDTO;
import com.usermanager.manager.dto.authentication.UserEmailDTO;
import com.usermanager.manager.dto.common.ResponseMessage;
import com.usermanager.manager.dto.user.ProfileDTO;
import com.usermanager.manager.exception.authentication.TokenInvalidException;
import com.usermanager.manager.service.auth.AuthService;
import com.usermanager.manager.service.auth.VerificationTokenService;
import com.usermanager.manager.service.user.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/api/auth/")
@Slf4j
public class AuthController {
    private static final int COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

    private final AuthService authService;
    private final UserService userService;
    private final VerificationTokenService verificationService;

    public AuthController(AuthService authService, UserService userService,
            VerificationTokenService verificationService) {
        this.authService = authService;
        this.userService = userService;
        this.verificationService = verificationService;
    }

    @PostMapping("register")
    public ResponseEntity<UserCreatedDTO> createUser(@RequestBody @Valid CreateUserDTO dto) {
        UserCreatedDTO response = userService.createUser(dto);
        return ResponseEntity.created(UriComponentsBuilder.fromPath("/api/users")
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri())
                .body(response);
    }

    @GetMapping("register/confirm")
    public String confirmUser(@RequestParam("token") @NotBlank String token) {
        boolean validated = verificationService.confirmVerificationToken(convertStringToUUID(token));
        if (validated) {
            return "account_confirmed";
        }

        return "account_not_confirmed";
    }

    @PostMapping("password/forget")
    public ResponseEntity<ResponseMessage> sendPasswordResetCode(@RequestBody @Valid UserEmailDTO data) {
        boolean response = authService.sendPasswordResetCode(data);
        if (!response)
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("User is not enabled. please confirm the email."));

        return ResponseEntity.ok(new ResponseMessage("Password reset link was sent to your e-mail."));
    }

    @PostMapping("password/reset")
    public ResponseEntity<ResponseMessage> confirmPasswordReset(@RequestBody @Valid PasswordResetWithEmailDTO data) {
        authService.passwordReset(data);

        return ResponseEntity.ok().body(new ResponseMessage("Password changed successfully."));
    }

    @GetMapping("/password/reset/confirmEmail")
    public String confirmEmailreset(@RequestParam("token") String uuid, Model model) {
        boolean confirmado = authService.confirmEmail(convertStringToUUID(uuid));
        if (!confirmado) {
            return "index-error";
        }

        return "index";
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data,
            HttpServletResponse response) {
        TokensDTO tokens = authService.login(data);
        response.addCookie(createCookie("refreshToken", tokens.refreshToken()));
        return ResponseEntity.ok().body(new LoginResponseDTO(tokens.accessToken()));
    }

    @PostMapping("token/refresh")
    public ResponseEntity<LoginResponseDTO> refreshToken(
            @CookieValue(name = "refreshToken", defaultValue = "") String token, HttpServletResponse response) {

        if (token.isBlank())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDTO("Refresh token is missing."));

        TokensDTO newTokens = authService.refreshToken(token);

        response.addCookie(createCookie("refreshToken", newTokens.refreshToken()));
        return ResponseEntity.ok().body(new LoginResponseDTO(newTokens.accessToken()));
    }

    @PostMapping("activate")
    public ResponseEntity<ResponseMessage> activateUser(@RequestBody @Valid ActivateUserDTO data) {
        boolean activationSent = authService.sendActivationCode(data.email());
        if (!activationSent)
            return ResponseEntity.status(200)
                    .body(new ResponseMessage("User is already active with email: " + data.email()));

        return ResponseEntity.ok(new ResponseMessage("Activation link sent to " + data.email() + " successfully."));
    }

    @PostMapping("email/confirmed")
    public ResponseEntity<ResponseMessage> isEmailConfirmed(@RequestBody UserEmailDTO data) {
        var user = userService.findUserByLogin(data.email());
        var verificationToken = verificationService.findVerificationByUser(user);
        boolean validated = verificationToken.isActivated();
        if (validated) {
            return ResponseEntity.ok(new ResponseMessage("email activated."));
        }

        return ResponseEntity.badRequest().body(new ResponseMessage("email not activated."));
    }

    @PostMapping("me")
    public ResponseEntity<ProfileDTO> getUserInfo(@RequestBody @Valid AccessTokenDTO token) {
        var response = authService.getUserProfile(token);
        return ResponseEntity.ok(response);
    }

    @GetMapping("cron")
    public ResponseEntity<String> cronJob() {
        log.info("Application is running.");
        return ResponseEntity.ok("Application is working.");
    }

    private Cookie createCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "Strict");
        cookie.setMaxAge(COOKIE_MAX_AGE);
        return cookie;
    }

    private UUID convertStringToUUID(String token) {
        try {
            return UUID.fromString(token);
        } catch (IllegalArgumentException e) {
            throw new TokenInvalidException("invalid token format.");
        }
    }
}