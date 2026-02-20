/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // --- Brand ---
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
          'gold-light': '#FFF3CC',
          'gold-dark': '#CC9300',
        },
        // --- Semantic ---
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
        // --- Neutral ---
        neutral: {
          0: '#FFFFFF', 25: '#FCFCFD', 50: '#F8FAFC', 100: '#F1F5F9',
          200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
          600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A',
          950: '#020617',
        },
      },

      fontFamily: {
        'jakarta-bold': ['PlusJakartaSans-Bold'],
        'jakarta-semibold': ['PlusJakartaSans-SemiBold'],
        'jakarta-medium': ['PlusJakartaSans-Medium'],
        'inter-regular': ['Inter24pt-Regular'],
        'inter-medium': ['Inter24pt-Medium'],
        'inter-semibold': ['Inter24pt-SemiBold'],
        'inter-bold': ['Inter24pt-Bold'],
        'mono-regular': ['JetBrainsMono-Regular'],
        'mono-medium': ['JetBrainsMono-Medium'],
      },

      fontSize: {
        display:      ['36px', { lineHeight: '44px', letterSpacing: '-1px' }],
        h1:           ['28px', { lineHeight: '36px', letterSpacing: '-0.5px' }],
        h2:           ['22px', { lineHeight: '28px', letterSpacing: '-0.3px' }],
        h3:           ['18px', { lineHeight: '24px', letterSpacing: '-0.2px' }],
        h4:           ['16px', { lineHeight: '22px', letterSpacing: '0px' }],
        'body-lg':    ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        body:         ['14px', { lineHeight: '20px', letterSpacing: '0px' }],
        small:        ['12px', { lineHeight: '16px', letterSpacing: '0.1px' }],
        caption:      ['11px', { lineHeight: '14px', letterSpacing: '0.2px' }],
        overline:     ['11px', { lineHeight: '14px', letterSpacing: '1px' }],
        amount:       ['18px', { lineHeight: '24px', letterSpacing: '-0.3px' }],
        'amount-lg':  ['36px', { lineHeight: '44px', letterSpacing: '-1px' }],
        'amount-sm':  ['14px', { lineHeight: '18px', letterSpacing: '0px' }],
        'card-number':['16px', { lineHeight: '22px', letterSpacing: '2px' }],
        otp:          ['24px', { lineHeight: '32px', letterSpacing: '8px' }],
      },

      spacing: {
        xxs: '2px', xs: '4px', sm: '8px', md: '12px',
        base: '16px', lg: '20px', xl: '24px',
        '2xl': '32px', '3xl': '40px', '4xl': '48px', '5xl': '64px', '6xl': '80px',
      },

      borderRadius: {
        xs: '4px', sm: '8px', md: '12px', lg: '16px',
        xl: '20px', '2xl': '24px', full: '9999px',
      },

      opacity: {
        disabled: '0.4', pressed: '0.7', hover: '0.8',
        overlay: '0.5', 'overlay-dark': '0.7',
        subtle: '0.08', medium: '0.15', strong: '0.25',
      },

      zIndex: {
        card: '1', sticky: '10', header: '20', fab: '30',
        dropdown: '40', overlay: '50', modal: '60',
        'bottom-sheet': '70', toast: '80', tooltip: '90', max: '100',
      },

      width: {
        'icon-xs': '16px', 'icon-sm': '20px', 'icon-md': '24px',
        'icon-lg': '28px', 'icon-xl': '32px',
        'avatar-xs': '28px', 'avatar-sm': '36px', 'avatar-md': '44px',
        'avatar-lg': '56px', 'avatar-xl': '72px', 'avatar-2xl': '96px',
        'container-sm': '36px', 'container-md': '44px',
        'container-lg': '52px', 'container-xl': '64px',
        'card-preview': '320px',
      },

      height: {
        'icon-xs': '16px', 'icon-sm': '20px', 'icon-md': '24px',
        'icon-lg': '28px', 'icon-xl': '32px',
        'avatar-xs': '28px', 'avatar-sm': '36px', 'avatar-md': '44px',
        'avatar-lg': '56px', 'avatar-xl': '72px', 'avatar-2xl': '96px',
        'container-sm': '36px', 'container-md': '44px',
        'container-lg': '52px', 'container-xl': '64px',
        'btn': '52px', 'btn-sm': '40px', 'btn-lg': '56px',
        'input': '52px', 'input-sm': '40px', 'input-lg': '56px',
        'tab-bar': '80px', 'header': '56px',
        'balance-card': '200px', 'promo-card': '80px',
        'card-preview': '200px',
        'progress': '6px', 'progress-lg': '8px',
        divider: '1px',
      },

      transitionDuration: {
        instant: '100ms', fast: '200ms', normal: '300ms',
        slow: '500ms', 'very-slow': '800ms',
      },
    },
  },
  plugins: [],
};
