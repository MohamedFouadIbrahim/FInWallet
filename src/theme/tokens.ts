/**
 * Design tokens mirroring tailwind.config.js.
 * Use these for style={} props where className is insufficient
 * (e.g. Animated.View, react-native-reanimated, dynamic values).
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  primary: {
    50: '#E8F0FE', 100: '#C5D9FC', 200: '#90B4F9', 300: '#5B8EF6',
    400: '#2D6FF3', 500: '#1A6FEF', 600: '#1559C7', 700: '#10449E',
    800: '#0A2F76', 900: '#0A1E3D', 950: '#061328',
  },
  secondary: {
    50: '#E6F9FC', 100: '#B3EEF6', 200: '#80E3F0', 300: '#4DD8EA',
    400: '#26CFE4', 500: '#00B4D8', 600: '#0095B3', 700: '#00768E',
    800: '#005769', 900: '#003844',
  },
  accent: {
    gold: '#FFB800',
    goldLight: '#FFF3CC',
    goldDark: '#CC9300',
  },
  success: {
    50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7',
    400: '#34D399', 500: '#22C55E', 600: '#16A34A', 700: '#15803D',
    800: '#166534', 900: '#14532D',
  },
  error: {
    50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5',
    400: '#F87171', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C',
    800: '#991B1B', 900: '#7F1D1D',
  },
  warning: {
    50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D',
    400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309',
    800: '#92400E', 900: '#78350F',
  },
  info: {
    50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
    400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
    800: '#1E40AF', 900: '#1E3A8A',
  },
  neutral: {
    0: '#FFFFFF', 25: '#FCFCFD', 50: '#F8FAFC', 100: '#F1F5F9',
    200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
    600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A',
    950: '#020617',
  },
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  xxs: 2, xs: 4, sm: 8, md: 12,
  base: 16, lg: 20, xl: 24,
  '2xl': 32, '3xl': 40, '4xl': 48, '5xl': 64, '6xl': 80,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  xs: 4, sm: 8, md: 12, lg: 16,
  xl: 20, '2xl': 24, full: 9999,
} as const;

// ─── Opacity ─────────────────────────────────────────────────────────────────

export const opacity = {
  disabled: 0.4, pressed: 0.7, hover: 0.8,
  overlay: 0.5, overlayDark: 0.7,
  subtle: 0.08, medium: 0.15, strong: 0.25,
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  card: 1, sticky: 10, header: 20, fab: 30,
  dropdown: 40, overlay: 50, modal: 60,
  bottomSheet: 70, toast: 80, tooltip: 90, max: 100,
} as const;

// ─── Icon / Avatar / Container sizes ─────────────────────────────────────────

export const iconSize = {
  xs: 16, sm: 20, md: 24, lg: 28, xl: 32,
} as const;

export const avatarSize = {
  xs: 28, sm: 36, md: 44, lg: 56, xl: 72, '2xl': 96,
} as const;

export const containerSize = {
  sm: 36, md: 44, lg: 52, xl: 64,
} as const;

// ─── Component heights ────────────────────────────────────────────────────────

export const heights = {
  btn: 52, btnSm: 40, btnLg: 56,
  input: 52, inputSm: 40, inputLg: 56,
  tabBar: 80, header: 56,
  balanceCard: 200, promoCard: 80, cardPreview: 200,
  progress: 6, progressLg: 8,
  divider: 1,
} as const;

// ─── Transition durations (ms) ────────────────────────────────────────────────

export const duration = {
  instant: 100, fast: 200, normal: 300, slow: 500, verySlow: 800,
} as const;
