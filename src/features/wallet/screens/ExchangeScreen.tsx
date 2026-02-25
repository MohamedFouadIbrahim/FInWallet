import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  type TextInput as TextInputType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import ExchangeArrowsIcon from '@components/ui/icons/ExchangeArrowsIcon';
import ChevronDownIcon from '@components/ui/icons/ChevronDownIcon';
import CheckIcon from '@components/ui/icons/CheckIcon';
import CloseIcon from '@components/ui/icons/CloseIcon';
import ProcessingSpinnerIcon from '@components/ui/icons/ProcessingSpinnerIcon';
import ExchangeSuccessIcon from '@components/ui/icons/ExchangeSuccessIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

type ConfirmStep = 'confirm' | 'loading' | 'success';

// ── Types ─────────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletExchange'>;

interface Currency {
  id: string;
  flag: string;
  code: string;
  name: string;
  balance: number;
  symbol: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CURRENCIES: Currency[] = [
  { id: 'usd', flag: '🇺🇸', code: 'USD', name: 'US Dollar',    balance: 8240.50, symbol: '$' },
  { id: 'eur', flag: '🇪🇺', code: 'EUR', name: 'Euro',          balance: 3150.25, symbol: '€' },
  { id: 'gbp', flag: '🇬🇧', code: 'GBP', name: 'British Pound', balance: 1820.00, symbol: '£' },
  { id: 'aed', flag: '🇦🇪', code: 'AED', name: 'UAE Dirham',    balance: 5500.00, symbol: 'د.إ' },
];

const RATES: Record<string, Record<string, number>> = {
  usd: { usd: 1,      eur: 0.9185, gbp: 0.7891, aed: 3.6725 },
  eur: { usd: 1.0887, eur: 1,      gbp: 0.8581, aed: 3.9985 },
  gbp: { usd: 1.2673, eur: 1.1654, gbp: 1,      aed: 4.6522 },
  aed: { usd: 0.2723, eur: 0.2501, gbp: 0.2150, aed: 1      },
};

const EXCHANGE_FEE_PCT = 0.5;

const fmt = (n: number, d = 2) =>
  n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

// ── CurrencyPickerModal ───────────────────────────────────────────────────────

interface PickerModalProps {
  visible: boolean;
  selected: Currency;
  exclude: string;
  onSelect: (c: Currency) => void;
  onClose: () => void;
  isDark: boolean;
}

const CurrencyPickerModal = React.memo(
  ({ visible, selected, exclude, onSelect, onClose, isDark }: PickerModalProps) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.pickerSheet, isDark && styles.pickerSheetDark]}
          onPress={e => e.stopPropagation()}
        >
          <View style={[styles.pickerHandle, isDark && styles.pickerHandleDark]} />
          <Text
            style={[styles.pickerTitle, isDark && styles.pickerTitleDark]}
            allowFontScaling={false}
          >
            Select Currency
          </Text>
          {CURRENCIES.filter(c => c.id !== exclude).map(c => {
            const isSelected = c.id === selected.id;
            return (
              <Pressable
                key={c.id}
                style={[
                  styles.pickerRow,
                  isSelected && (isDark ? styles.pickerRowSelDark : styles.pickerRowSel),
                ]}
                onPress={() => { onSelect(c); onClose(); }}
                className="active:opacity-pressed"
                accessibilityLabel={`Select ${c.name}`}
              >
                <Text style={styles.pickerFlag} allowFontScaling={false}>{c.flag}</Text>
                <View style={styles.pickerInfo}>
                  <Text
                    style={[styles.pickerCode, isDark && styles.pickerCodeDark]}
                    allowFontScaling={false}
                  >
                    {c.code}
                  </Text>
                  <Text style={styles.pickerName} allowFontScaling={false}>
                    {`${c.name} · ${c.symbol}${fmt(c.balance)}`}
                  </Text>
                </View>
                {isSelected && <CheckIcon size={16} color="#2563EB" />}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  ),
);

// ── ConfirmExchangeModal ───────────────────────────────────────────────────────

interface ConfirmModalProps {
  visible: boolean;
  step: ConfirmStep;
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  fee: number;
  youReceive: number;
  rate: number;
  onClose: () => void;
  onConfirm: () => void;
  onBackToWallet: () => void;
  isDark: boolean;
}

const ConfirmExchangeModal = React.memo(
  ({
    visible,
    step,
    fromCurrency,
    toCurrency,
    fromAmount,
    fee,
    youReceive,
    rate,
    onClose,
    onConfirm,
    onBackToWallet,
    isDark,
  }: ConfirmModalProps) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={step === 'confirm' ? onClose : undefined}
    >
      <View style={confirmStyles.overlay}>
        <Pressable
          style={[confirmStyles.sheet, isDark && confirmStyles.sheetDark]}
          onPress={e => e.stopPropagation()}
        >

          {/* ── CONFIRM STEP ── */}
          {step === 'confirm' && (
            <>
              <View style={confirmStyles.header}>
                <Text
                  style={[confirmStyles.title, isDark && confirmStyles.titleDark]}
                  allowFontScaling={false}
                >
                  Confirm Exchange
                </Text>
                <Pressable
                  style={[confirmStyles.closeBtn, isDark && confirmStyles.closeBtnDark]}
                  onPress={onClose}
                  className="active:opacity-pressed"
                  accessibilityLabel="Close"
                >
                  <CloseIcon size={16} color={isDark ? '#9CA3AF' : '#374151'} />
                </Pressable>
              </View>

              <View style={confirmStyles.rows}>
                <View style={confirmStyles.row}>
                  <Text style={[confirmStyles.rowLabel, isDark && confirmStyles.rowLabelDark]} allowFontScaling={false}>You Send</Text>
                  <Text style={[confirmStyles.rowValue, isDark && confirmStyles.rowValueDark]} allowFontScaling={false}>
                    {`${fromCurrency.symbol}${fmt(fromAmount)} ${fromCurrency.code}`}
                  </Text>
                </View>
                <View style={[confirmStyles.divider, isDark && confirmStyles.dividerDark]} />

                <View style={confirmStyles.row}>
                  <Text style={[confirmStyles.rowLabel, isDark && confirmStyles.rowLabelDark]} allowFontScaling={false}>Exchange Rate</Text>
                  <Text style={[confirmStyles.rowValue, isDark && confirmStyles.rowValueDark]} allowFontScaling={false}>
                    {`1 ${fromCurrency.code} = ${fmt(rate, 4)} ${toCurrency.code}`}
                  </Text>
                </View>
                <View style={[confirmStyles.divider, isDark && confirmStyles.dividerDark]} />

                <View style={confirmStyles.row}>
                  <Text style={[confirmStyles.rowLabel, isDark && confirmStyles.rowLabelDark]} allowFontScaling={false}>
                    {`Service Fee (${EXCHANGE_FEE_PCT}%)`}
                  </Text>
                  <Text style={[confirmStyles.rowValue, isDark && confirmStyles.rowValueDark]} allowFontScaling={false}>
                    {`${fromCurrency.symbol}${fmt(fee)}`}
                  </Text>
                </View>
                <View style={[confirmStyles.divider, isDark && confirmStyles.dividerDark]} />

                <View style={[confirmStyles.row, confirmStyles.receiveRow]}>
                  <Text style={[confirmStyles.receiveLabel, isDark && confirmStyles.receiveLabelDark]} allowFontScaling={false}>You Receive</Text>
                  <Text style={confirmStyles.receiveValue} allowFontScaling={false}>
                    {`${toCurrency.symbol}${fmt(youReceive, 3)} ${toCurrency.code}`}
                  </Text>
                </View>
              </View>

              <View style={confirmStyles.btnRow}>
                <Pressable
                  style={[confirmStyles.cancelBtn, isDark && confirmStyles.cancelBtnDark]}
                  onPress={onClose}
                  className="active:opacity-pressed"
                  accessibilityLabel="Cancel exchange"
                >
                  <Text style={[confirmStyles.cancelBtnText, isDark && confirmStyles.cancelBtnTextDark]} allowFontScaling={false}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={confirmStyles.confirmBtn}
                  onPress={onConfirm}
                  className="active:opacity-pressed"
                  accessibilityLabel="Confirm exchange"
                >
                  <Text style={confirmStyles.confirmBtnText} allowFontScaling={false}>Confirm</Text>
                </Pressable>
              </View>
            </>
          )}

          {/* ── LOADING STEP ── */}
          {step === 'loading' && (
            <View style={confirmStyles.loadingContent}>
              <ProcessingSpinnerIcon size={44} color="#2563EB" />
              <Text
                style={[confirmStyles.loadingText, isDark && confirmStyles.loadingTextDark]}
                allowFontScaling={false}
              >
                Processing exchange…
              </Text>
            </View>
          )}

          {/* ── SUCCESS STEP ── */}
          {step === 'success' && (
            <View style={confirmStyles.successContent}>
              <View style={confirmStyles.successBadge}>
                <ExchangeSuccessIcon size={36} color="#059669" />
              </View>
              <Text
                style={[confirmStyles.successTitle, isDark && confirmStyles.successTitleDark]}
                allowFontScaling={false}
              >
                Exchange Complete!
              </Text>
              <Text
                style={[confirmStyles.successSubtitle, isDark && confirmStyles.successSubtitleDark]}
                allowFontScaling={false}
              >
                {`${toCurrency.symbol}${fmt(youReceive, 3)} ${toCurrency.code} added to your wallet.`}
              </Text>
              <Pressable
                style={confirmStyles.backBtn}
                onPress={onBackToWallet}
                className="active:opacity-pressed"
                accessibilityLabel="Back to Wallet"
              >
                <Text style={confirmStyles.backBtnText} allowFontScaling={false}>Back to Wallet</Text>
              </Pressable>
            </View>
          )}

        </Pressable>
      </View>
    </Modal>
  ),
);

// ── Main Screen ───────────────────────────────────────────────────────────────

const ExchangeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { isDark } = useTheme();
  const inputRef = useRef<TextInputType>(null);

  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
  const [toCurrency,   setToCurrency]   = useState<Currency>(CURRENCIES[1]);
  const [fromAmount, setFromAmount]     = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker,   setShowToPicker]   = useState(false);
  const [showConfirm,    setShowConfirm]    = useState(false);
  const [confirmStep,    setConfirmStep]    = useState<ConfirmStep>('confirm');
  const [secondsAgo, setSecondsAgo] = useState(0);

  // Live rate "updated X ago" ticker
  useEffect(() => {
    setSecondsAgo(0);
    const id = setInterval(() => setSecondsAgo(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [fromCurrency.id, toCurrency.id]);

  const rate       = RATES[fromCurrency.id][toCurrency.id];
  const numericFrom = parseFloat(fromAmount) || 0;
  const fee         = numericFrom * (EXCHANGE_FEE_PCT / 100);
  const amountAfterFee = numericFrom - fee;
  const youReceive  = amountAfterFee * rate;
  const isValid     = numericFrom > 0 && numericFrom <= fromCurrency.balance;

  const rateLabel = useMemo(
    () => `1 ${fromCurrency.code} = ${fmt(rate, 4)} ${toCurrency.code}`,
    [fromCurrency.code, toCurrency.code, rate],
  );

  const updatedLabel = secondsAgo < 60
    ? `Updated ${secondsAgo}s ago`
    : `Updated ${Math.floor(secondsAgo / 60)}m ago`;

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleAmountChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./, '$1');
    setFromAmount(cleaned);
  }, []);

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount('');
  }, [fromCurrency, toCurrency]);

  const handleSelectFrom = useCallback((c: Currency) => {
    setFromCurrency(c);
    setFromAmount('');
  }, []);

  const handleSelectTo = useCallback((c: Currency) => {
    setToCurrency(c);
  }, []);

  const handleReview = useCallback(() => {
    setConfirmStep('confirm');
    setShowConfirm(true);
  }, []);

  const handleConfirm = useCallback(() => {
    setConfirmStep('loading');
    setTimeout(() => setConfirmStep('success'), 2000);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setShowConfirm(false);
    setConfirmStep('confirm');
  }, []);

  const handleBackToWallet = useCallback(() => {
    setShowConfirm(false);
    setConfirmStep('confirm');
    setFromAmount('');
    navigation.goBack();
  }, [navigation]);

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
          Exchange Currency
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ════════════════ FROM ════════════════ */}
        <Text style={styles.sectionLabel} allowFontScaling={false}>FROM</Text>

        {/* Currency selector */}
        <Pressable
          style={[styles.currencyCard, isDark && styles.currencyCardDark]}
          onPress={() => setShowFromPicker(true)}
          className="active:opacity-pressed"
          accessibilityLabel="Select from currency"
        >
          <Text style={styles.currencyFlag} allowFontScaling={false}>{fromCurrency.flag}</Text>
          <View style={styles.currencyInfo}>
            <Text
              style={[styles.currencyCode, isDark && styles.currencyCodeDark]}
              allowFontScaling={false}
            >
              {fromCurrency.code}
            </Text>
            <Text style={styles.currencyBalance} allowFontScaling={false}>
              {`Balance: ${fromCurrency.symbol}${fmt(fromCurrency.balance)}`}
            </Text>
          </View>
          <ChevronDownIcon size={18} color={isDark ? '#6B7280' : '#9CA3AF'} />
        </Pressable>

        {/* Amount input */}
        <Pressable
          style={[styles.amountCard, isDark && styles.amountCardDark]}
          onPress={() => inputRef.current?.focus()}
          accessible={false}
        >
          <Text
            style={[styles.amountSymbol, isDark && styles.amountSymbolDark]}
            allowFontScaling={false}
          >
            {fromCurrency.symbol}
          </Text>
          <TextInput
            ref={inputRef}
            style={[styles.amountInput, isDark && styles.amountInputDark]}
            value={fromAmount}
            onChangeText={handleAmountChange}
            placeholder="0"
            placeholderTextColor={isDark ? 'rgba(248,250,252,0.25)' : 'rgba(17,24,39,0.2)'}
            keyboardType="decimal-pad"
            keyboardAppearance={isDark ? 'dark' : 'light'}
            maxLength={12}
            allowFontScaling={false}
            selectionColor="#2563EB"
          />
        </Pressable>

        {/* ════════════════ SWAP ════════════════ */}
        <View style={styles.swapRow}>
          <Pressable
            style={[styles.swapBtn, isDark && styles.swapBtnDark]}
            onPress={handleSwap}
            className="active:opacity-pressed"
            accessibilityLabel="Swap currencies"
          >
            <ExchangeArrowsIcon size={20} color="#2563EB" />
          </Pressable>
        </View>

        {/* ════════════════ TO ════════════════ */}
        <Text style={styles.sectionLabel} allowFontScaling={false}>TO</Text>

        {/* Currency selector */}
        <Pressable
          style={[styles.currencyCard, isDark && styles.currencyCardDark]}
          onPress={() => setShowToPicker(true)}
          className="active:opacity-pressed"
          accessibilityLabel="Select to currency"
        >
          <Text style={styles.currencyFlag} allowFontScaling={false}>{toCurrency.flag}</Text>
          <View style={styles.currencyInfo}>
            <Text
              style={[styles.currencyCode, isDark && styles.currencyCodeDark]}
              allowFontScaling={false}
            >
              {toCurrency.code}
            </Text>
            <Text style={styles.currencyBalance} allowFontScaling={false}>
              {`Balance: ${toCurrency.symbol}${fmt(toCurrency.balance)}`}
            </Text>
          </View>
          <ChevronDownIcon size={18} color={isDark ? '#6B7280' : '#9CA3AF'} />
        </Pressable>

        {/* ════════════════ LIVE RATE ════════════════ */}
        <View style={[styles.rateCard, isDark && styles.rateCardDark]}>
          <View style={styles.rateCardHeader}>
            <Text style={styles.rateCardLabel} allowFontScaling={false}>LIVE RATE</Text>
            <Text style={styles.rateUpdated} allowFontScaling={false}>
              {`↻  ${updatedLabel}`}
            </Text>
          </View>
          <Text
            style={[styles.rateValue, isDark && styles.rateValueDark]}
            allowFontScaling={false}
          >
            {rateLabel}
          </Text>
          <Text style={styles.rateMeta} allowFontScaling={false}>
            {`Mid-market rate · Includes ${EXCHANGE_FEE_PCT}% exchange fee`}
          </Text>
        </View>

        {/* ════════════════ FEE BREAKDOWN ════════════════ */}
        {numericFrom > 0 && (
          <View style={[styles.feeCard, isDark && styles.feeCardDark]}>
            <Text style={styles.feeCardLabel} allowFontScaling={false}>FEE BREAKDOWN</Text>

            <View style={styles.feeRow}>
              <Text style={[styles.feeLabel, isDark && styles.feeLabelDark]} allowFontScaling={false}>
                You send
              </Text>
              <Text style={[styles.feeValue, isDark && styles.feeValueDark]} allowFontScaling={false}>
                {`${fromCurrency.symbol}${fmt(numericFrom)} ${fromCurrency.code}`}
              </Text>
            </View>

            <View style={styles.feeRow}>
              <Text style={[styles.feeLabel, isDark && styles.feeLabelDark]} allowFontScaling={false}>
                {`Exchange Fee (${EXCHANGE_FEE_PCT}%)`}
              </Text>
              <Text style={[styles.feeValue, isDark && styles.feeValueDark]} allowFontScaling={false}>
                {`${fromCurrency.symbol}${fmt(fee)}`}
              </Text>
            </View>

            <View style={styles.feeRow}>
              <Text style={[styles.feeLabel, isDark && styles.feeLabelDark]} allowFontScaling={false}>
                Amount exchanged
              </Text>
              <Text style={[styles.feeValue, isDark && styles.feeValueDark]} allowFontScaling={false}>
                {`${fromCurrency.symbol}${fmt(amountAfterFee)}`}
              </Text>
            </View>

            <View style={[styles.feeDivider, isDark && styles.feeDividerDark]} />

            <View style={styles.feeTotalRow}>
              <Text
                style={[styles.feeTotalLabel, isDark && styles.feeTotalLabelDark]}
                allowFontScaling={false}
              >
                You Receive
              </Text>
              <Text style={styles.feeTotalValue} allowFontScaling={false}>
                {`${toCurrency.symbol}${fmt(youReceive, 3)} ${toCurrency.code}`}
              </Text>
            </View>
          </View>
        )}

      </ScrollView>

      {/* ── Footer ── */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Pressable
          style={[
            styles.reviewBtn,
            isValid ? styles.reviewBtnActive : styles.reviewBtnDisabled,
          ]}
          onPress={isValid ? handleReview : undefined}
          disabled={!isValid}
          className={isValid ? 'active:opacity-pressed' : undefined}
          accessibilityLabel="Review exchange"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text
            style={[
              styles.reviewBtnText,
              isValid ? styles.reviewBtnTextActive : styles.reviewBtnTextDisabled,
            ]}
            allowFontScaling={false}
          >
            Review Exchange
          </Text>
        </Pressable>
      </View>

      {/* ── Currency Pickers ── */}
      <CurrencyPickerModal
        visible={showFromPicker}
        selected={fromCurrency}
        exclude={toCurrency.id}
        onSelect={handleSelectFrom}
        onClose={() => setShowFromPicker(false)}
        isDark={isDark}
      />
      <CurrencyPickerModal
        visible={showToPicker}
        selected={toCurrency}
        exclude={fromCurrency.id}
        onSelect={handleSelectTo}
        onClose={() => setShowToPicker(false)}
        isDark={isDark}
      />

      <ConfirmExchangeModal
        visible={showConfirm}
        step={confirmStep}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        fromAmount={numericFrom}
        fee={fee}
        youReceive={youReceive}
        rate={rate}
        onClose={handleConfirmClose}
        onConfirm={handleConfirm}
        onBackToWallet={handleBackToWallet}
        isDark={isDark}
      />
    </ScreenWrapper>
  );
};

