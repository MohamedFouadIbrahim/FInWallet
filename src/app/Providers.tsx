import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, useThemeContext } from '@theme/ThemeContext';
import { oceanBlueVars } from '@theme/presets/ocean-blue';
import { blackGoldVars } from '@theme/presets/black-gold';
import { emeraldVars } from '@theme/presets/emerald';

// ─── Preset vars map ──────────────────────────────────────────────────────────

const presetVarsMap = {
  'ocean-blue': oceanBlueVars,
  'black-gold':  blackGoldVars,
  'emerald':     emeraldVars,
} as const;

// ─── Root view that applies the active preset's CSS variables ─────────────────

function RootWithTheme({ children }: { children: React.ReactNode }) {
  const { preset } = useThemeContext();
  const presetVars = presetVarsMap[preset];

  return (
    <View style={[{ flex: 1 }, presetVars]} className={`preset-${preset}`}>
      {children}
    </View>
  );
}

// ─── App-wide providers ───────────────────────────────────────────────────────

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RootWithTheme>{children}</RootWithTheme>
    </ThemeProvider>
  );
}
