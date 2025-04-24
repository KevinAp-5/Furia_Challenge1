import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import ThreeDots from '../components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/title';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Simulação de autenticação com OAuth do Google
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home'); // Redireciona para a tela Home após login
      }, 2000);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      setLoading(false);
    }
  };

  return (

    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Image source={require('../assets/furia.png')} style={styles.logo} />
        <Text style={[styles.title, { color: colors.primary }]}>Entrar no universo FURIA</Text>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor={colors.muted}
          secureTextEntry
          style={[styles.input, { color: colors.primary, borderColor: colors.secondary }]}
        />
        {/* Botão de recuperação de senha */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestPassword')}
          style={styles.forgotPasswordButton}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.highlight }]}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.googleButton, { borderColor: colors.highlight }]}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <ThreeDots />
          ) : (
            <Text style={[styles.googleButtonText, { color: colors.highlight }]}>
              Continuar com Google
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.registerButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.registerButtonText, { color: colors.accent }]}>
            Registrar-se
          </Text>
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
    borderRadius: 50
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
    marginBottom: 24 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 24 
  },
  input: { 
    width: '90%', 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 12, 
    marginVertical: 8 
  },
  button: { 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 16, 
    width: '90%', 
    alignItems: 'center',
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  buttonText: { 
    fontWeight: 'bold' 
  },
  googleButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    borderWidth: 1,
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  googleButtonText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  registerButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    height: 45, // Altura fixa para evitar mudanças no tamanho
  },
  registerButtonText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', // Alinha o botão à direita
    marginTop: 8,
    marginRight: '5%', // Pequeno espaçamento da borda direita
  },
  forgotPasswordText: {
    fontSize: 14,
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
