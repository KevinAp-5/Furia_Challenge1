import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const PasswordResetEmailConfirmed = ({ navigation }: any) => {
  const { colors } = useTheme();

  const handleGoToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>E-mail Enviado!</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Verifique sua caixa de entrada para redefinir sua senha.
        </Text>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/check-icon.png')} // Substitua pelo caminho correto do ícone
            style={styles.icon}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={handleGoToForgotPassword}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>© 2025 FURIA. All Rights Reserved.</Text>
      </View>
    </SafeAreaView>
  );
};

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
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: "#000000",
    borderRadius: 75,
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

export default PasswordResetEmailConfirmed;