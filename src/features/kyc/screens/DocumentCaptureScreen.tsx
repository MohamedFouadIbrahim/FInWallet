import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppButton from '@components/ui/AppButton';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import CameraIcon from '@components/ui/icons/CameraIcon';
import CheckCircleIcon from '@components/ui/icons/CheckCircleIcon';
import FlashIcon from '@components/ui/icons/FlashIcon';
import type { KYCStackParamList } from '@features/kyc/navigation/KYCNavigator';

type Props = NativeStackScreenProps<KYCStackParamList, 'DocumentCapture'>;

type DocType = 'passport' | 'national' | 'driver';

const DOC_TABS: { key: DocType; label: string }[] = [
  { key: 'passport', label: 'Passport' },
  { key: 'national', label: 'National ID' },
  { key: 'driver', label: 'Driver License' },
];

const InfoIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Circle cx={8} cy={8} r={6.5} stroke="#3B82F6" strokeWidth={1.3} />
    <Path d="M8 7.33333V10.6667" stroke="#3B82F6" strokeWidth={1.3} strokeLinecap="round" />
    <Circle cx={8} cy={5.33333} r={0.666667} fill="#3B82F6" />
  </Svg>
);

const CornerMarker = ({
  position,
  color,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  color: string;
}) => {
  const isTop = position === 'tl' || position === 'tr';
  const isLeft = position === 'tl' || position === 'bl';
  return (
    <View
      style={[
        styles.corner,
        isTop ? { top: -1 } : { bottom: -1 },
        isLeft ? { left: -1 } : { right: -1 },
      ]}
    >
      <View
        style={[
          styles.cornerH,
          { backgroundColor: color },
          isTop ? { top: 0 } : { bottom: 0 },
          isLeft ? { left: 0 } : { right: 0 },
        ]}
      />
      <View
        style={[
          styles.cornerV,
          { backgroundColor: color },
          isTop ? { top: 0 } : { bottom: 0 },
          isLeft ? { left: 0 } : { right: 0 },
        ]}
      />
    </View>
  );
};

export default function DocumentCaptureScreen({ navigation }: Props) {
  const [documentDetected, setDocumentDetected] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocType>('passport');

  const frameColor = documentDetected ? '#10B981' : 'rgba(255,255,255,0.6)';

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
          {/* Title row */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="font-jakarta-bold text-[22px] text-[#111827]" allowFontScaling={false}>
                Capture Document
              </Text>
              <Text className="font-inter-regular text-[13px] text-[#6B7280] mt-0.5" allowFontScaling={false}>
                Place your document inside the frame
              </Text>
            </View>
            <Pressable
              className="w-10 h-10 rounded-md bg-neutral-100 items-center justify-center active:opacity-pressed"
              accessibilityLabel="Toggle flash"
            >
              <FlashIcon size={18} color="#374151" />
            </Pressable>
          </View>

          {/* Doc type tabs */}
          <View className="flex-row bg-neutral-100 rounded-md h-10 mt-4 p-1 gap-1">
            {DOC_TABS.map(tab => (
              <Pressable
                key={tab.key}
                style={[
                  styles.tab,
                  selectedDocType === tab.key && styles.tabActive,
                ]}
                onPress={() => setSelectedDocType(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedDocType === tab.key && styles.tabTextActive,
                  ]}
                  allowFontScaling={false}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Camera viewfinder */}
          <View style={styles.viewfinder}>
            <View style={styles.darkOverlay} />
            <View
              style={[
                styles.docFrame,
                { borderColor: frameColor },
                documentDetected && styles.docFrameDetected,
              ]}
            >
              <CornerMarker position="tl" color={frameColor} />
              <CornerMarker position="tr" color={frameColor} />
              <CornerMarker position="bl" color={frameColor} />
              <CornerMarker position="br" color={frameColor} />
              <View className="items-center gap-2">
                {documentDetected ? (
                  <>
                    <CheckCircleIcon size={28} color="#10B981" />
                    <Text
                      className="font-inter-semibold text-[13px] text-[#10B981]"
                      allowFontScaling={false}
                    >
                      Document Detected
                    </Text>
                  </>
                ) : (
                  <CameraIcon size={32} color="#9CA3AF" />
                )}
              </View>
            </View>
          </View>

          {/* Info banner */}
          <View
            style={[
              styles.banner,
              documentDetected ? styles.bannerSuccess : styles.bannerInfo,
            ]}
          >
            {documentDetected ? (
              <CheckCircleIcon size={16} color="#10B981" />
            ) : (
              <InfoIcon />
            )}
            <Text
              style={[
                styles.bannerText,
                documentDetected ? styles.bannerTextSuccess : styles.bannerTextInfo,
              ]}
              allowFontScaling={false}
            >
              {documentDetected
                ? 'Document detected successfully. Press Continue to proceed.'
                : 'Ensure good lighting and all four corners of the document are visible.'}
            </Text>
          </View>

          {/* Button */}
          <View className="mt-auto pb-3xl pt-4">
            {documentDetected ? (
              <AppButton
                label="Continue"
                onPress={() => navigation.navigate('SelfieCapture')}
              />
            ) : (
              <AppButton
                label="Capture Document"
                leftIcon={<CameraIcon size={18} color="#FFFFFF" />}
                onPress={() => setDocumentDetected(true)}
              />
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  tabTextActive: {
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  viewfinder: {
    height: 224,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  docFrame: {
    width: 280,
    height: 170,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docFrameDetected: {
    backgroundColor: 'rgba(16,185,129,0.08)',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  cornerH: {
    position: 'absolute',
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  cornerV: {
    position: 'absolute',
    width: 3,
    height: 20,
    borderRadius: 2,
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
