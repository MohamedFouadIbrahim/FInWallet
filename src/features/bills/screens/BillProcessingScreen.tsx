import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

type RouteProps = RouteProp<DashboardStackParamList, 'BillProcessing'>;
import Svg, { Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Spinner arc ───────────────────────────────────────────────────────────────

const SpinnerArc = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <G>
      <Path
        d="M35 20C34.9998 23.1676 33.9969 26.2539 32.1349 28.8165C30.2729 31.3791 27.6474 33.2865 24.6348 34.2653C21.6222 35.244 18.377 35.2439 15.3644 34.265C12.3518 33.2861 9.72646 31.3786 7.86461 28.8159C6.00275 26.2531 4.99998 23.1668 5 19.9992C5.00002 16.8315 6.00284 13.7452 7.86474 11.1825C9.72663 8.61982 12.352 6.71235 15.3646 5.73346C18.3772 4.75458 21.6224 4.75453 24.635 5.73333"
        stroke="#2563EB"
        strokeWidth={3.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

// ── BillProcessingScreen ──────────────────────────────────────────────────────

export default function BillProcessingScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { provider, accountNumber, amount, customerName } = route.params;

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BillSuccess', { provider, accountNumber, amount, customerName });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation, provider, accountNumber, amount, customerName]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Animated.View style={spinStyle}>
            <SpinnerArc />
          </Animated.View>
        </View>

        <Text style={styles.title} allowFontScaling={false}>
          Processing Payment
        </Text>

        <Text style={styles.subtitle} allowFontScaling={false}>
          Please wait while we process your bill payment...
        </Text>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
  },
});
