import { Beacon } from '../types';
import { LocationCoordinates, calculateDistance } from '../utils/location';

/**
 * Serviço para gerenciar balizas inteligentes
 * Por enquanto, simula balizas estáticas
 */

// Balizas simuladas para demonstração
const MOCK_BEACONS: Beacon[] = [
  {
    id: '1',
    latitude: -23.5510,
    longitude: -46.6330,
    type: 'traffic_light',
    description: 'Semáforo com sinal sonoro',
    isAccessible: true,
    lastUpdate: new Date(),
  },
  {
    id: '2',
    latitude: -23.5500,
    longitude: -46.6340,
    type: 'crossing',
    description: 'Faixa de pedestre com rampa',
    isAccessible: true,
    lastUpdate: new Date(),
  },
  {
    id: '3',
    latitude: -23.5520,
    longitude: -46.6320,
    type: 'building',
    description: 'Edifício público com acesso acessível',
    isAccessible: true,
    lastUpdate: new Date(),
  },
  {
    id: '4',
    latitude: -23.5490,
    longitude: -46.6350,
    type: 'ramp',
    description: 'Rampa de acesso validada',
    isAccessible: true,
    lastUpdate: new Date(),
  },
];

/**
 * Busca todas as balizas próximas a uma localização
 */
export async function getNearbyBeacons(
  location: LocationCoordinates,
  radius: number = 500 // metros
): Promise<Beacon[]> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const nearbyBeacons = MOCK_BEACONS.filter((beacon) => {
        const distance = calculateDistance(
          location,
          { latitude: beacon.latitude, longitude: beacon.longitude }
        );
        return distance <= radius;
      });
      resolve(nearbyBeacons);
    }, 500);
  });
}

/**
 * Busca uma baliza específica por ID
 */
export async function getBeaconById(id: string): Promise<Beacon | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const beacon = MOCK_BEACONS.find((b) => b.id === id);
      resolve(beacon || null);
    }, 300);
  });
}

/**
 * Conecta a uma baliza via Bluetooth (simulado)
 */
export async function connectToBeacon(beaconId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula conexão bem-sucedida
      console.log(`Conectado à baliza ${beaconId}`);
      resolve(true);
    }, 1000);
  });
}

/**
 * Obtém o contexto da baliza (ex: status do semáforo)
 */
export async function getBeaconContext(beaconId: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula contexto
      resolve({
        status: Math.random() > 0.5 ? 'green' : 'red',
        message: 'Sinal de travessia ativo',
      });
    }, 800);
  });
}

