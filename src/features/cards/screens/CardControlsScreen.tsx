import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="#111827"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CreditCardIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Rect x={1.5} y={3.5} width={15} height={11} rx={2} stroke="rgba(255,255,255,0.6)" strokeWidth={1.4} />
    <Path d="M1.5 7.5H16.5" stroke="rgba(255,255,255,0.6)" strokeWidth={1.4} />
  </Svg>
);

const WifiIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M2.7 6.75C6.174 3.753 11.826 3.753 15.3 6.75" stroke="rgba(255,255,255,0.6)" strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M4.95 9.45C7.11 7.65 10.89 7.65 13.05 9.45" stroke="rgba(255,255,255,0.6)" strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M7.65 12.15C8.46 11.547 9.54 11.547 10.35 12.15" stroke="rgba(255,255,255,0.6)" strokeWidth={1.4} strokeLinecap="round" />
    <Circle cx={9} cy={14.4} r={0.9} fill="rgba(255,255,255,0.6)" />
  </Svg>
);

const CheckCircleIcon = ({ color = '#059669', size = 16 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Defs>
      <ClipPath id="cc-clip">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#cc-clip)">
      <Path
        d="M14.534 6.66667C14.8385 8.16087 14.6215 9.71428 13.9192 11.0679C13.217 12.4214 12.0719 13.4934 10.675 14.1049C9.27809 14.7164 7.71375 14.8305 6.24287 14.4282C4.77198 14.026 3.48346 13.1316 2.59218 11.8943C1.70091 10.657 1.26075 9.15149 1.34511 7.62892C1.42947 6.10636 2.03325 4.65873 3.05577 3.52745C4.07828 2.39617 5.45772 1.64962 6.96404 1.4123C8.47037 1.17498 10.0125 1.46124 11.3333 2.22333"
        stroke={color}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 7.33333L8 9.33333L14.6667 2.66667"
        stroke={color}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const UnlockIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7C6.99875 5.76005 7.45828 4.56387 8.28937 3.64367C9.12047 2.72347 10.2638 2.1449 11.4975 2.02029C12.7312 1.89568 13.9671 2.2339 14.9655 2.96931C15.9638 3.70472 16.6533 4.78485 16.9 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ color = 'white' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z"
      stroke={color}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.83333 9.16667V5.83333C5.83333 4.72826 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72826 14.1667 5.83333V9.16667"
      stroke={color}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldAlertIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M16.6667 10.8333C16.6667 15 13.75 17.0833 10.2833 18.2917C10.1018 18.3532 9.90461 18.3502 9.725 18.2833C6.25 17.0833 3.33333 15 3.33333 10.8333V5C3.33333 4.77899 3.42113 4.56703 3.57741 4.41074C3.73369 4.25446 3.94565 4.16667 4.16667 4.16667C5.83333 4.16667 7.91667 3.16667 9.36667 1.9C9.54321 1.74917 9.76779 1.66629 10 1.66629C10.2322 1.66629 10.4568 1.74917 10.6333 1.9C12.0917 3.175 14.1667 4.16667 15.8333 4.16667C16.0543 4.16667 16.2663 4.25446 16.4226 4.41074C16.5789 4.56703 16.6667 4.77899 16.6667 5V10.8333Z"
      stroke="#EF4444"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M10 6.66667V10" stroke="#EF4444" strokeWidth={1.67} strokeLinecap="round" />
    <Path d="M10 13.3333H10.0083" stroke="#EF4444" strokeWidth={1.67} strokeLinecap="round" />
  </Svg>
);

const SlidersIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M3.33333 10H16.6667" stroke="#6366F1" strokeWidth={1.67} strokeLinecap="round" />
    <Path d="M3.33333 5H16.6667" stroke="#6366F1" strokeWidth={1.67} strokeLinecap="round" />
    <Path d="M3.33333 15H16.6667" stroke="#6366F1" strokeWidth={1.67} strokeLinecap="round" />
    <Circle cx={7.5} cy={5} r={2} fill="#EEF2FF" stroke="#6366F1" strokeWidth={1.4} />
    <Circle cx={12.5} cy={10} r={2} fill="#EEF2FF" stroke="#6366F1" strokeWidth={1.4} />
    <Circle cx={7.5} cy={15} r={2} fill="#EEF2FF" stroke="#6366F1" strokeWidth={1.4} />
  </Svg>
);

const RefreshCwIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667"
      stroke="#D97706"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M17.5 2.5V6.66667H13.3333" stroke="#D97706" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path
      d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333"
      stroke="#D97706"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M6.66667 13.3333H2.5V17.5" stroke="#D97706" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Mini Card ──────────────────────────────────────────────────────────────────

function MiniCard() {
  return (
    <View style={styles.miniCard}>
      {/* Decorative circle */}
      <View style={styles.miniCardCircle} />

      {/* Card type row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-[6px]">
          <CreditCardIcon />
          <Text
            className="font-inter-semibold text-[11px] text-[rgba(255,255,255,0.6)] tracking-[0.8px] uppercase"
            allowFontScaling={false}
          >
            DEBIT
          </Text>
        </View>
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <WifiIcon />
        </View>
      </View>

      {/* Chip */}
      <View style={styles.chip} />

      {/* Card number */}
      <Text
        className="font-mono text-[14px] text-white tracking-[2.5px]"
        allowFontScaling={false}
      >
        {'•••• •••• •••• 8294'}
      </Text>

      {/* Bottom row */}
      <View className="flex-row items-end justify-between">
        <Text
          className="font-inter-semibold text-[12px] text-white tracking-[0.3px]"
          allowFontScaling={false}
        >
          ALEX CARTER
        </Text>
        <Text
          className="font-inter-semibold italic text-[16px] text-white"
          allowFontScaling={false}
        >
          VISA
        </Text>
      </View>
    </View>
  );
}

// ── CardControlsScreen ────────────────────────────────────────────────────────

type ModalState = 'confirm' | 'success' | null;

