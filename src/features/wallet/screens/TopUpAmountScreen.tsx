import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  type TextInput as TextInputType,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import ChevronDownIcon from '@components/ui/icons/ChevronDownIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

// ── Types ─────────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletTopUpAmount'>;
type Route = RouteProp<WalletStackParamList, 'WalletTopUpAmount'>;

// ── Constants ─────────────────────────────────────────────────────────────────

const PRESET_AMOUNTS = ['50', '100', '250', '500'];
const PRESET_ROW2 = ['1000'];

const METHOD_DETAILS: Record<'card' | 'bank', { emoji: string; label: string }> = {
  card: { emoji: '💳', label: 'Charging Visa •••• 4829' },
  bank: { emoji: '🏦', label: 'Charging Chase Bank •••• 1234' },
};

// ── PresetButton ──────────────────────────────────────────────────────────────

interface PresetButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  isDark: boolean;
}

const PresetButton = React.memo(({ label, selected, onPress, isDark }: PresetButtonProps) => (
  <Pressable
    style={[
      styles.presetBtn,
      isDark && styles.presetBtnDark,
      selected && styles.presetBtnSelected,
    ]}
    onPress={onPress}
    className="active:opacity-pressed"
    accessibilityLabel={`Set amount to ${label}`}
  >
    <Text
      style={[
        styles.presetText,
        isDark && styles.presetTextDark,
        selected && styles.presetTextSelected,
      ]}
      allowFontScaling={false}
    >
      ${label}
    </Text>
  </Pressable>
));

// ── Main Screen ───────────────────────────────────────────────────────────────

const TopUpAmountScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { isDark } = useTheme();
  const { method } = route.params;

  const [amount, setAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const inputRef = useRef<TextInputType>(null);

  const methodInfo = METHOD_DETAILS[method];
  const numericAmount = parseFloat(amount) || 0;
  const isValid = numericAmount >= 10 && numericAmount <= 10000;

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleAmountChange = useCallback((text: string) => {
    // Strip non-numeric except single decimal point
    const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setAmount(cleaned);
    setSelectedPreset(null);
  }, []);

  const handlePreset = useCallback((preset: string) => {
    setAmount(preset);
    setSelectedPreset(preset);
    inputRef.current?.blur();
  }, []);

  const handleConfirm = useCallback(() => {
    navigation.navigate('WalletTopUpSuccess', { amount });
  }, [navigation, amount]);

  const handleAmountAreaPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} className="bg-white dark:bg-neutral-900">

      {/* ── Header ── */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Pressable
          style={[styles.backBtn, isDark && styles.backBtnDark]}
          onPress={handleBack}
          className="active:opacity-pressed"
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={20} color={isDark ? '#D1D5DB' : '#374151'} />
        </Pressable>
        <Text
          style={[styles.headerTitle, isDark && styles.headerTitleDark]}
          allowFontScaling={false}
        >
          Enter Amount
        </Text>
      </View>

      {/* ── Content ── */}
      <View style={styles.content}>

        {/* ── Wallet Chip (centered) ── */}
        <View style={styles.chipRow}>
          <Pressable
            style={[styles.walletChip, isDark && styles.walletChipDark]}
            className="active:opacity-pressed"
            accessibilityLabel="Select wallet currency"
          >
            <Text style={styles.chipFlag} allowFontScaling={false}>🇺🇸</Text>
            <Text
              style={[styles.chipLabel, isDark && styles.chipLabelDark]}
              allowFontScaling={false}
            >
              USD
            </Text>
            <ChevronDownIcon size={14} color={isDark ? '#60A5FA' : '#1D4ED8'} />
          </Pressable>
        </View>

        {/* ── Amount Input Area ── */}
        <Pressable
          style={styles.amountSection}
          onPress={handleAmountAreaPress}
          accessible={false}
        >
          <View style={styles.amountRow}>
            <Text
              style={[styles.currencySymbol, isDark && styles.currencySymbolDark]}
              allowFontScaling={false}
            >
              $
            </Text>
            <TextInput
              ref={inputRef}
              style={[styles.amountInput, isDark && styles.amountInputDark]}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor={isDark ? 'rgba(248,250,252,0.3)' : 'rgba(17,24,39,0.3)'}
              keyboardType="decimal-pad"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              maxLength={10}
              allowFontScaling={false}
              textAlign="center"
              selectionColor="#2563EB"
            />
          </View>
          <Text
            style={[styles.limitText, isDark && styles.limitTextDark]}
            allowFontScaling={false}
          >
            Min $10 · Max $10,000
          </Text>
        </Pressable>

        {/* ── Quick Presets ── */}
        <View style={styles.presetsContainer}>
          <View style={styles.presetsRow}>
            {PRESET_AMOUNTS.map(p => (
              <PresetButton
                key={p}
                label={p}
                selected={selectedPreset === p}
                onPress={() => handlePreset(p)}
                isDark={isDark}
              />
            ))}
          </View>
          <View style={styles.presetsRow}>
            {PRESET_ROW2.map(p => (
              <PresetButton
                key={p}
                label={p}
                selected={selectedPreset === p}
                onPress={() => handlePreset(p)}
                isDark={isDark}
              />
            ))}
          </View>
        </View>

        {/* ── Selected Payment Method Strip ── */}
        <View style={[styles.methodStrip, isDark && styles.methodStripDark]}>
          <Text style={styles.methodEmoji} allowFontScaling={false}>
            {methodInfo.emoji}
          </Text>
          <Text
            style={[styles.methodLabel, isDark && styles.methodLabelDark]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {methodInfo.label}
          </Text>
        </View>
      </View>

      {/* ── Footer ── */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Pressable
          style={[
            styles.confirmBtn,
            isValid ? styles.confirmBtnActive : styles.confirmBtnDisabled,
          ]}
          onPress={isValid ? handleConfirm : undefined}
          disabled={!isValid}
          className={isValid ? 'active:opacity-pressed' : undefined}
          accessibilityLabel="Confirm top up"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text
            style={[
              styles.confirmBtnText,
              isValid ? styles.confirmBtnTextActive : styles.confirmBtnTextDisabled,
            ]}
            allowFontScaling={false}
          >
            Confirm Top Up
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default TopUpAmountScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  headerDark: {
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnDark: {
    backgroundColor: '#1E293B',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F8FAFC',
  },

  // ── Content ──
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  // ── Wallet chip ──
  chipRow: {
    alignItems: 'center',
  },
  walletChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  walletChipDark: {
    backgroundColor: '#1e3a5f',
    borderColor: '#2563EB',
  },
  chipFlag: {
    fontSize: 16,
    lineHeight: 24,
  },
  chipLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#1D4ED8',
  },
  chipLabelDark: {
    color: '#60A5FA',
  },

  // ── Amount ──
  amountSection: {
    alignItems: 'center',
    marginTop: 28,
    gap: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
  },
  currencySymbol: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 28,
    color: '#9CA3AF',
    marginTop: 14,
  },
  currencySymbolDark: {
    color: '#6B7280',
  },
  amountInput: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 52,
    lineHeight: 62,
    letterSpacing: -1,
    color: '#111827',
    minWidth: 120,
    maxWidth: 260,
    padding: 0,
    includeFontPadding: false,
  },
  amountInputDark: {
    color: '#F8FAFC',
  },
  limitText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  limitTextDark: {
    color: '#6B7280',
  },

  // ── Presets ──
  presetsContainer: {
    marginTop: 24,
    gap: 10,
  },
  presetsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  presetBtn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  presetBtnSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  presetText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  presetTextDark: {
    color: '#9CA3AF',
  },
  presetTextSelected: {
    color: '#1D4ED8',
  },

  // ── Method strip ──
  methodStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
    paddingHorizontal: 12,
    height: 41,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  methodStripDark: {
    backgroundColor: '#1E293B',
  },
  methodEmoji: {
    fontSize: 14,
    lineHeight: 21,
  },
  methodLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
    flex: 1,
  },
  methodLabelDark: {
    color: '#9CA3AF',
  },

  // ── Footer ──
  footer: {
    paddingTop: 17,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerDark: {
    backgroundColor: '#0F172A',
    borderTopColor: '#1E293B',
  },
  confirmBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnActive: {
    backgroundColor: '#2563EB',
  },
  confirmBtnDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  confirmBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 16,
    lineHeight: 23,
  },
  confirmBtnTextActive: {
    color: '#FFFFFF',
  },
  confirmBtnTextDisabled: {
    color: '#9CA3AF',
  },
});
