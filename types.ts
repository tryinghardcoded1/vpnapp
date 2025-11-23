export interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  protocols: string[];
  premiumOnly: boolean;
}

export interface User {
  name: string;
  email: string;
  isPremium: boolean;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTING = 'DISCONNECTING'
}

export enum ScreenView {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  SERVERS = 'SERVERS',
  SPEED_TEST = 'SPEED_TEST',
  SUBSCRIPTION = 'SUBSCRIPTION',
  PROFILE = 'PROFILE'
}