// Tipos de deficiência
export enum DisabilityType {
  VISUAL = 'visual',
  HEARING = 'hearing',
  MOBILITY = 'mobility',
  INTELLECTUAL = 'intellectual',
  NONE = 'none',
}

// Tipos de obstáculos
export enum ObstacleType {
  BROKEN_PAVEMENT = 'broken_pavement',
  MISSING_RAMP = 'missing_ramp',
  OBSTACLE = 'obstacle',
  WORK_IN_PROGRESS = 'work_in_progress',
  NARROW_PATH = 'narrow_path',
  STEP = 'step',
}

// Tipo de baliza
export interface Beacon {
  id: string;
  latitude: number;
  longitude: number;
  type: 'traffic_light' | 'crossing' | 'building' | 'bus_stop' | 'ramp';
  description: string;
  isAccessible: boolean;
  lastUpdate: Date;
}

// Tipo de rota
export interface Route {
  id: string;
  startPoint: {
    latitude: number;
    longitude: number;
  };
  endPoint: {
    latitude: number;
    longitude: number;
  };
  waypoints: Array<{ latitude: number; longitude: number }>;
  distance: number; // em metros
  estimatedTime: number; // em minutos
  accessibilityScore: number; // 0-100
  obstacles: Array<{ latitude: number; longitude: number; type: ObstacleType }>;
}

// Perfil do usuário
export interface UserProfile {
  id: string;
  name: string;
  disabilityTypes: DisabilityType[];
  preferences: {
    voiceEnabled: boolean;
    vibrationEnabled: boolean;
    highContrast: boolean;
    voiceVolume: number; // 0-100
    vibrationIntensity: number; // 0-100
  };
}

// Reporte de obstáculo
export interface ObstacleReport {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  type: ObstacleType;
  description: string;
  reportedAt: Date;
  verified: boolean;
  verificationCount: number;
}

// Configuração de navegação
export interface NavigationConfig {
  enabledDisabilities: DisabilityType[];
  avoidanceAreas: Array<{
    latitude: number;
    longitude: number;
    radius: number; // em metros
  }>;
  preferredRoutes: string[]; // IDs de rotas preferidas
}

