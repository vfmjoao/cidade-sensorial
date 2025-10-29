import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos da sua localização para funcionar corretamente.'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a localização.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  // Coordenadas de exemplo (você pode substituir por coordenadas reais)
  const initialRegion = {
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const exampleBeacons = [
    { id: 1, title: 'Semáforo Inteligente', latitude: -23.551, longitude: -46.633 },
    { id: 2, title: 'Cruzamento Acessível', latitude: -23.550, longitude: -46.634 },
    { id: 3, title: 'Rampa Detectarizada', latitude: -23.552, longitude: -46.632 },
  ];

  // Simplificação para web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Text style={styles.webTitle}>🗺️ Mapa</Text>
        <Text style={styles.webSubtitle}>
          A visualização do mapa está disponível apenas em dispositivos móveis.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Iniciando Navegação...', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.buttonText}>📍 Iniciar Navegação</Text>
        </TouchableOpacity>
        <View style={styles.beaconsList}>
          <Text style={styles.beaconsTitle}>Balizas Inteligentes Simuladas:</Text>
          {exampleBeacons.map((beacon) => (
            <View key={beacon.id} style={styles.beaconCard}>
              <Text style={styles.beaconTitle}>📍 {beacon.title}</Text>
              <Text style={styles.beaconCoords}>
                {beacon.latitude.toFixed(4)}, {beacon.longitude.toFixed(4)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // Versão com mapa para mobile
  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;
  const PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        region={location || initialRegion}
        showsUserLocation={hasPermission}
      >
        {/* Marca usuário */}
        {location && (
          <Marker
            coordinate={location}
            title="Você está aqui"
            pinColor="#4A90E2"
          />
        )}

        {/* Balizas simuladas */}
        {exampleBeacons.map((beacon) => (
          <Marker
            key={beacon.id}
            coordinate={{
              latitude: beacon.latitude,
              longitude: beacon.longitude,
            }}
            title={beacon.title}
            pinColor="#FF6B6B"
          />
        ))}
      </MapView>

      {/* Controles de navegação */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Iniciando Navegação...', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.buttonText}>📍 Iniciar Navegação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  webSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  beaconsList: {
    marginTop: 30,
    width: '100%',
    maxWidth: 600,
  },
  beaconsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  beaconCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  beaconTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  beaconCoords: {
    fontSize: 14,
    color: '#666',
  },
});

