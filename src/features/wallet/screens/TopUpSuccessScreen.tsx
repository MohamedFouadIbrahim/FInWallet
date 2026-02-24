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
import LinearGradient from 'react-native-linear-gradient';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import CheckCircleSuccessIcon from '@components/ui/icons/CheckCircleSuccessIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

// ── Types ─────────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletTopUpSuccess'>;
type Route = RouteProp<WalletStackParamList, 'WalletTopUpSuccess'>;

// ── Constants ─────────────────────────────────────────────────────────────────

const BASE_USD_BALANCE = 8240.5;

const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Main Screen ───────────────────────────────────────────────────────────────

const TopUpSuccessScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { isDark } = useTheme();
  const { amount } = route.params;

  const numericAmount = parseFloat(amount) || 0;
  const newBalance = formatCurrency(BASE_USD_BALANCE + numericAmount);
  const displayAmount = formatCurrency(numericAmount);

  // ── Entrance animation ──
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, contentOpacity]);

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
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <LinearGradient
            colors={['#D1FAE5', '#A7F3D0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <CheckCircleSuccessIcon size={44} color="#059669" />
          </LinearGradient>
        </Animated.View>

        {/* ── Text content + button ── */}
        <Animated.View style={[styles.textBlock, { opacity: contentOpacity }]}>
          <Text
            style={[styles.title, isDark && styles.titleDark]}
            allowFontScaling={false}
          >
            Top Up Successful!
          </Text>

          <Text
            style={[styles.subtitle, isDark && styles.subtitleDark]}
            allowFontScaling={false}
          >
            {`$${displayAmount} has been added to your USD Wallet.`}
          </Text>

          <Text style={styles.newBalance} allowFontScaling={false}>
            {`$${newBalance}`}
          </Text>

          <View style={styles.buttonGap} />

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

export default TopUpSuccessScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 0,
  },

  // ── Icon ──
  iconWrapper: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Text block ──
  textBlock: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleDark: {
    color: '#F8FAFC',
  },
  subtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleDark: {
    color: '#9CA3AF',
  },
  newBalance: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 32,
    lineHeight: 48,
    color: '#2563EB',
    textAlign: 'center',
  },

  // Gap between balance and button
  buttonGap: {
    height: 40,
  },

  // ── Button ──
  backBtn: {
    width: '100%',
    height: 52,
    borderRadius: 14,
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