export default ExchangeScreen;

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
  backBtnDark: { backgroundColor: '#1E293B' },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  headerTitleDark: { color: '#F8FAFC' },

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 12,
  },

  // ── Section Labels ──
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: -4,
  },

  // ── Currency Selector Card ──
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 72,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  currencyCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  currencyFlag: {
    fontSize: 28,
    lineHeight: 36,
  },
  currencyInfo: {
    flex: 1,
    gap: 2,
  },
  currencyCode: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 17,
    lineHeight: 25.5,
    color: '#111827',
  },
  currencyCodeDark: { color: '#F8FAFC' },
  currencyBalance: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
  },

  // ── Amount Input Card ──
  amountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 74,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
  },
  amountCardDark: { backgroundColor: '#1E293B' },
  amountSymbol: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#9CA3AF',
    includeFontPadding: false,
  },
  amountSymbolDark: { color: '#6B7280' },
  amountInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: -0.5,
    color: '#111827',
    padding: 0,
    includeFontPadding: false,
  },
  amountInputDark: { color: '#F8FAFC' },

  // ── Swap ──
  swapRow: {
    alignItems: 'center',
    marginVertical: -2,
  },
  swapBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapBtnDark: {
    backgroundColor: '#1e3a5f',
    borderColor: '#1D4ED8',
  },

  // ── Live Rate Card ──
  rateCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 6,
  },
  rateCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  rateCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  rateCardLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.8,
  },
  rateUpdated: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },
  rateValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#111827',
    letterSpacing: -0.2,
  },
  rateValueDark: { color: '#F8FAFC' },
  rateMeta: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },

  // ── Fee Breakdown Card ──
  feeCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    gap: 0,
  },
  feeCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  feeCardLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  feeLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  feeLabelDark: { color: '#9CA3AF' },
  feeValue: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  feeValueDark: { color: '#F8FAFC' },
  feeDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  feeDividerDark: { backgroundColor: '#334155' },
  feeTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 2,
    minHeight: 48,
  },
  feeTotalLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
  },
  feeTotalLabelDark: { color: '#F8FAFC' },
  feeTotalValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#059669',
    letterSpacing: -0.3,
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
  reviewBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBtnActive: { backgroundColor: '#2563EB' },
  reviewBtnDisabled: { backgroundColor: '#E5E7EB', opacity: 0.5 },
  reviewBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 16,
    lineHeight: 23,
  },
  reviewBtnTextActive: { color: '#FFFFFF' },
  reviewBtnTextDisabled: { color: '#9CA3AF' },

  // ── Currency Picker Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  pickerSheetDark: { backgroundColor: '#1E293B' },
  pickerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  pickerHandleDark: { backgroundColor: '#334155' },
  pickerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
    marginBottom: 16,
  },
  pickerTitleDark: { color: '#F8FAFC' },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 64,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  pickerRowSel: { backgroundColor: '#EFF6FF' },
  pickerRowSelDark: { backgroundColor: '#1e3a5f' },
  pickerFlag: { fontSize: 28, lineHeight: 36 },
  pickerInfo: { flex: 1, gap: 2 },
  pickerCode: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  pickerCodeDark: { color: '#F8FAFC' },
  pickerName: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
});

