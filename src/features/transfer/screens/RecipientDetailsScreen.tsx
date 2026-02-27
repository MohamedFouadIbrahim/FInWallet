import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';

import { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import { useTheme } from '@theme/useTheme';

// ── Icons ─────────────────────────────────────────────────────────────────────

const InfoIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Circle cx="9" cy="9" r="8.25" stroke="#9CA3AF" strokeWidth={1.5} />
    <Path
      d="M9 8.25V12.75"
      stroke="#9CA3AF"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Circle cx="9" cy="5.75" r="0.75" fill="#9CA3AF" />
  </Svg>
);

// ── FormField ─────────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isValid: boolean;
  isDark: boolean;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  isValid,
  isDark,
  autoCapitalize = 'words',
}: FormFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      {/* Label row */}
      <View style={styles.labelRow}>
        <Text
          style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}
          allowFontScaling={false}
        >
          {label}
          <Text style={styles.asterisk}> *</Text>
        </Text>
        {isValid && (
          <Text style={styles.validLabel} allowFontScaling={false}>
            ✓ Valid
          </Text>
        )}
      </View>

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[
          styles.input,
          isDark ? styles.inputDark : styles.inputLight,
          isValid && (isDark ? styles.inputValidDark : styles.inputValid),
        ]}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        allowFontScaling={false}
        returnKeyType="next"
      />
    </View>
  );
}

// ── RecipientDetailsScreen ────────────────────────────────────────────────────

export default function RecipientDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<DashboardStackParamList, 'RecipientDetails'>>();
  const { isDark } = useTheme();
  const { country } = route.params;

  const [fullName, setFullName] = useState('');
  const [bankName, setBankName] = useState('');
  const [iban, setIban] = useState('');
  const [swift, setSwift] = useState('');

  const isFieldValid = (field: string) => field.trim().length > 0;
  const isAllValid =
    isFieldValid(fullName) &&
    isFieldValid(bankName) &&
    isFieldValid(iban) &&
    isFieldValid(swift);

  const handleContinue = useCallback(() => {
    navigation.navigate('AmountEntry', {
      recipientId: 'intl-1',
      recipientName: fullName.trim(),
      recipientSubtitle: `${bankName.trim()} · ${country.currency}`,
      transferType: 'international',
      exchangeRate: `1 USD = ${country.rate} ${country.currency}`,
      currency: country.currency,
    });
  }, [navigation, fullName, bankName, country.currency]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-md">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={styles.backBtn}
        >
          <ArrowLeftIcon size={20} color={isDark ? '#F9FAFB' : '#111827'} />
        </Pressable>
        <Text
          className="font-jakarta-bold text-h3 leading-[27px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          Recipient Details
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── Country chip ─────────────────────────────────────────── */}
            <View className="px-xl">
              <View style={styles.countryChip}>
                <Text style={styles.chipFlag} allowFontScaling={false}>
                  {country.flag}
                </Text>
                <Text style={styles.countryChipText} allowFontScaling={false}>
                  {country.name} · {country.currency}
                </Text>
              </View>
            </View>

            {/* ── Info banner ──────────────────────────────────────────── */}
            <View className="px-xl mt-[16px]">
              <View style={[styles.infoBanner, isDark && styles.infoBannerDark]}>
                <InfoIcon />
                <Text
                  style={[styles.infoText, isDark && styles.infoTextDark]}
                  allowFontScaling={false}
                >
                  Please double-check recipient details. International transfers
                  cannot be reversed once processed.
                </Text>
              </View>
            </View>

            {/* ── Form fields ──────────────────────────────────────────── */}
            <View className="px-xl mt-[24px]" style={styles.formGap}>
              <FormField
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Sarah Johnson"
                isValid={isFieldValid(fullName)}
                isDark={isDark}
              />
              <FormField
                label="Bank Name"
                value={bankName}
                onChangeText={setBankName}
                placeholder="e.g. Barclays Bank"
                isValid={isFieldValid(bankName)}
                isDark={isDark}
              />
              <FormField
                label="IBAN / Account Number"
                value={iban}
                onChangeText={setIban}
                placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
                isValid={isFieldValid(iban)}
                isDark={isDark}
                autoCapitalize="characters"
              />
              <FormField
                label="SWIFT / BIC Code"
                value={swift}
                onChangeText={setSwift}
                placeholder="e.g. BARCGB22"
                isValid={isFieldValid(swift)}
                isDark={isDark}
                autoCapitalize="characters"
              />
            </View>

            <View className="h-[24px]" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View className="px-xl pt-[17px] pb-[10px]" style={styles.footer}>
        <AppButton
          label="Continue"
          onPress={handleContinue}
          disabled={!isAllValid}
        />
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  // Country chip
  countryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignSelf: 'flex-start',
  },
  chipFlag: {
    fontSize: 18,
    lineHeight: 22,
  },
  countryChipText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#2563EB',
  },
  // Info banner
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  infoBannerDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  infoText: {
    flex: 1,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  infoTextDark: {
    color: '#9CA3AF',
  },
  // Form
  formGap: {
    gap: 18,
  },
  fieldWrap: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  fieldLabelDark: {
    color: '#D1D5DB',
  },
  asterisk: {
    color: '#EF4444',
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
  },
  validLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#059669',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  inputLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  inputDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    color: '#F9FAFB',
  },
  inputValid: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  inputValidDark: {
    borderColor: '#059669',
    backgroundColor: 'rgba(5,150,105,0.1)',
  },
  // Footer
  footer: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
});
