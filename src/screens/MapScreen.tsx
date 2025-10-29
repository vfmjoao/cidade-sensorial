import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

