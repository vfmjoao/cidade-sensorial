import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cidade Sensorial</Text>
          <Text style={styles.subtitle}>O futuro da acessibilidade começa aqui</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Map' as never)}
          >
            <Text style={styles.actionButtonText}>🗺️ Navegar</Text>
            <Text style={styles.actionButtonSubtext}>Encontre a rota mais acessível</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Text style={styles.actionButtonText}>👤 Configurar Perfil</Text>
            <Text style={styles.actionButtonSubtext}>Personalize suas necessidades</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📝 Reportar Obstáculo</Text>
            <Text style={styles.actionButtonSubtext}>Ajude a melhorar o mapa</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Navegue pela cidade com segurança e autonomia. Personalize seu perfil conforme 
              suas necessidades e receba orientações adaptadas para sua deficiência.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          <View style={styles.feature}>
            <Text style={styles.featureText}>🎙️ Navegação por Voz</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>📳 Alertas por Vibração</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>🛡️ Rotas Seguras</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>🔔 Alertas em Tempo Real</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 5,
  },
  actionButtonSubtext: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  feature: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
  },
});

