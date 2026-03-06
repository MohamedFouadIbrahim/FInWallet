import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Polyline } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';

// ── Icons ─────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronDownIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BellIcon = ({ color }: { color: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MailIcon = ({ color }: { color: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckIcon = ({ color }: { color: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Polyline points="20,6 9,17 4,12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: 'health',  label: 'Health',  color: '#06B6D4' },
  { id: 'housing', label: 'Housing', color: '#EF4444' },
  { id: 'other',   label: 'Other',   color: '#6B7280' },
];

type NotifMethod = 'push' | 'email' | 'both';

// ── AddBudgetScreen ───────────────────────────────────────────────────────────

export default function AddBudgetScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [alerts, setAlerts] = useState({ at50: false, at80: true, at100: true });
  const [notifMethod, setNotifMethod] = useState<NotifMethod>('push');

  const canSave = selectedCategory !== null && amount.trim().length > 0 && parseFloat(amount) > 0;

  const bg         = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg     = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#E5E7EB';
  const labelColor = isDark ? '#D1D5DB' : '#374151';
  const titleColor = isDark ? '#F9FAFB' : '#111827';
  const divColor   = isDark ? '#1F2937' : '#F3F4F6';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <BackIcon />
        </Pressable>
        <Text style={[styles.headerTitle, { color: titleColor }]} allowFontScaling={false}>
          New Budget
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ backgroundColor: bg, flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Category ──────────────────────────────────────────────────── */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: labelColor }]} allowFontScaling={false}>
              Category
            </Text>

            {/* Dropdown trigger */}
            <Pressable
              style={[
                styles.dropdownTrigger,
                {
                  backgroundColor: cardBg,
                  borderColor: dropdownOpen ? '#2563EB' : cardBorder,
                },
              ]}
              onPress={() => setDropdownOpen(o => !o)}
              accessibilityLabel="Select category"
            >
              {selectedCategory ? (
                <View style={styles.selectedRow}>
                  <View style={[styles.optionDot, { backgroundColor: selectedCategory.color }]} />
                  <Text style={[styles.dropdownSelectedText, { color: titleColor }]} allowFontScaling={false}>
                    {selectedCategory.label}
                  </Text>
                </View>
              ) : (
                <Text style={styles.dropdownPlaceholder} allowFontScaling={false}>
                  Select category
                </Text>
              )}
              <ChevronDownIcon color={dropdownOpen ? '#2563EB' : (isDark ? '#9CA3AF' : '#374151')} />
            </Pressable>

            {/* Dropdown list */}
            {dropdownOpen && (
              <View
                style={[
                  styles.dropdownList,
                  { backgroundColor: cardBg, borderColor: cardBorder },
                ]}
              >
                {CATEGORIES.map((cat, i) => (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.dropdownOption,
                      i < CATEGORIES.length - 1 && { borderBottomWidth: 1, borderBottomColor: divColor },
                      selectedCategory?.id === cat.id && { backgroundColor: isDark ? '#1E3A5F' : '#EFF6FF' },
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setDropdownOpen(false);
                    }}
                  >
                    <View style={[styles.optionDot, { backgroundColor: cat.color }]} />
                    <Text style={[styles.optionLabel, { color: labelColor }]} allowFontScaling={false}>
                      {cat.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* ── Monthly Limit ─────────────────────────────────────────────── */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: labelColor }]} allowFontScaling={false}>
              Monthly Limit
            </Text>
            <View style={[styles.amountField, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <Text style={[styles.currencySymbol, { color: isDark ? '#D1D5DB' : '#374151' }]} allowFontScaling={false}>
                $
              </Text>
              <TextInput
                style={[styles.amountInput, { color: titleColor }]}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={isDark ? '#4B5563' : 'rgba(17,24,39,0.4)'}
                keyboardType="decimal-pad"
                allowFontScaling={false}
                returnKeyType="done"
              />
            </View>
          </View>

          {/* ── Alert Thresholds ──────────────────────────────────────────── */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: labelColor }]} allowFontScaling={false}>
              Alert Thresholds
            </Text>
            <View style={[styles.toggleCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              {/* 50% */}
              <View style={[styles.toggleRow, { borderBottomWidth: 1, borderBottomColor: divColor }]}>
                <Text style={[styles.toggleLabel, { color: titleColor }]} allowFontScaling={false}>
                  50% of limit
                </Text>
                <Switch
                  value={alerts.at50}
                  onValueChange={v => setAlerts(a => ({ ...a, at50: v }))}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E7EB"
                  style={styles.toggle}
                />
              </View>
              {/* 80% */}
              <View style={[styles.toggleRow, { borderBottomWidth: 1, borderBottomColor: divColor }]}>
                <Text style={[styles.toggleLabel, { color: titleColor }]} allowFontScaling={false}>
                  80% of limit
                </Text>
                <Switch
                  value={alerts.at80}
                  onValueChange={v => setAlerts(a => ({ ...a, at80: v }))}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E7EB"
                  style={styles.toggle}
                />
              </View>
              {/* 100% */}
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: titleColor }]} allowFontScaling={false}>
                  100% of limit
                </Text>
                <Switch
                  value={alerts.at100}
                  onValueChange={v => setAlerts(a => ({ ...a, at100: v }))}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E7EB"
                  style={styles.toggle}
                />
              </View>
            </View>
          </View>

          {/* ── Notification Method ───────────────────────────────────────── */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: labelColor }]} allowFontScaling={false}>
              Notification Method
            </Text>
            <View style={styles.notifRow}>
              {(
                [
                  { id: 'push',  label: 'Push',  Icon: BellIcon },
                  { id: 'email', label: 'Email', Icon: MailIcon },
                  { id: 'both',  label: 'Both',  Icon: CheckIcon },
                ] as const
              ).map(opt => {
                const isActive = notifMethod === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    style={[
                      styles.notifBtn,
                      isActive
                        ? { backgroundColor: '#EFF6FF', borderColor: '#2563EB' }
                        : { backgroundColor: cardBg, borderColor: cardBorder },
                    ]}
                    onPress={() => setNotifMethod(opt.id)}
                  >
                    <opt.Icon color={isActive ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280')} />
                    <Text
                      style={[
                        styles.notifBtnText,
                        { color: isActive ? '#2563EB' : (isDark ? '#9CA3AF' : '#6B7280') },
                        isActive && styles.notifBtnTextActive,
                      ]}
                      allowFontScaling={false}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <View style={[styles.bottomBar, { borderTopColor: divColor, backgroundColor: isDark ? '#0F172A' : '#FFFFFF' }]}>
          <Pressable
            style={[
              styles.saveBtn,
              canSave ? styles.saveBtnActive : styles.saveBtnDisabled,
            ]}
            onPress={() => canSave && navigation.goBack()}
            disabled={!canSave}
            accessibilityLabel="Save budget"
          >
            <Text
              style={[styles.saveBtnText, canSave ? styles.saveBtnTextActive : styles.saveBtnTextDisabled]}
              allowFontScaling={false}
            >
              Save Budget
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 56,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 24,
  },
  // Field group
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
  },
  // Category dropdown
  dropdownTrigger: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownPlaceholder: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#9CA3AF',
  },
  dropdownSelectedText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  dropdownList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  dropdownOption: {
    height: 43.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 16,
  },
  optionDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    flexShrink: 0,
  },
  optionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  // Amount field
  amountField: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencySymbol: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
  },
  // Alert toggles
  toggleCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  toggleRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 10,
  },
  toggleLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
  },
  toggle: {
    // Remove implicit iOS margins so it sits flush with the row's alignItems: 'center'
    // marginVertical: 0,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    alignSelf:'center'
    // backgroundColor:"red"
  },
  // Notification method
  notifRow: {
    flexDirection: 'row',
    gap: 8,
  },
  notifBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  notifBtnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  notifBtnTextActive: {
    fontFamily: 'Inter-SemiBold',
  },
  // Bottom bar
  bottomBar: {
    paddingTop: 17,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  saveBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnActive: {
    backgroundColor: '#2563EB',
  },
  saveBtnDisabled: {
    backgroundColor: '#E5E7EB',
  },
  saveBtnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  saveBtnTextActive: {
    color: '#FFFFFF',
  },
  saveBtnTextDisabled: {
    color: '#9CA3AF',
  },
});
