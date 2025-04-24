import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../theme/theme';
import ThreeDots from '../components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      // Envia a requisição para o backend para redefinir a senha
      const response = await fetch('https://seu-backend.com/api/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir a senha.');
      }

      setLoading(false);
      Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso.');
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error.message || 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Redefinir Senha</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Insira sua nova senha e confirme para redefinir.
        </Text>
        <TextInput
          placeholder="Nova Senha"
          placeholderTextColor={colors.muted}
          secureTextEntry
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          placeholder="Confirmar Nova Senha"
          placeholderTextColor={colors.muted}
          secureTextEntry
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={handlePasswordReset}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots />
          ) : (
            <Text style={[styles.buttonText, { color: colors.background }]}>Confirmar</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>© 2025 FURIA. All Rights Reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});