import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useTheme } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import ThreeDots from "../components/loading";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../components/title";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../config/Api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      const response = await api(
        "POST",
        "auth/login",
        { "login": email, password }
      );
      if (response.status === 200 && response.data?.accessToken) {
        // Aqui você pode salvar o token se quiser
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", "E-mail ou senha inválidos.");
      }
    } catch (error: any) {
      Alert.alert("Erro", error?.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Home");
      }, 2000);
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Title title="FURIA" />
          <View
            style={[styles.content, { backgroundColor: colors.background }]}
          >
            <Image
              source={require("../assets/furia.png")}
              style={styles.logo}
            />
            <Text style={[styles.title, { color: colors.primary }]}>
              Entrar no universo FURIA
            </Text>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={[
                styles.input,
                { color: colors.primary, borderColor: colors.secondary },
              ]}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                style={[
                  styles.input,
                  { color: colors.primary, borderColor: colors.secondary },
                ]}
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={colors.muted}
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("RequestPassword")}
              style={styles.forgotPasswordButton}
            >
              <Text
                style={[styles.forgotPasswordText, { color: colors.highlight }]}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secondary }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ThreeDots />
              ) : (
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.googleButton, { borderColor: colors.highlight }]}
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <ThreeDots />
              ) : (
                <Text
                  style={[styles.googleButtonText, { color: colors.highlight }]}
                >
                  Continuar com Google
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.registerButton, { borderColor: colors.accent }]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                style={[styles.registerButtonText, { color: colors.accent }]}
              >
                Registrar-se
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              © 2025 FURIA. All Rights Reserved.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Garante que o conteúdo e o rodapé fiquem separados
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,

  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  buttonText: {
    fontWeight: "bold",
  },
  googleButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    borderWidth: 1,
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end", // Alinha o botão à direita
    marginTop: 8,
    marginRight: "1%", // Pequeno espaçamento da borda direita
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 16,
  },
});
