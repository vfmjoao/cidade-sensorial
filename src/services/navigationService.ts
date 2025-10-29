import { Route, ObstacleType, DisabilityType } from '../types';
import { LocationCoordinates, calculateDistance } from '../utils/location';

/**
 * Serviço para calcular rotas acessíveis
 */

// Obstáculos simulados
const MOCK_OBSTACLES = [
  {
    latitude: -23.5515,
    longitude: -46.6335,
    type: ObstacleType.BROKEN_PAVEMENT,
  },
  {
    latitude: -23.5505,
    longitude: -46.6325,
    type: ObstacleType.MISSING_RAMP,
  },
];

/**
 * Calcula uma rota acessível entre dois pontos
 */
export async function calculateAccessibleRoute(
  start: LocationCoordinates,
  end: LocationCoordinates,
  disabilityTypes: DisabilityType[]
): Promise<Route | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const distance = calculateDistance(start, end);
      const baseTime = distance / 1.5; // velocidade média de caminhada em m/min
      
      // Calcula tempo adicional baseado nas deficiências
      let timeMultiplier = 1;
      if (disabilityTypes.includes(DisabilityType.MOBILITY)) {
        timeMultiplier = 1.3;
      }
      if (disabilityTypes.includes(DisabilityType.VISUAL)) {
        timeMultiplier = 1.2;
      }

      const waypoints = generateWaypoints(start, end);
      const obstaclesOnRoute = detectObstaclesOnRoute(waypoints);

      const route: Route = {
        id: `route_${Date.now()}`,
        startPoint: start,
        endPoint: end,
        waypoints,
        distance: Math.round(distance),
        estimatedTime: Math.round(baseTime * timeMultiplier),
        accessibilityScore: obstaclesOnRoute.length === 0 ? 95 : 70 - (obstaclesOnRoute.length * 10),
        obstacles: obstaclesOnRoute,
      };

      resolve(route);
    }, 1000);
  });
}

/**
 * Gera pontos intermediários na rota
 */
function generateWaypoints(start: LocationCoordinates, end: LocationCoordinates): LocationCoordinates[] {
  const waypoints: LocationCoordinates[] = [];
  const steps = 5; // número de pontos intermediários

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    waypoints.push({
      latitude: start.latitude + (end.latitude - start.latitude) * t,
      longitude: start.longitude + (end.longitude - start.longitude) * t,
    });
  }

  return waypoints;
}

/**
 * Detecta obstáculos ao longo da rota
 */
function detectObstaclesOnRoute(waypoints: LocationCoordinates[]): Array<{ latitude: number; longitude: number; type: ObstacleType }> {
  const detectedObstacles: Array<{ latitude: number; longitude: number; type: ObstacleType }> = [];

  waypoints.forEach((waypoint) => {
    MOCK_OBSTACLES.forEach((obstacle) => {
      const distance = calculateDistance(waypoint, obstacle);
      if (distance < 50) { // dentro de 50 metros
        detectedObstacles.push(obstacle);
      }
    });
  });

  return detectedObstacles;
}

/**
 * Verifica se uma rota evita obstáculos para tipos específicos de deficiência
 */
export function routeAvoidsObstacles(
  route: Route,
  disabilityTypes: DisabilityType[]
): boolean {
  const criticalObstacles = ['broken_pavement', 'step', 'narrow_path'];
  const isMobilityUser = disabilityTypes.includes(DisabilityType.MOBILITY);

  if (!isMobilityUser) return true;

  return route.obstacles.every(
    (obstacle) => !criticalObstacles.includes(obstacle.type)
  );
}

