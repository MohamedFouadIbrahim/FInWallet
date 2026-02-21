import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import FaceIdIcon from '@components/ui/icons/FaceIdIcon';
import FingerprintIcon from '@components/ui/icons/FingerprintIcon';
import ShieldCheckIcon from '@components/ui/icons/ShieldCheckIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'EnableBiometrics'>;

export default function BiometricLoginScreen({ navigation }: Props) {
  const handleEnable = () => {
    // TODO: Trigger native biometric registration, then navigate to main app
    console.log('Enable biometrics');
  };

  const handleSkip = () => {
    // TODO: Navigate to main app dashboard
    console.log('Skip biometrics');
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Empty header spacer (no back button on this screen) */}
        <View style={styles.header} />

        {/* Content */}
        <View style={styles.content}>
          {/* Hero illustration */}
          <View style={styles.heroWrapper}>
            <View style={styles.outerCircle}>
              <LinearGradient
                colors={['#EFF6FF', '#DBEAFE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.innerCircle}
              >
                <FaceIdIcon size={56} color="#2563EB" />
              </LinearGradient>

              {/* Fingerprint badge — top right */}
              <View style={[styles.badge, styles.badgeTopRight]}>
                <FingerprintIcon size={20} color="#2563EB" />
              </View>

              {/* Shield badge — bottom left */}
              <View style={[styles.badge, styles.badgeBottomLeft]}>
                <ShieldCheckIcon size={20} color="#10B981" />
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title} allowFontScaling={false}>
            Enable Face ID / Fingerprint
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle} allowFontScaling={false}>
            Unlock your wallet instantly with biometric authentication. Fast,
            secure, and convenient.
          </Text>

          {/* Feature pills */}
          <View style={styles.pillsWrapper}>
            <View style={styles.pillsRow}>
              <View style={styles.pill}>
                <Text style={styles.pillText} allowFontScaling={false}>
                  Instant access
                </Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText} allowFontScaling={false}>
                  Bank-grade security
                </Text>
              </View>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText} allowFontScaling={false}>
                No PIN needed
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom buttons */}
        <View style={styles.bottom}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleEnable}
            accessibilityLabel="Enable biometrics"
          >
            <Text style={styles.primaryButtonText} allowFontScaling={false}>
              Enable Biometrics
            </Text>
          </Pressable>
          <Pressable
            style={styles.skipButton}
            onPress={handleSkip}
            accessibilityLabel="Skip for now"
          >
            <Text style={styles.skipButtonText} allowFontScaling={false}>
              Skip for Now
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    height: 56,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  // Hero
  heroWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  badgeTopRight: {
    top: 4,
    right: -8,
  },
  badgeBottomLeft: {
    bottom: 4,
    left: -8,
  },
  // Text
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 35,
    color: '#111827',
    textAlign: 'center',
    maxWidth: 217,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 25.6,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 290,
    marginBottom: 24,
  },
  // Pills
  pillsWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    backgroundColor: '#F3F4F6',
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#374151',
  },
  // Bottom buttons
  bottom: {
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 22.857,
    color: '#FFFFFF',
  },
  skipButton: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
});
