export interface Circuit {
  id_circuit: number;
  city: string;
  description: string;
  difficulty: number;
  distance: number;
  duration: string;
  introduction: string;
  latitude: number;
  longitude: number;
  maintenance: boolean;
  mobility: string[];
  name: string;
  parking_address: string;
  region: string;
  state: string;
  terrain: number;
  theme: string;
  url_image: string;
  url_reward: string;
}

export type CircuitsList = Circuit[];