// ── Confirm Modal Styles ───────────────────────────────────────────────────────

const confirmStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.55)',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  sheetDark: {
    backgroundColor: '#1E293B',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  titleDark: { color: '#F8FAFC' },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnDark: { backgroundColor: '#334155' },

  // Rows
  rows: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  rowLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  rowLabelDark: { color: '#9CA3AF' },
  rowValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  rowValueDark: { color: '#D1D5DB' },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  dividerDark: { backgroundColor: '#334155' },

  // You Receive row
  receiveRow: {
    height: 52,
    marginTop: 4,
  },
  receiveLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  receiveLabelDark: { color: '#F8FAFC' },
  receiveValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 18,
    lineHeight: 27,
    color: '#059669',
    letterSpacing: -0.3,
  },

  // Loading step
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
    paddingBottom: 24,
    gap: 14,
  },
  loadingText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#6B7280',
  },
  loadingTextDark: { color: '#9CA3AF' },

  // Success step
  successContent: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 12,
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  successTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#111827',
    textAlign: 'center',
  },
  successTitleDark: { color: '#F8FAFC' },
  successSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitleDark: { color: '#9CA3AF' },
  backBtn: {
    width: '100%' as const,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 15,
    lineHeight: 22,
    color: '#FFFFFF',
  },

  // Buttons
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnDark: { backgroundColor: '#334155' },
  cancelBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  cancelBtnTextDark: { color: '#D1D5DB' },
  confirmBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 15,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});