export default function CardControlsScreen() {
  const navigation = useNavigation<any>();
  const [isFrozen, setIsFrozen] = useState(false);
  const [reportModal, setReportModal] = useState<ModalState>(null);
  const [replaceModal, setReplaceModal] = useState<ModalState>(null);

  const handleToggleFreeze = () => setIsFrozen(prev => !prev);

  const handleReportConfirm = () => setReportModal('success');
  const handleReplaceConfirm = () => setReplaceModal('success');

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl gap-base h-[56px]">
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
          Card Controls
        </Text>
        {/* Spacer to balance header */}
        <View className="w-[40px]" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* ── Mini Card Preview ─────────────────────────────────────────── */}
        <View className="items-center mt-md">
          <MiniCard />
        </View>

        {/* ── Status Badge ─────────────────────────────────────────────── */}
        <View className="items-center mt-[28px]">
          {isFrozen ? (
            <View className="flex-row items-center gap-sm px-[21px] h-[37px] rounded-full bg-[#FFFBEB] border border-[#FCD34D]">
              <LockIcon color="#D97706" />
              <Text className="font-inter-semibold text-[13px] text-[#D97706]" allowFontScaling={false}>
                Card is Frozen
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-sm px-[21px] h-[37px] rounded-full bg-[#F0FDF4] border border-[#A7F3D0]">
              <CheckCircleIcon />
              <Text className="font-inter-semibold text-[13px] text-[#059669]" allowFontScaling={false}>
                Card is Active
              </Text>
            </View>
          )}
        </View>

        {/* ── Freeze Card Section ───────────────────────────────────────── */}
        <View className="px-xl mt-xl">
          <View
            className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg px-[21px] pt-[21px] pb-[16px] gap-base"
            style={styles.sectionCard}
          >
            {/* Icon + text row */}
            <View className="flex-row items-center gap-[14px]">
              <View
                className="w-[48px] h-[48px] rounded-[16px] items-center justify-center"
                style={{ backgroundColor: isFrozen ? '#FFFBEB' : '#EFF6FF' }}
              >
                {isFrozen
                  ? <LockIcon color="#D97706" />
                  : <UnlockIcon />
                }
              </View>
              <View className="flex-1">
                <Text
                  className="font-jakarta-bold text-[16px] text-[#111827] dark:text-neutral-50 leading-[24px]"
                  allowFontScaling={false}
                >
                  {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                </Text>
                <Text
                  className="font-inter-regular text-small text-[#6B7280] dark:text-neutral-400 leading-[16.8px]"
                  allowFontScaling={false}
                >
                  {isFrozen
                    ? 'Re-enable all transactions'
                    : 'Temporarily disable all transactions'}
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <Pressable
              className="h-[52px] rounded-[14px] flex-row items-center justify-center gap-sm active:opacity-80"
              style={{ backgroundColor: isFrozen ? '#2563EB' : '#EF4444' }}
              onPress={handleToggleFreeze}
              accessibilityLabel={isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            >
              <LockIcon color="white" />
              <Text
                className="font-inter-semibold text-[15px] text-white"
                allowFontScaling={false}
              >
                {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ── Additional Options ────────────────────────────────────────── */}
        <View className="px-xl mt-xl gap-[10px]">
          <Text
            className="font-inter-semibold text-caption text-[#9CA3AF] tracking-[0.5px] uppercase"
            allowFontScaling={false}
          >
            ADDITIONAL OPTIONS
          </Text>

          <View
            className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg overflow-hidden"
            style={styles.sectionCard}
          >
            {/* Report Stolen */}
            <Pressable
              className="flex-row items-center px-base gap-[14px] h-[70px] active:bg-neutral-50 dark:active:bg-neutral-700"
              accessibilityLabel="Report stolen card"
              onPress={() => setReportModal('confirm')}
            >
              <View className="w-[42px] h-[42px] rounded-[13px] bg-[#FEF2F2] items-center justify-center shrink-0">
                <ShieldAlertIcon />
              </View>
              <View className="flex-1">
                <Text
                  className="font-inter-semibold text-body leading-[21px] text-[#111827] dark:text-neutral-50"
                  allowFontScaling={false}
                >
                  Report Stolen
                </Text>
                <Text
                  className="font-inter-regular text-small leading-[18px] text-[#9CA3AF] dark:text-neutral-500"
                  allowFontScaling={false}
                >
                  Permanently block and replace
                </Text>
              </View>
            </Pressable>

            {/* Divider */}
            <View className="h-divider bg-[#F3F4F6] dark:bg-neutral-700 ml-[72px]" />

            {/* Replace Card */}
            <Pressable
              className="flex-row items-center px-base gap-[14px] h-[70px] active:bg-neutral-50 dark:active:bg-neutral-700"
              accessibilityLabel="Replace card"
              onPress={() => setReplaceModal('confirm')}
            >
              <View className="w-[42px] h-[42px] rounded-[13px] bg-[#FFFBEB] items-center justify-center shrink-0">
                <RefreshCwIcon />
              </View>
              <View className="flex-1">
                <Text
                  className="font-inter-semibold text-body leading-[21px] text-[#111827] dark:text-neutral-50"
                  allowFontScaling={false}
                >
                  Replace Card
                </Text>
                <Text
                  className="font-inter-regular text-small leading-[18px] text-[#9CA3AF] dark:text-neutral-500"
                  allowFontScaling={false}
                >
                  Order a new card (current stays active)
                </Text>
              </View>
            </Pressable>

            {/* Divider */}
            <View className="h-divider bg-[#F3F4F6] dark:bg-neutral-700 ml-[72px]" />

            {/* Set Transaction Limits */}
            <Pressable
              className="flex-row items-center px-base gap-[14px] h-[70px] active:bg-neutral-50 dark:active:bg-neutral-700"
              accessibilityLabel="Set transaction limits"
              onPress={() => navigation.navigate('SpendingLimits')}
            >
              <View className="w-[42px] h-[42px] rounded-[13px] bg-[#EEF2FF] items-center justify-center shrink-0">
                <SlidersIcon />
              </View>
              <View className="flex-1">
                <Text
                  className="font-inter-semibold text-body leading-[21px] text-[#111827] dark:text-neutral-50"
                  allowFontScaling={false}
                >
                  Transaction Limits
                </Text>
                <Text
                  className="font-inter-regular text-small leading-[18px] text-[#9CA3AF] dark:text-neutral-500"
                  allowFontScaling={false}
                >
                  Set daily & monthly spend limits
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* ── Report Stolen Modal ──────────────────────────────────────────── */}
      <Modal
        visible={reportModal !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setReportModal(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setReportModal(null)}>
          <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
            {reportModal === 'confirm' ? (
              <>
                {/* Icon */}
                <View className="w-[72px] h-[72px] rounded-full bg-[#FEF2F2] items-center justify-center self-center mb-[20px]">
                  <ShieldAlertIcon size={36} />
                </View>
                {/* Title */}
                <Text
                  className="font-jakarta-bold text-[18px] text-[#111827] text-center leading-[27px] mb-[8px]"
                  allowFontScaling={false}
                >
                  Report Card as Stolen?
                </Text>
                {/* Body */}
                <Text
                  className="font-inter-regular text-[14px] text-[#6B7280] text-center leading-[21px] mb-[28px]"
                  allowFontScaling={false}
                >
                  This will permanently block your card ending in 8294 and issue a replacement.
                </Text>
                {/* Buttons */}
                <View className="flex-row gap-[10px]">
                  <Pressable
                    className="flex-1 h-[48px] rounded-[14px] bg-[#F3F4F6] items-center justify-center active:opacity-75"
                    onPress={() => setReportModal(null)}
                    accessibilityLabel="Cancel"
                  >
                    <Text className="font-inter-semibold text-[15px] text-[#374151]" allowFontScaling={false}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    className="flex-1 h-[48px] rounded-[14px] bg-[#EF4444] items-center justify-center active:opacity-80"
                    onPress={handleReportConfirm}
                    accessibilityLabel="Confirm report stolen"
                  >
                    <Text className="font-inter-semibold text-[15px] text-white" allowFontScaling={false}>
                      Confirm
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                {/* Success icon */}
                <View className="w-[72px] h-[72px] rounded-full bg-[#F0FDF4] items-center justify-center self-center mb-[20px]">
                  <CheckCircleIcon color="#059669" size={36} />
                </View>
                {/* Title */}
                <Text
                  className="font-jakarta-bold text-[18px] text-[#111827] text-center leading-[27px] mb-[8px]"
                  allowFontScaling={false}
                >
                  Report Submitted
                </Text>
                {/* Body */}
                <Text
                  className="font-inter-regular text-[14px] text-[#6B7280] text-center leading-[21px]"
                  allowFontScaling={false}
                >
                  Your card has been blocked. A replacement will be issued shortly.
                </Text>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Replace Card Modal ───────────────────────────────────────────── */}
      <Modal
        visible={replaceModal !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setReplaceModal(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setReplaceModal(null)}>
          <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
            {replaceModal === 'confirm' ? (
              <>
                {/* Icon */}
                <View className="w-[72px] h-[72px] rounded-full bg-[#FFFBEB] items-center justify-center self-center mb-[20px]">
                  <RefreshCwIcon size={36} />
                </View>
                {/* Title */}
                <Text
                  className="font-jakarta-bold text-[18px] text-[#111827] text-center leading-[27px] mb-[8px]"
                  allowFontScaling={false}
                >
                  Replace Your Card?
                </Text>
                {/* Body */}
                <Text
                  className="font-inter-regular text-[14px] text-[#6B7280] text-center leading-[21px] mb-[28px]"
                  allowFontScaling={false}
                >
                  A new card will be sent to your registered address. Your current card will remain active until the new one arrives.
                </Text>
                {/* Buttons */}
                <View className="flex-row gap-[10px]">
                  <Pressable
                    className="flex-1 h-[48px] rounded-[14px] bg-[#F3F4F6] items-center justify-center active:opacity-75"
                    onPress={() => setReplaceModal(null)}
                    accessibilityLabel="Cancel"
                  >
                    <Text className="font-inter-semibold text-[15px] text-[#374151]" allowFontScaling={false}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    className="flex-1 h-[48px] rounded-[14px] bg-[#2563EB] items-center justify-center active:opacity-80"
                    onPress={handleReplaceConfirm}
                    accessibilityLabel="Confirm replace card"
                  >
                    <Text className="font-inter-semibold text-[15px] text-white" allowFontScaling={false}>
                      Confirm
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                {/* Success icon */}
                <View className="w-[72px] h-[72px] rounded-full bg-[#F0FDF4] items-center justify-center self-center mb-[20px]">
                  <CheckCircleIcon color="#059669" size={36} />
                </View>
                {/* Title */}
                <Text
                  className="font-jakarta-bold text-[18px] text-[#111827] text-center leading-[27px] mb-[8px]"
                  allowFontScaling={false}
                >
                  Replacement Requested
                </Text>
                {/* Body */}
                <Text
                  className="font-inter-regular text-[14px] text-[#6B7280] text-center leading-[21px]"
                  allowFontScaling={false}
                >
                  Your new card will be shipped to your registered address.
                </Text>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenWrapper>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  miniCard: {
    width: 280,
    height: 176,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 20,
    overflow: 'hidden',
    backgroundColor: '#2563EB',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  miniCardCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -24,
    right: 20,
  },
  chip: {
    width: 38,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#D4A84B',
  },
  sectionCard: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
});
