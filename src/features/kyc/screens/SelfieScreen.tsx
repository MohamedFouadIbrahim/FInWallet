import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppButton from '@components/ui/AppButton';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import CheckCircleIcon from '@components/ui/icons/CheckCircleIcon';
import ScanFaceIcon from '@components/ui/icons/ScanFaceIcon';
import type { KYCStackParamList } from '@features/kyc/navigation/KYCNavigator';

type Props = NativeStackScreenProps<KYCStackParamList, 'SelfieCapture'>;

const InfoIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Circle cx={8} cy={8} r={6.5} stroke="#3B82F6" strokeWidth={1.3} />
    <Path d="M8 7.33333V10.6667" stroke="#3B82F6" strokeWidth={1.3} strokeLinecap="round" />
    <Circle cx={8} cy={5.33333} r={0.666667} fill="#3B82F6" />
  </Svg>
);

// Fingerprint / liveness AI icon (12×12, from Figma)
const LivenessAIIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Defs>
      <ClipPath id="clip_liveness">
        <Rect width={12} height={12} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip_liveness)">
      <Path d="M6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6C5 6.51 4.95 7.255 4.87 8" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 6.56C7 7.75 7 9.75 6.5 11" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.645 10.51C8.705 10.21 8.86 9.36 8.895 9" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1 6C1 4.95059 1.33019 3.92778 1.94379 3.07645C2.55739 2.22512 3.4233 1.58844 4.41886 1.25658C5.41442 0.92473 6.48916 0.914531 7.49084 1.22743C8.49252 1.54033 9.37035 2.16047 10 3" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1 8H1.005" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.9 8C11 7 10.9655 5.323 10.9 5" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.5 9.75C2.75 9 3 7.5 3 6C2.99949 5.65943 3.05698 5.32127 3.17 5" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4.325 11C4.43 10.67 4.55 10.34 4.61 10" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4.5 3.4C4.9562 3.13661 5.47371 2.99799 6.00048 2.99808C6.52725 2.99816 7.04472 3.13695 7.50083 3.40048C7.95695 3.66401 8.33563 4.043 8.5988 4.49933C8.86196 4.95565 9.00034 5.47323 9 6V7" stroke="#93C5FD" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

// Shield-check / anti-spoof icon (12×12, from Figma)
const AntiSpoofIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path
      d="M10 6.5C10 9 8.25 10.25 6.17 10.975C6.06108 11.0119 5.94277 11.0101 5.835 10.97C3.75 10.25 2 9 2 6.5V3C2 2.86739 2.05268 2.74021 2.14645 2.64645C2.24021 2.55268 2.36739 2.5 2.5 2.5C3.5 2.5 4.75 1.9 5.62 1.14C5.72593 1.0495 5.86068 0.999775 6 0.999775C6.13932 0.999775 6.27407 1.0495 6.38 1.14C7.255 1.905 8.5 2.5 9.5 2.5C9.63261 2.5 9.75979 2.55268 9.85355 2.64645C9.94732 2.74021 10 2.86739 10 3V6.5Z"
      stroke="#6EE7B7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M4.5 6L5.5 7L7.5 5" stroke="#6EE7B7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const INSTRUCTION_PILLS = ['Look straight', 'Remove glasses', 'Good lighting'];

export default function SelfieScreen({ navigation }: Props) {
  const [selfieDetected, setSelfieDetected] = useState(false);

  const frameBorderColor = selfieDetected ? '#10B981' : 'rgba(255,255,255,0.7)';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <View className="flex-1">
        {/* Header */}
        <View className="h-header justify-center pl-xl">
          <Pressable
            className="w-10 h-10 rounded-md bg-neutral-100 items-center justify-center active:opacity-pressed"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <ArrowLeftIcon size={20} color="#111827" />
          </Pressable>
        </View>

        {/* Content */}
        <View className="flex-1 px-xl">
          <Text className="font-jakarta-bold text-[22px] text-[#111827]" allowFontScaling={false}>
            Selfie &amp; Liveness Check
          </Text>
          <Text className="font-inter-regular text-[13px] text-[#6B7280] mt-1" allowFontScaling={false}>
            Position your face within the circle
          </Text>

          {/* Camera viewfinder */}
          <View style={styles.viewfinder}>
            <View style={styles.darkOverlay} />

            {/* Face frame */}
            <View
              style={[
                styles.faceFrame,
                {
                  borderColor: frameBorderColor,
                  backgroundColor: selfieDetected
                    ? 'rgba(16,185,129,0.08)'
                    : 'rgba(255,255,255,0.04)',
                },
                selfieDetected && styles.faceFrameGlow,
              ]}
            >
              <View className="items-center gap-2">
                {selfieDetected ? (
                  <>
                    <CheckCircleIcon size={28} color="#10B981" />
                    <Text
                      className="font-inter-semibold text-[13px] text-[#10B981]"
                      allowFontScaling={false}
                    >
                      Live Detected
                    </Text>
                  </>
                ) : (
                  <ScanFaceIcon size={56} color="rgba(255,255,255,0.85)" />
                )}
              </View>
            </View>

            {/* AI badges */}
            <View style={styles.aiBadgesRow}>
              <View style={styles.aiBadge}>
                <LivenessAIIcon />
                <Text style={[styles.aiBadgeText, { color: '#BFDBFE' }]} allowFontScaling={false}>
                  Liveness AI
                </Text>
              </View>
              <View style={styles.aiBadge}>
                <AntiSpoofIcon />
                <Text style={[styles.aiBadgeText, { color: '#A7F3D0' }]} allowFontScaling={false}>
                  Anti-Spoof
                </Text>
              </View>
            </View>
          </View>

          {/* Info banner */}
          <View
            style={[
              styles.banner,
              selfieDetected ? styles.bannerSuccess : styles.bannerInfo,
            ]}
          >
            {selfieDetected ? (
              <CheckCircleIcon size={16} color="#10B981" />
            ) : (
              <InfoIcon />
            )}
            <Text
              style={[
                styles.bannerText,
                selfieDetected ? styles.bannerTextSuccess : styles.bannerTextInfo,
              ]}
              allowFontScaling={false}
            >
              {selfieDetected
                ? 'Identity confirmed. Liveness check passed successfully.'
                : 'Remove glasses, face the camera in a well-lit environment.'}
            </Text>
          </View>

          {/* Instruction pills */}
          <View className="flex-row gap-2 mt-4 flex-wrap">
            {INSTRUCTION_PILLS.map(label => (
              <View
                key={label}
                className="h-[26px] rounded-full bg-neutral-100 px-3 items-center justify-center"
              >
                <Text className="font-inter-medium text-[11px] text-[#374151]" allowFontScaling={false}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* Button */}
          <View className="mt-auto pb-3xl pt-4">
            {selfieDetected ? (
              <AppButton
                label="Continue"
                onPress={() => console.log('KYC complete — navigate to main app')}
              />
            ) : (
              <AppButton
                label="Take Selfie"
                leftIcon={<ScanFaceIcon size={18} color="#FFFFFF" />}
                onPress={() => setSelfieDetected(true)}
              />
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  viewfinder: {
    height: 260,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  faceFrame: {
    width: 172,
    height: 210,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceFrameGlow: {
    shadowColor: '#10B981',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  aiBadgesRow: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    gap: 8,
  },
  aiBadge: {
    height: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 5,
  },
  aiBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
  },
  banner: {
    height: 65,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
  },
  bannerInfo: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  bannerSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  bannerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  bannerTextInfo: {
    color: '#1E40AF',
  },
  bannerTextSuccess: {
    color: '#065F46',
  },
});
