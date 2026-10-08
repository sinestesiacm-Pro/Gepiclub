/**
 * Gepiclub Travel - Brand Color Tokens
 */

export const BrandColors = {
  navyDeep: '#0A1B40',
  navyCard: '#132856',
  primaryBlue: '#0073E6',
  skyBlue: '#38B6FF',
  primaryPink: '#FF3366',
  goldVip: '#D4AF37',
  emeraldSuccess: '#059669',
  grayMuted: '#64748B',
  grayBorder: 'rgba(10, 27, 64, 0.08)',
  lightBg: '#F8FAFC',
};

export default {
  light: {
    text: BrandColors.navyDeep,
    background: BrandColors.lightBg,
    tint: BrandColors.primaryBlue,
    tabIconDefault: '#94A3B8',
    tabIconSelected: BrandColors.primaryBlue,
    card: '#FFFFFF',
    border: BrandColors.grayBorder,
  },
  dark: {
    text: '#FFFFFF',
    background: BrandColors.navyDeep,
    tint: BrandColors.skyBlue,
    tabIconDefault: '#64748B',
    tabIconSelected: BrandColors.skyBlue,
    card: BrandColors.navyCard,
    border: 'rgba(255, 255, 255, 0.1)',
  },
};
