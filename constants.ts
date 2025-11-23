import { Server } from './types';

export const BRAND_NAME = "CV CREATION";
export const PRIMARY_COLOR = "cyan-500";

export const MOCK_SERVERS: Server[] = [
  {
    id: '1',
    name: 'New York #1',
    country: 'USA',
    flag: '🇺🇸',
    ping: 45,
    protocols: ['WireGuard', 'OpenVPN'],
    premiumOnly: false,
  },
  {
    id: '2',
    name: 'London Central',
    country: 'UK',
    flag: '🇬🇧',
    ping: 110,
    protocols: ['WireGuard'],
    premiumOnly: false,
  },
  {
    id: '3',
    name: 'Frankfurt Secure',
    country: 'Germany',
    flag: '🇩🇪',
    ping: 130,
    protocols: ['OpenVPN'],
    premiumOnly: true,
  },
  {
    id: '4',
    name: 'Tokyo Fast',
    country: 'Japan',
    flag: '🇯🇵',
    ping: 210,
    protocols: ['WireGuard'],
    premiumOnly: true,
  },
  {
    id: '5',
    name: 'Singapore Direct',
    country: 'Singapore',
    flag: '🇸🇬',
    ping: 250,
    protocols: ['WireGuard', 'OpenVPN'],
    premiumOnly: true,
  },
];