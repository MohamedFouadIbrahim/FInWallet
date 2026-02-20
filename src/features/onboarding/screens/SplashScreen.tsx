import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/features/onboarding/navigation/OnboardingNavigator';
import BootSplash from 'react-native-bootsplash'
type Props = NativeStackScreenProps<OnboardingStackParamList, 'Splash'>;

function WalletIcon() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      <Path
        d="M0 24C0 10.7452 10.7452 0 24 0H56C69.2548 0 80 10.7452 80 24V56C80 69.2548 69.2548 80 56 80H24C10.7452 80 0 69.2548 0 56V24Z"
        fill="white"
        fillOpacity={0.15}
      />
      <Path
        d="M51.6667 31.6667V26.6667C51.6667 26.2246 51.4911 25.8007 51.1785 25.4882C50.866 25.1756 50.442 25 50 25H28.3333C27.4493 25 26.6014 25.3512 25.9763 25.9763C25.3512 26.6014 25 27.4493 25 28.3333C25 29.2174 25.3512 30.0652 25.9763 30.6904C26.6014 31.3155 27.4493 31.6667 28.3333 31.6667H53.3333C53.7754 31.6667 54.1993 31.8423 54.5118 32.1548C54.8244 32.4674 55 32.8913 55 33.3333V40M55 40H50C49.1159 40 48.2681 40.3512 47.643 40.9763C47.0179 41.6014 46.6667 42.4493 46.6667 43.3333C46.6667 44.2174 47.0179 45.0652 47.643 45.6904C48.2681 46.3155 49.1159 46.6667 50 46.6667H55C55.442 46.6667 55.866 46.4911 56.1785 46.1785C56.4911 45.8659 56.6667 45.442 56.6667 45V41.6667C56.6667 41.2246 56.4911 40.8007 56.1785 40.4882C55.866 40.1756 55.442 40 55 40Z"
        stroke="white"
        strokeWidth={3.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25 28.3333V51.6666C25 52.5507 25.3512 53.3985 25.9763 54.0237C26.6014 54.6488 27.4493 55 28.3333 55H53.3333C53.7754 55 54.1993 54.8244 54.5118 54.5118C54.8244 54.1993 55 53.7753 55 53.3333V46.6666"
        stroke="white"
        strokeWidth={3.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function AnimatedDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 }),
        ),
        -1,
      ),
    );
    return () => cancelAnimation(opacity);
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    BootSplash.hide({ fade: true });

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#2563EB', '#1E40AF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <WalletIcon />

        <Text style={styles.title}>FinWallet</Text>
        <Text style={styles.subtitle}>Your Digital Wallet</Text>
      </View>

      <View style={styles.dotsRow}>
        <AnimatedDot delay={0} />
        <AnimatedDot delay={200} />
        <AnimatedDot delay={400} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.72,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter24pt-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: -16,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 56,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});
