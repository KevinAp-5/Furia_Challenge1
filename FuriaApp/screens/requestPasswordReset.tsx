import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useTheme } from '../theme/theme';
import ThreeDots from '../components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestPasswordReset({ navigation }: any) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordRecovery = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
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
      Alert.alert('Erro', error.message || 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Imagem de e-mail */}
        <Image
          source={require('../assets/mail.png')} // Substitua pelo caminho correto da imagem
          style={styles.mailIcon}
        />
        <Text style={[styles.title, { color: colors.primary }]}>Recuperação de Senha</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Insira seu e-mail para receber um link de recuperação de senha.
        </Text>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
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
            <Text style={[styles.buttonText, { color: colors.background }]}>Confirmar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
  },
  mailIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});