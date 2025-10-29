import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';

export default function ProfileScreen() {
  const [visualImpairment, setVisualImpairment] = useState(false);
  const [hearingImpairment, setHearingImpairment] = useState(false);
  const [mobilityImpairment, setMobilityImpairment] = useState(false);
  const [intellectualImpairment, setIntellectualImpairment] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil de Acessibilidade</Text>
          <Text style={styles.subtitle}>
            Configure suas necessidades para personalizar sua experiência
          </Text>
        </View>

        {/* Tipo de Deficiência */}
        <View style={styles.section}>
          <Text style={styles.label}>Tipo de Necessidade</Text>

          <View style={styles.option}>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Deficiência Visual</Text>
              <Text style={styles.optionDescription}>
                Navegação por voz e alertas sonoros
              </Text>
            </View>
            <Switch
              value={visualImpairment}
              onValueChange={setVisualImpairment}
              trackColor={{ false: '#ddd', true: '#4A90E2' }}
              thumbColor={visualImpairment ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Deficiência Auditiva</Text>
              <Text style={styles.optionDescription}>
                Alertas visuais e vibrações
              </Text>
            </View>
            <Switch
              value={hearingImpairment}
              onValueChange={setHearingImpairment}
              trackColor={{ false: '#ddd', true: '#4A90E2' }}
              thumbColor={hearingImpairment ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Mobilidade Reduzida</Text>
              <Text style={styles.optionDescription}>
                Rotas sem degraus e acessíveis
              </Text>
            </View>
            <Switch
              value={mobilityImpairment}
              onValueChange={setMobilityImpairment}
              trackColor={{ false: '#ddd', true: '#4A90E2' }}
              thumbColor={mobilityImpairment ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Deficiência Intelectual</Text>
              <Text style={styles.optionDescription}>
                Interface simplificada
              </Text>
            </View>
            <Switch
              value={intellectualImpairment}
              onValueChange={setIntellectualImpairment}
              trackColor={{ false: '#ddd', true: '#4A90E2' }}
              thumbColor={intellectualImpairment ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Preferências */}
        <View style={styles.section}>
          <Text style={styles.label}>Preferências Adicionais</Text>
          
          <TouchableOpacity style={styles.preferenceButton}>
            <Text style={styles.preferenceText}>📢 Volume da Voz</Text>
            <Text style={styles.preferenceValue}>Médio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceButton}>
            <Text style={styles.preferenceText}>📳 Intensidade da Vibração</Text>
            <Text style={styles.preferenceValue}>Normal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceButton}>
            <Text style={styles.preferenceText}>⚡ Modo Alto Contraste</Text>
            <Text style={styles.preferenceValue}>Desativado</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => alert('Perfil salvo com sucesso!')}
        >
          <Text style={styles.saveButtonText}>💾 Salvar Configurações</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
  },
  preferenceButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 15,
    color: '#333',
  },
  preferenceValue: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

