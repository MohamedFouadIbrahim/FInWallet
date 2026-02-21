import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  /** Which edges get safe-area padding. Defaults to all edges. */
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  className?: string;
}

/**
 * Drop-in screen root that applies safe-area insets automatically.
 * Replaces per-screen `useSafeAreaInsets` boilerplate.
 *
 * Usage:
 *   <ScreenWrapper>…content…</ScreenWrapper>
 *
 * Top-only (e.g. screens with bottom scroll content):
 *   <ScreenWrapper edges={['top', 'left', 'right']}>…</ScreenWrapper>
 */
const ScreenWrapper = ({ children, edges, style, className }: Props) => (
  <SafeAreaView
    edges={edges}
    className={`flex-1 bg-white dark:bg-neutral-900${className ? ` ${className}` : ''}`}
    style={style}
  >
    {children}
  </SafeAreaView>
);

export default ScreenWrapper;
