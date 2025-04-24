import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView>
        <Image source={require('../assets/furia.png')} style={styles.logo} />
      </SafeAreaView>
      <Text style={[styles.title, { color: colors.primary }]}>Sobre a FURIA</Text>
      <View style={styles.divider} />
      <Text style={[styles.text, { color: colors.primary }]}>
        Somos FURIA. Uma organização de esports que nasceu do desejo de representar o Brasil no CS e conquistou muito mais que isso: 
        expandimos nossas ligas, disputamos os principais títulos, adotamos novos objetivos e ganhamos um propósito maior. Somos muito 
        mais que o sucesso competitivo. Somos um movimento sociocultural.
      </Text>
      <Text style={[styles.text, { color: colors.primary }]}>
        Nossa história é de pioneirismo, grandes conquistas e tradição. Nosso presente é de desejo, garra e estratégia. A pantera estampada 
        no peito estampa também nosso futuro de glória. Nossos pilares de performance, lifestyle, conteúdo, business, tecnologia e social 
        são os principais constituintes do movimento FURIA, que representa uma unidade que respeita as individualidades e impacta positivamente 
        os contextos em que se insere. Unimos pessoas e alimentamos sonhos dentro e fora dos jogos.
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.accent }]}>10+</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Títulos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.accent }]}>5M+</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Fãs</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.accent }]}>20+</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Jogadores</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>© 2025 FURIA. All Rights Reserved.</Text>
      </View>
    </ScrollView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#444',
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});