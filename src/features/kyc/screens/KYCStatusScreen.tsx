import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppButton from '@components/ui/AppButton';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import CheckCircleIcon from '@components/ui/icons/CheckCircleIcon';
import ChevronRightIcon from '@components/ui/icons/ChevronRightIcon';
import FaceIdIcon from '@components/ui/icons/FaceIdIcon';
import ShieldCheckIcon from '@components/ui/icons/ShieldCheckIcon';
import type { KYCStackParamList } from '@features/kyc/navigation/KYCNavigator';

type Props = NativeStackScreenProps<KYCStackParamList, 'KYCIntro'>;

const DocumentIcon = ({ size = 20, color = '#2563EB' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84226 3.82149 2.15482C3.50893 2.46738 3.33333 2.8913 3.33333 3.33333V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M11.6667 1.66667V6.66667H16.6667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.3333 10.8333H6.66667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.3333 14.1667H6.66667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8.33333 7.5H6.66667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

interface StepRowProps {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function StepRow({ iconBg, icon, title, desc }: StepRowProps) {
  return (
    <View style={styles.stepRow}>
      <View style={[styles.stepIconWrap, { backgroundColor: iconBg }]}>{icon}</View>
      <View className="flex-1">
        <Text className="font-inter-semibold text-[14px] text-[#111827]" allowFontScaling={false}>
          {title}
        </Text>
        <Text className="font-inter-regular text-[12px] text-[#6B7280] mt-0.5" allowFontScaling={false}>
          {desc}
        </Text>
      </View>
      <ChevronRightIcon size={16} color="#9CA3AF" />
    </View>
  );
}

export default function KYCStatusScreen({ navigation }: Props) {
  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <View className="flex-1 px-xl">
        {/* Top spacer */}
        <View style={styles.headerSpacer} />

        {/* Hero */}
        <View className="items-center mb-6">
          <View style={styles.outerCircle}>
            <LinearGradient
              colors={['#EFF6FF', '#DBEAFE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.innerCircle}
            >
              <ShieldCheckIcon size={44} color="#2563EB" />
            </LinearGradient>
            <View style={[styles.badge, styles.badgeTopRight]}>
              <DocumentIcon size={18} color="#2563EB" />
            </View>
            <View style={[styles.badge, styles.badgeBottomLeft]}>
              <FaceIdIcon size={18} color="#7C3AED" />
            </View>
          </View>

          <View className="mt-4 bg-[#F0FDF4] rounded-full px-[14px] py-[6px]">
            <Text className="font-inter-medium text-[12px] text-[#059669]" allowFontScaling={false}>
              Powered by AI · Secure &amp; Private
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text
          className="font-jakarta-bold text-[28px] text-[#111827] text-center mb-[10px]"
          allowFontScaling={false}
        >
          Verify Your Identity
        </Text>

        {/* Subtitle */}
        <Text
          className="font-inter-regular text-base text-[#6B7280] text-center self-center mb-7"
          style={{ maxWidth: 272 }}
          allowFontScaling={false}
        >
          Complete KYC to unlock all features and enjoy full access to your digital wallet
        </Text>

        {/* Step rows */}
        <View className="flex-1 gap-3">
          <StepRow
            iconBg="#EFF6FF"
            icon={<DocumentIcon size={20} color="#2563EB" />}
            title="Document Verification"
            desc="Upload a government-issued ID"
          />
          <StepRow
            iconBg="#F5F3FF"
            icon={<FaceIdIcon size={20} color="#7C3AED" />}
            title="Liveness Check"
            desc="Quick selfie to confirm identity"
          />
          <StepRow
            iconBg="#F0FDF4"
            icon={<CheckCircleIcon size={20} color="#10B981" />}
            title="Instant Review"
            desc="AI-powered verification in minutes"
          />
        </View>

        {/* Buttons */}
        <View className="pb-3xl pt-6 gap-3">
          <AppButton
            label="Start Verification"
            onPress={() => navigation.navigate('DocumentCapture')}
          />
          <Pressable
            className="h-[44px] items-center justify-center active:opacity-pressed"
            onPress={() => console.log('Maybe later')}
            accessibilityLabel="Maybe Later"
          >
            <Text className="font-inter-medium text-[14px] text-[#6B7280]" allowFontScaling={false}>
              Maybe Later
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    height: 10,
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
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 10,
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
    top: 8,
    right: -4,
  },
  badgeBottomLeft: {
    bottom: 8,
    left: -4,
  },
  stepRow: {
    height: 71,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
