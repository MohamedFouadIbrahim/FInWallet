import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ShieldIcon from '@components/ui/icons/ShieldIcon';
import WalletIcon from '@components/ui/icons/WalletIcon';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import { useTheme } from '@theme/useTheme';
import type { OnboardingStackParamList } from '@features/onboarding/navigation/OnboardingNavigator';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'GetStarted'>;

export default function GetStartedScreen({ navigation }: Props) {
  const { isDark } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        {/* ── Hero ── */}
        <View style={styles.hero}>
          {/* Wallet icon badge with blue gradient */}
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.iconBadge,
              {
                shadowColor: '#2563EB',
                shadowOpacity: isDark ? 0.5 : 0.3,
              },
            ]}
          >
            <WalletIcon size={40} color="#FFFFFF" />
          </LinearGradient>

          {/* Title */}
          <Text
            className="text-neutral-900 dark:text-neutral-50 font-jakarta-bold text-center"
            style={styles.title}
            allowFontScaling={false}
          >
            Welcome to FinWallet
          </Text>

          {/* Subtitle */}
          <Text
            className="text-neutral-500 dark:text-neutral-400 font-inter-regular text-center"
            style={styles.subtitle}
          >
            Your secure digital wallet for fast payments and smart money
            management.
          </Text>

          {/* Bank-grade security badge */}
          <View
            style={[styles.securityBadge, isDark && styles.securityBadgeDark]}
          >
            <ShieldIcon size={16} color="#10B981" />
            <Text
              className="font-inter-medium"
              style={styles.securityText}
              allowFontScaling={false}
            >
              Bank-grade security
            </Text>
          </View>
        </View>

        {/* ── Bottom Actions ── */}
        <View style={styles.bottomPadding}>
          <View style={styles.buttons}>
            {/* Sign In */}
            <AppButton
              label="Sign In"
              onPress={() =>
                navigation
                  .getParent<NativeStackNavigationProp<RootStackParamList>>()
                  ?.navigate('Auth')
              }
            />

            {/* Create Account */}
            <AppButton
              label="Create Account"
              variant="secondary"
              onPress={() =>
                navigation
                  .getParent<NativeStackNavigationProp<RootStackParamList>>()
                  ?.navigate('Auth', { screen: 'CreateAccount' })
              }
            />

            {/* Legal text */}
            <Text
              className="text-neutral-400 dark:text-neutral-500 font-inter-regular text-center"
              style={styles.legalText}
            >
              {'By continuing, you agree to our '}
              <Text className="font-inter-medium" style={styles.legalLink}>
                Terms of Service
              </Text>
              {' and '}
              <Text className="font-inter-medium" style={styles.legalLink}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
    gap: 12,
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25.6,
    maxWidth: 248,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 34,
    marginTop: 20,
  },
  securityBadgeDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  securityText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#10B981',
  },
  buttons: {
    gap: 12,
  },
  legalText: {
    fontSize: 12,
    lineHeight: 18,
  },
  legalLink: {
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },
  bottomPadding: {
    paddingBottom: 40,
  },
});
