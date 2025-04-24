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
      // Envia a requisição para o backend para iniciar o processo de recuperação de senha
      const response = await fetch('https://seu-backend.com/api/password-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao solicitar recuperação de senha.');
      }

      // Loop para verificar o status da recuperação de senha
      const checkStatus = async () => {
        const statusResponse = await fetch(`https://seu-backend.com/api/password-recovery/status?email=${email}`);
        const statusData = await statusResponse.json();

        if (statusData.status === 'completed') {
          setLoading(false);
          Alert.alert('Sucesso', 'Um e-mail de recuperação foi enviado para você.');
          navigation.navigate('PasswordResetEmailConfirmed'); // Redireciona para a tela de confirmação
        } else if (statusData.status === 'pending') {
          setTimeout(checkStatus, 3000); // Tenta novamente após 3 segundos
        } else {
          setLoading(false);
          Alert.alert('Erro', 'Não foi possível processar sua solicitação. Tente novamente mais tarde.');
        }
      };

      checkStatus();
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
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