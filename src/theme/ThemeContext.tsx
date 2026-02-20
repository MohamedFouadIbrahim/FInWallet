import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorScheme = 'light' | 'dark';
export type Preset = 'ocean-blue' | 'black-gold' | 'emerald';

export interface ThemeContextValue {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
  isDark: boolean;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const STORAGE_KEY_SCHEME = '@finwallet/colorScheme';
const STORAGE_KEY_PRESET = '@finwallet/colorPreset';

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme: setNativeWindScheme } = useNativeWindColorScheme();

  const systemScheme = (Appearance.getColorScheme() ?? 'light') as ColorScheme;
  const [colorScheme, setSchemeState] = useState<ColorScheme>(systemScheme);
  const [preset, setPresetState] = useState<Preset>('ocean-blue');
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const [savedScheme, savedPreset] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_SCHEME),
          AsyncStorage.getItem(STORAGE_KEY_PRESET),
        ]);
        const scheme = (savedScheme as ColorScheme | null) ?? systemScheme;
        const preset_ = (savedPreset as Preset | null) ?? 'ocean-blue';
        setSchemeState(scheme);
        setPresetState(preset_);
        setNativeWindScheme(scheme);
      } finally {
        setHydrated(true);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setSchemeState(scheme);
      setNativeWindScheme(scheme);
      AsyncStorage.setItem(STORAGE_KEY_SCHEME, scheme);
    },
    [setNativeWindScheme],
  );

  const toggleColorScheme = useCallback(() => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme, setColorScheme]);

  const setPreset = useCallback((p: Preset) => {
    setPresetState(p);
    AsyncStorage.setItem(STORAGE_KEY_PRESET, p);
  }, []);

  // Don't render children until hydration is complete to avoid flash
  if (!hydrated) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        toggleColorScheme,
        preset,
        setPreset,
        isDark: colorScheme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Internal hook ────────────────────────────────────────────────────────────

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used inside <ThemeProvider>');
  }
  return ctx;
}
