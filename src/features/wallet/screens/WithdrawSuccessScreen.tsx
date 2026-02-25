import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import CheckCircleSuccessIcon from '@components/ui/icons/CheckCircleSuccessIcon';
import ClockIcon from '@components/ui/icons/ClockIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

// ── Types ─────────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletWithdrawSuccess'>;
type Route = RouteProp<WalletStackParamList, 'WalletWithdrawSuccess'>;

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (value: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Main Screen ───────────────────────────────────────────────────────────────

const WithdrawSuccessScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { isDark } = useTheme();
  const { amount, bankName, fee } = route.params;

  const numericFee = parseFloat(fee) || 0;
  const youReceive = fmt((parseFloat(amount) || 0) - numericFee);

  // ── Entrance animations ──
  const iconScale = useRef(new Animated.Value(0.5)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 55,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideY, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [iconScale, iconOpacity, contentOpacity, slideY]);

  const handleBackToWallet = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <ScreenWrapper className="bg-white dark:bg-neutral-900">
      <View style={styles.container}>

        {/* ── Success Icon ── */}
        <Animated.View
          style={[
            styles.iconWrapper,
            { opacity: iconOpacity, transform: [{ scale: iconScale }] },
          ]}
        >
          <View style={styles.iconCircle}>
            <CheckCircleSuccessIcon size={52} color="#059669" />
          </View>
        </Animated.View>

        {/* ── Text + ETA ── */}
        <Animated.View
          style={[
            styles.contentBlock,
            { opacity: contentOpacity, transform: [{ translateY: slideY }] },
          ]}
        >
          <Text
            style={[styles.title, isDark && styles.titleDark]}
            allowFontScaling={false}
          >
            Withdrawal Initiated!
          </Text>

          <Text
            style={[styles.subtitle, isDark && styles.subtitleDark]}
            allowFontScaling={false}
          >
            {`$${youReceive} will arrive at ${bankName} within\n1–2 business days.`}
          </Text>

          {/* ── ETA Banner ── */}
          <View style={[styles.etaBanner, isDark && styles.etaBannerDark]}>
            <ClockIcon size={20} color={isDark ? '#D97706' : '#B45309'} />
            <Text
              style={[styles.etaText, isDark && styles.etaTextDark]}
              allowFontScaling={false}
            >
              Estimated arrival: 1–2 business days
            </Text>
          </View>
        </Animated.View>

        {/* ── Back to Wallet button ── */}
        <Animated.View style={[styles.btnWrapper, { opacity: contentOpacity }]}>
          <Pressable
            style={styles.backBtn}
            onPress={handleBackToWallet}
            className="active:opacity-pressed"
            accessibilityLabel="Back to wallet"
          >
            <Text style={styles.backBtnText} allowFontScaling={false}>
              Back to Wallet
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default WithdrawSuccessScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 0,
  },

  // ── Icon ──
  iconWrapper: {
    marginBottom: 28,
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Content ──
  contentBlock: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleDark: {
    color: '#F8FAFC',
  },
  subtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 15,
    lineHeight: 24,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitleDark: {
    color: '#9CA3AF',
  },

  // ── ETA Banner ──
  etaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },
  etaBannerDark: {
    backgroundColor: '#1c1308',
    borderColor: '#92400E',
  },
  etaText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#B45309',
    flex: 1,
  },
  etaTextDark: {
    color: '#D97706',
  },

  // ── Button ──
  btnWrapper: {
    width: '100%',
  },
  backBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 16,
    lineHeight: 23,
    color: '#FFFFFF',
  },
});
