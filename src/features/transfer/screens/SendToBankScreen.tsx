import React, { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import { useTheme } from '@theme/useTheme';

// ── Icons ─────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
    <G>
      <Path
        d="M7.79167 13.4583C10.9213 13.4583 13.4583 10.9213 13.4583 7.79167C13.4583 4.66205 10.9213 2.125 7.79167 2.125C4.66205 2.125 2.125 4.66205 2.125 7.79167C2.125 10.9213 4.66205 13.4583 7.79167 13.4583Z"
        stroke="#9CA3AF"
        strokeWidth={1.41667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.875 14.875L11.8292 11.8292"
        stroke="#9CA3AF"
        strokeWidth={1.41667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const BankSvgIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 22 22" fill="none">
    <Defs>
      <ClipPath id="bankIconClip">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#bankIconClip)">
      <Path
        d="M5.5 20.1667V3.66667C5.5 3.18044 5.69315 2.71412 6.03697 2.3703C6.38079 2.02649 6.8471 1.83333 7.33333 1.83333H14.6667C15.1529 1.83333 15.6192 2.02649 15.963 2.3703C16.3068 2.71412 16.5 3.18044 16.5 3.66667V20.1667H5.5Z"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 11H3.66667C3.18044 11 2.71412 11.1932 2.3703 11.537C2.02649 11.8808 1.83333 12.3471 1.83333 12.8333V18.3333C1.83333 18.8196 2.02649 19.2859 2.3703 19.6297C2.71412 19.9735 3.18044 20.1667 3.66667 20.1667H5.5"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 8.25H18.3333C18.8196 8.25 19.2859 8.44315 19.6297 8.78697C19.9735 9.13079 20.1667 9.5971 20.1667 10.0833V18.3333C20.1667 18.8196 19.9735 19.2859 19.6297 19.6297C19.2859 19.9735 18.8196 20.1667 18.3333 20.1667H16.5"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9.16667 5.5H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.16667 9.16667H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.16667 12.8333H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 12L10 8L6 4"
      stroke="#9CA3AF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M9 3.75V14.25" stroke="#6B7280" strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M3.75 9H14.25" stroke="#6B7280" strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

// ── Types & data ───────────────────────────────────────────────────────────────

interface BankAccount {
  id: string;
  name: string;
  subtitle: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  { id: '1', name: 'Chase Bank', subtitle: 'Checking · •••• 1234' },
  { id: '2', name: 'Wells Fargo', subtitle: 'Savings · •••• 5678' },
  { id: '3', name: 'Bank of America', subtitle: 'Checking · •••• 9012' },
];

// ── BankRow ───────────────────────────────────────────────────────────────────

interface BankRowProps {
  account: BankAccount;
  selected: boolean;
  isLast: boolean;
  onPress: () => void;
  isDark: boolean;
}

function BankRow({ account, selected, isLast, onPress, isDark }: BankRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Select ${account.name}`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.row,
          selected && styles.rowSelected,
          !selected && isDark && styles.rowDark,
        ]}
      >
        {/* Bank icon container */}
        <View
          style={[
            styles.iconContainer,
            selected && styles.iconContainerSelected,
          ]}
        >
          <BankSvgIcon color={selected ? '#2563EB' : isDark ? '#9CA3AF' : '#6B7280'} />
        </View>

        {/* Name + subtitle */}
        <View className="flex-1 gap-[2px]">
          <Text
            className="font-inter-semibold text-[14px] leading-[21px] text-neutral-900 dark:text-neutral-50"
            allowFontScaling={false}
          >
            {account.name}
          </Text>
          <Text
            className="font-inter-medium text-[12px] leading-[18px] text-[#9CA3AF]"
            allowFontScaling={false}
          >
            {account.subtitle}
          </Text>
        </View>

        {/* Selection dot */}
        {selected && <View style={styles.selectionDot} />}
      </View>

      {/* Divider */}
      {!isLast && (
        <View
          className="h-divider bg-neutral-100 dark:bg-neutral-700"
          style={{ marginLeft: 70 }}
        />
      )}
    </Pressable>
  );
}

// ── SendToBankScreen ──────────────────────────────────────────────────────────

export default function SendToBankScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string>('1');
  const [query, setQuery] = useState('');

  const filteredAccounts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return BANK_ACCOUNTS;
    return BANK_ACCOUNTS.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedAccount = useMemo(
    () => BANK_ACCOUNTS.find(a => a.id === selectedId),
    [selectedId],
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedAccount) return;
    navigation.navigate('AmountEntry', {
      recipientId: selectedAccount.id,
      recipientName: selectedAccount.name,
      recipientSubtitle: selectedAccount.subtitle,
      transferType: 'bank',
    });
  }, [navigation, selectedAccount]);

  const continueLabel = selectedAccount
    ? `Continue · ${selectedAccount.name.split(' ')[0]}`
    : 'Continue';

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
          Select Bank Account
        </Text>
      </View>

      {/* ── Search bar ───────────────────────────────────────────────── */}
      <View className="px-xl mt-[16px]">
        <View
          style={[
            styles.searchBar,
            isDark ? styles.searchBarDark : styles.searchBarLight,
          ]}
        >
          <SearchIcon />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search saved accounts…"
            placeholderTextColor="rgba(17,24,39,0.5)"
            style={[styles.searchInput, isDark && styles.searchInputDark]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            allowFontScaling={false}
          />
        </View>
      </View>

      {/* ── List ─────────────────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Section label */}
        <Text
          className="font-inter-semibold text-[11px] leading-[16.5px] tracking-[0.8px] text-neutral-400 dark:text-neutral-500 px-xl mb-[14px]"
          allowFontScaling={false}
        >
          SAVED ACCOUNTS
        </Text>

        {/* Add New Bank Account row */}
        <Pressable
          onPress={() => {}}
          accessibilityLabel="Add New Bank Account"
          className="mx-xl mb-[12px]"
        >
          <View
            style={[
              styles.addNewRow,
              isDark ? styles.addNewRowDark : styles.addNewRowLight,
            ]}
          >
            <View style={styles.addIconContainer}>
              <PlusIcon />
            </View>
            <Text
              className="flex-1 font-inter-medium text-[14px] leading-[21px] text-[#6B7280]"
              allowFontScaling={false}
            >
              Add New Bank Account
            </Text>
            <ChevronRightIcon />
          </View>
        </Pressable>

        {/* Accounts card */}
        <View
          className="mx-xl rounded-2xl overflow-hidden"
          style={[
            styles.listCard,
            isDark ? styles.listCardDark : styles.listCardLight,
          ]}
        >
          {filteredAccounts.length === 0 ? (
            <View className="py-xl px-base items-center">
              <Text
                className="font-inter-regular text-small text-neutral-400"
                allowFontScaling={false}
              >
                No accounts found
              </Text>
            </View>
          ) : (
            filteredAccounts.map((account, index) => (
              <BankRow
                key={account.id}
                account={account}
                selected={selectedId === account.id}
                isLast={index === filteredAccounts.length - 1}
                onPress={() => handleSelect(account.id)}
                isDark={isDark}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View className="px-xl pt-[17px] pb-[10px]" style={styles.footer}>
        <AppButton
          label={continueLabel}
          onPress={handleContinue}
          disabled={!selectedId}
        />
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15.5,
    gap: 10,
  },
  searchBarLight: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  searchBarDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter24pt-Regular',
    color: '#111827',
    padding: 0,
  },
  searchInputDark: {
    color: '#F9FAFB',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  addNewRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  addNewRowLight: {
    borderColor: '#D1D5DB',
    backgroundColor: '#FAFAFA',
  },
  addNewRowDark: {
    borderColor: '#475569',
    backgroundColor: '#1E293B',
  },
  addIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  listCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  listCardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  listCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  row: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  rowSelected: {
    backgroundColor: '#EFF6FF',
  },
  rowDark: {
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconContainerSelected: {
    borderWidth: 2,
    borderColor: 'rgba(37,99,235,0.25)',
    backgroundColor: '#F3F4F6',
  },
  selectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    flexShrink: 0,
  },
  footer: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
});
