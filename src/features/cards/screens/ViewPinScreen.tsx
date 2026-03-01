import React, { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Demo PIN ───────────────────────────────────────────────────────────────────

const DEMO_PIN = '8523';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EyeOffIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M1 1l22 22" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FingerprintIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8.65 22c.21-.66.45-1.32.57-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 13.12c0 2.38 0 6.38-1 8.88" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 16h.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21.8 16c.2-2 .131-5.354 0-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── PIN Box ────────────────────────────────────────────────────────────────────

function PinBox({ digit, revealed }: { digit: string; revealed: boolean }) {
  return (
    <View style={styles.pinBox}>
      <Text style={styles.pinDigit} allowFontScaling={false}>
        {digit}
      </Text>
      {!revealed && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={12}
          reducedTransparencyFallbackColor="#F9FAFB"
        />
      )}
    </View>
  );
}

// ── ViewPinScreen ──────────────────────────────────────────────────────────────

export default function ViewPinScreen() {
  const navigation = useNavigation<any>();
  const [revealed, setRevealed] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePressIn = useCallback(() => {
    holdTimer.current = setTimeout(() => setRevealed(true), 300);
  }, []);

  const handlePressOut = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setRevealed(false);
  }, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-[16px]">
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <BackIcon />
        </Pressable>
        <Text
          className="flex-1 font-jakarta-bold text-[18px] text-[#111827] dark:text-neutral-50 leading-[27px]"
          allowFontScaling={false}
        >
          View PIN
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <View style={styles.content}>
        {/* Hero icon */}
        <View style={styles.heroWrap}>
          <EyeOffIcon />
        </View>

        {/* Title & subtitle */}
        <Text style={styles.title} allowFontScaling={false}>
          Your Card PIN
        </Text>
        <Text style={styles.subtitle} allowFontScaling={false}>
          Hold the button below to reveal your PIN
        </Text>

        {/* PIN boxes */}
        <View style={styles.pinRow}>
          {DEMO_PIN.split('').map((digit, i) => (
            <PinBox key={i} digit={digit} revealed={revealed} />
          ))}
        </View>

        {/* Hold to Reveal button */}
        <Pressable
          style={styles.holdButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityLabel="Hold to reveal PIN"
        >
          <FingerprintIcon color="#7C3AED" />
          <Text style={styles.holdButtonText} allowFontScaling={false}>
            Hold to Reveal PIN
          </Text>
        </Pressable>

        {/* Hint */}
        <Text style={styles.hint} allowFontScaling={false}>
          Release to hide your PIN immediately
        </Text>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },

  // Hero
  heroWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  // Text
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
  },

  // PIN row
  pinRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  pinBox: {
    width: 56,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pinDigit: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 28,
    lineHeight: 42,
    color: '#111827',
  },

  // Hold button
  holdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    height: 56,
    backgroundColor: '#F5F3FF',
    borderWidth: 2,
    borderColor: '#DDD6FE',
    borderRadius: 16,
    marginBottom: 12,
  },
  holdButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#7C3AED',
  },

  // Hint
  hint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
