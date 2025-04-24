import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }: any) {
  const { colors } = useTheme();

  const handleLogout = () => {
    Alert.alert('Logout', 'Você tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('Login'); // Redireciona para a tela de login
        },
      },
    ]);
  };

  const handleChangePassword = () => {
    Alert.alert('Modificar Senha', 'Redirecionando para a tela de modificação de senha...');
    navigation.navigate('ChangePassword'); // Redireciona para a tela de modificação de senha
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={require('../assets/furia.png')} style={styles.logo} />
          <Text style={[styles.title, { color: colors.primary }]}>Perfil</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.muted }]}>Nome:</Text>
          <Text style={[styles.value, { color: colors.primary }]}>Usuário FURIA</Text>
          <Text style={[styles.label, { color: colors.muted }]}>E-mail:</Text>
          <Text style={[styles.value, { color: colors.primary }]}>usuario@furia.com</Text>
          <Text style={[styles.label, { color: colors.muted }]}>Data de Registro:</Text>
          <Text style={[styles.value, { color: colors.primary }]}>24/04/2025</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={handleChangePassword}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Modificar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Logout</Text>
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
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