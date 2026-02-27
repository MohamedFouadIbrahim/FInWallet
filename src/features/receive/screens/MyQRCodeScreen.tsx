import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';

// ── Constants ─────────────────────────────────────────────────────────────────

const EXPIRY_SECONDS = 60;
const WALLET_ID = 'FW-8429-XKPL';
const USER_NAME = 'Alex Carter';
const QR_SIZE = 220;

// ── Inline icons ──────────────────────────────────────────────────────────────

const BackArrowIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="#111827"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const QrCodeIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Rect x={2} y={2} width={5} height={5} rx={0.8} stroke={color} strokeWidth={1.3} />
    <Rect x={9} y={2} width={5} height={5} rx={0.8} stroke={color} strokeWidth={1.3} />
    <Rect x={2} y={9} width={5} height={5} rx={0.8} stroke={color} strokeWidth={1.3} />
    <Path d="M9 9H11M11 9V11M11 11H13M9 11V13M13 11V13" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
  </Svg>
);

const ClockIcon = ({ color = '#EF4444', size = 20 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth={1.8}
    />
    <Path
      d="M12 6V12L16 14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12L11 14L15 10"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShareIcon = ({ color = 'white' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6L12 2L8 6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2V15"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const DownloadIcon = ({ color = '#111827' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 12L12 16L16 12"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 4V16"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const RefreshIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 4V10H7"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1402 17.8121 18.8798C19.3017 17.6193 20.3413 15.909 20.7742 14.0064C21.2072 12.1037 21.0101 10.112 20.2126 8.33111C19.4152 6.55025 18.0605 5.07685 16.3528 4.13742C14.6451 3.19799 12.6769 2.84095 10.7447 3.11985C8.81245 3.39874 7.02091 4.29836 5.64 5.67999L1 10"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CopyIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 8H6C4.89543 8 4 8.89543 4 10V18C4 19.1046 4.89543 20 6 20H14C15.1046 20 16 19.1046 16 18V16"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x={8} y={4} width={12} height={12} rx={2} stroke={color} strokeWidth={1.6} />
  </Svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── MyQRCodeScreen ────────────────────────────────────────────────────────────

export default function MyQRCodeScreen() {
  const navigation = useNavigation<any>();
  const [countdown, setCountdown] = useState(EXPIRY_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const [amount, setAmount] = useState('10');
  const [note, setNote] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  const handleRegenerate = useCallback(() => {
    setIsExpired(false);
    setCountdown(EXPIRY_SECONDS);
    startTimer();
  }, [startTimer]);

  const qrValue = `finwallet://pay?id=${WALLET_ID}&amount=${amount}&note=${encodeURIComponent(note)}`;
  const displayAmount = amount ? `$${parseFloat(amount || '0').toFixed(2)}` : '$0.00';

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ───────────────────────────────────────────────────── */}
        <View className="flex-row items-center h-header px-xl">
          <Pressable
            className="w-[40px] h-[40px] rounded-md bg-white border border-[#E5E7EB] items-center justify-center active:opacity-pressed"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <BackArrowIcon />
          </Pressable>
          <Text
            className="flex-1 text-center font-jakarta-bold text-[17px] text-[#111827] leading-[25.5px]"
            allowFontScaling={false}
          >
            Receive Money
          </Text>
          {/* Spacer to keep title centered */}
          <View className="w-[40px]" />
        </View>

        {/* ── Subtitle ─────────────────────────────────────────────────── */}
        <View className="flex-row items-center justify-center gap-[6px] mt-xs">
          <QrCodeIcon />
          <Text
            className="font-inter-regular text-small text-[#6B7280] leading-[18px]"
            allowFontScaling={false}
          >
            Let sender scan this code
          </Text>
        </View>

        {/* ── QR Card ──────────────────────────────────────────────────── */}
        <View className="items-center mt-xl px-xl">
          <View className="bg-white rounded-lg w-full items-center py-xl px-base" style={styles.card}>
            {/* QR code + overlay */}
            <View style={styles.qrContainer}>
              {!isExpired ? (
                <QRCode
                  value={qrValue}
                  size={QR_SIZE}
                  color="#111827"
                  backgroundColor="white"
                />
              ) : (
                /* Blank placeholder when expired so layout is stable */
                <View style={{ width: QR_SIZE, height: QR_SIZE }} />
              )}

              {/* "FW" initials overlay */}
              {!isExpired && (
                <View className="absolute items-center justify-center" style={styles.fwOverlay}>
                  <Text
                    className="font-jakarta-bold text-white text-[13px]"
                    allowFontScaling={false}
                  >
                    FW
                  </Text>
                </View>
              )}

              {/* Expired overlay */}
              {isExpired && (
                <View className="absolute inset-0 items-center justify-center rounded-lg" style={styles.expiredOverlay}>
                  <ClockIcon color="#EF4444" size={56} />
                  <Text
                    className="font-jakarta-bold text-[18px] text-[#EF4444] mt-sm"
                    allowFontScaling={false}
                  >
                    QR Expired
                  </Text>
                  <View className="mt-base">
                    <AppButton
                      label="Generate New QR"
                      onPress={handleRegenerate}
                      variant="primary"
                      style={styles.generateBtn}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* User name */}
            <Text
              className="font-jakarta-bold text-[16px] text-[#111827] mt-base"
              allowFontScaling={false}
            >
              {USER_NAME}
            </Text>

            {/* Wallet ID + copy */}
            <Pressable
              className="flex-row items-center gap-[6px] mt-xxs active:opacity-pressed"
              accessibilityLabel="Copy wallet ID"
            >
              <Text
                className="font-inter-regular text-small text-[#6B7280]"
                allowFontScaling={false}
              >
                {WALLET_ID}
              </Text>
              <CopyIcon />
            </Pressable>

            {/* Amount badge */}
            <View className="mt-base bg-info-50 rounded-full px-xl h-[34px] items-center justify-center">
              <Text
                className="font-jakarta-bold text-[14px] text-info-600"
                allowFontScaling={false}
              >
                {displayAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Status row ───────────────────────────────────────────────── */}
        <View className="flex-row items-center justify-center gap-sm mt-base">
          {!isExpired && (
            <View className="flex-row items-center gap-[5px] bg-[#FEF2F2] rounded-full px-md h-[28px]">
              <ClockIcon color="#EF4444" size={12} />
              <Text
                className="font-inter-semibold text-caption text-[#EF4444]"
                allowFontScaling={false}
              >
                {formatTime(countdown)}
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-[5px] bg-[#F0FDF4] rounded-full px-md h-[28px]">
            <ShieldIcon />
            <Text
              className="font-inter-semibold text-caption text-[#059669]"
              allowFontScaling={false}
            >
              Secure payment
            </Text>
          </View>
        </View>

        {/* ── Amount input ─────────────────────────────────────────────── */}
        <View className="px-xl mt-xl">
          <View
            className="flex-row items-center h-btn rounded-md border border-[#E5E7EB] bg-white px-base"
            style={styles.inputRow}
          >
            <Text
              className="font-jakarta-bold text-[18px] text-[#374151] mr-xs"
              allowFontScaling={false}
            >
              $
            </Text>
            <TextInput
              className="flex-1 font-inter-regular text-[16px] text-[#111827]"
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              style={styles.textInput}
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* ── Note input ───────────────────────────────────────────────── */}
        <View className="px-xl mt-md">
          <View
            className="h-btn rounded-md border border-[#E5E7EB] bg-white justify-center px-base"
            style={styles.inputRow}
          >
            <TextInput
              className="font-inter-regular text-[16px] text-[#111827]"
              placeholder="Add a note (optional)"
              placeholderTextColor="#9CA3AF"
              value={note}
              onChangeText={setNote}
              style={styles.textInput}
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* ── Action buttons ───────────────────────────────────────────── */}
        <View className="flex-row px-xl mt-xl gap-md">
          <View className="flex-1">
            <AppButton
              label="Share QR"
              variant="primary"
              style={styles.actionBtn}
              leftIcon={<ShareIcon />}
              onPress={() => {}}
            />
          </View>
          <View className="flex-1">
            <AppButton
              label="Download"
              variant="secondary"
              style={styles.actionBtn}
              leftIcon={<DownloadIcon color="#374151" />}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* ── Regenerate button ────────────────────────────────────────── */}
        <Pressable
          className="flex-row items-center justify-center gap-[6px] mt-xl active:opacity-pressed"
          onPress={handleRegenerate}
          accessibilityLabel="Regenerate QR Code"
        >
          <RefreshIcon />
          <Text
            className="font-inter-medium text-small text-[#6B7280]"
            allowFontScaling={false}
          >
            Regenerate QR Code
          </Text>
        </Pressable>

        <View className="h-xl" />
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  qrContainer: {
    width: QR_SIZE,
    height: QR_SIZE,
    position: 'relative',
  },
  fwOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    marginTop: -24,
    marginLeft: -24,
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  expiredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
  },
  generateBtn: {
    height: 40,
    paddingHorizontal: 20,
  },
  inputRow: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  textInput: {
    padding: 0,
    margin: 0,
  },
  actionBtn: {
    height: 48,
  },
});
