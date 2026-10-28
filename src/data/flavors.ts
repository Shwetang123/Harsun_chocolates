export interface FlavorConfig {
  id: string;
  name: string;
  color: string;
  foilColor: string;
  roughness: number;
  clearcoat: number;
}

export const FLAVORS: Record<string, FlavorConfig> = {
  dark: {
    id: 'dark',
    name: '70% Dark Chocolate',
    color: '#201009',
    foilColor: '#D49B44',
    roughness: 0.32,
    clearcoat: 0.55,
  },
  milk: {
    id: 'milk',
    name: 'Velvet Milk Chocolate',
    color: '#4E2918',
    foilColor: '#E8B4B8',
    roughness: 0.38,
    clearcoat: 0.4,
  },
  almond: {
    id: 'almond',
    name: 'Roasted Almond Crunch',
    color: '#361A10',
    foilColor: '#D4AF37',
    roughness: 0.42,
    clearcoat: 0.45,
  },
  ruby: {
    id: 'ruby',
    name: 'Artisan Ruby Berry',
    color: '#6F2636',
    foilColor: '#ECC0C5',
    roughness: 0.3,
    clearcoat: 0.65,
  },
};
