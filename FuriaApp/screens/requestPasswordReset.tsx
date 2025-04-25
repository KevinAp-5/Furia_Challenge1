import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useTheme } from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../components/title";
import ThreeDots from "../components/loading";
import { api } from "../config/Api";

export default function RequestPasswordReset({ navigation }: any) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordRecovery = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);
    try {
      // 1. Envia o e-mail para o backend
      const response = await api("POST", "auth/password/forget", { email });
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Erro ao enviar solicitação.");
      }
      Alert.alert("E-mail enviado!", "Verifique sua caixa de entrada e confirme o e-mail.");

      // 2. Inicia o polling para verificar se o e-mail foi confirmado
      await waitForEmailConfirmation(email);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Polling: verifica se o e-mail foi confirmado no backend
  const waitForEmailConfirmation = async (email: string) => {
    let attempts = 0;
    const maxAttempts = 18; // ~1min30s (18 * 5s)
    await delay(5000); // Espera 5 segundos antes de começar a verificar

    while (attempts < maxAttempts) {
      try {
        const response = await api("POST", "auth/email/confirmed", { email });
        // O backend retorna { message: "email activated." } se confirmado
        if (
          response.status === 200 &&
          typeof response.data?.message === "string" &&
          response.data.message.trim().toLowerCase() === "email activated."
        ) {
          Alert.alert("Sucesso", "E-mail confirmado com sucesso!");
          navigation.navigate("PasswordResetEmailConfirmed");
          return;
        }
      } catch (error: any) {
        // Se não confirmado, ignora e tenta novamente
      }
      await delay(5000);
      attempts++;
    }
    Alert.alert(
      "Atenção",
      "Confirmação de e-mail não concluída a tempo. Tente novamente."
    );
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleError = (error: any) => {
    if (!error.response) {
      Alert.alert(
        "Erro",
        error.message || "Erro desconhecido. Tente novamente."
      );
      return;
    }
    const { status, data } = error.response;
    const message = data?.message || "Tente novamente mais tarde.";
    switch (status) {
      case 400:
        Alert.alert("Erro de Validação", message);
        break;
      default:
        Alert.alert(
          "Erro Desconhecido",
          `Status: ${status || "N/A"} - ${message}`
        );
        break;
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
              source={require("../assets/mail.png")}
              style={styles.logo}
            />
            <Text style={[styles.title, { color: colors.primary }]}>
              Recuperação de Senha
            </Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Insira seu e-mail para receber um link de recuperação de senha.
            </Text>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={colors.muted}
              style={[
                styles.input,
                { color: colors.primary, borderColor: colors.secondary },
              ]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secondary }]}
              onPress={handlePasswordRecovery}
              disabled={loading}
            >
              {loading ? (
                <ThreeDots />
              ) : (
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Confirmar
                </Text>
              )}
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
    justifyContent: "space-between",
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
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
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
  footer: {
    alignItems: "center",
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
  },
});