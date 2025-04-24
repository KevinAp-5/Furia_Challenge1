import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useTheme } from '../theme/theme';
import axios from 'axios';
import ThreeDots from '../components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://your-backend-url.com/register', {
        name,
        email,
        password,
      });
      setLoading(false);
      Alert.alert('Sucesso', 'Registro realizado com sucesso!');
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar. Tente novamente.');
      console.error(error);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      // Simulação de autenticação com OAuth do Google
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Sucesso', 'Registro com Google realizado com sucesso!');
        navigation.navigate('Home'); // Redireciona para a tela Home após registro
      }, 2000);
    } catch (error) {
      console.error('Erro ao fazer registro com Google:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Image source={require('../assets/furia.png')} style={styles.logo} />
        <Text style={[styles.title, { color: colors.primary }]}>Crie sua conta</Text>
        <TextInput
          placeholder="Nome"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor={colors.muted}
          secureTextEntry
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots />
          ) : (
            <Text style={[styles.buttonText, { color: colors.background }]}>Registrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.googleButton, { borderColor: colors.highlight }]}
          onPress={handleGoogleRegister}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots />
          ) : (
            <Text style={[styles.googleButtonText, { color: colors.highlight }]}>
              Registrar com Google
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: colors.highlight }]}>Já tem uma conta? Faça login</Text>
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
    justifyContent: 'space-between', // Garante que o conteúdo e o rodapé fiquem separados
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    fontSize: 14,
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