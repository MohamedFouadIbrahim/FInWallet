import { StyleProp, ViewStyle } from 'react-native';
import { useThemeContext, type ThemeContextValue } from './ThemeContext';
import { oceanBlueVars } from './presets/ocean-blue';
import { blackGoldVars } from './presets/black-gold';
import { emeraldVars } from './presets/emerald';

// ─── Preset vars map ──────────────────────────────────────────────────────────

const presetVarsMap = {
  'ocean-blue': oceanBlueVars,
  'black-gold':  blackGoldVars,
  'emerald':     emeraldVars,
} as const;

// ─── Extended hook value ──────────────────────────────────────────────────────

export interface UseThemeResult extends ThemeContextValue {
  /** NativeWind `vars()` style object — spread onto any View to propagate CSS variables */
  presetVars: StyleProp<ViewStyle>;
}

/**
 * Primary theme hook. Returns everything from ThemeContext plus the
 * active preset's CSS variable style object ready to spread onto a View.
 *
 * @example
 * const { isDark, toggleColorScheme, presetVars, setPreset } = useTheme();
 */
export function useTheme(): UseThemeResult {
  const ctx = useThemeContext();
  return {
    ...ctx,
    presetVars: presetVarsMap[ctx.preset],
  };
}
