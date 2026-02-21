import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  total: number;
  activeIndex: number;
}

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 24;
const DOT_GAP = 8;
const DURATION = 250;

const Dot = React.memo(({ isActive }: { isActive: boolean }) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: DURATION });
  }, [isActive, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * (ACTIVE_DOT_WIDTH - DOT_SIZE) + DOT_SIZE,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#E2E8F0', '#2563EB'],
    ),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
});

const PaginationDots = React.memo(({ total, activeIndex }: Props) => (
  <View style={styles.container}>
    {Array.from({ length: total }, (_, i) => (
      <Dot key={i} isActive={i === activeIndex} />
    ))}
  </View>
));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DOT_GAP,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export default PaginationDots;
