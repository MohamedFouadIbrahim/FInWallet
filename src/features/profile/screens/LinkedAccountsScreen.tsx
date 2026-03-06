import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path, Polyline } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';

// ── Icons ─────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#111827"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrashIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="3 6 5 6 21 6"
      stroke="#EF4444"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 6L18.1248 19.1308C18.0539 20.1487 17.2081 20.9333 16.1875 20.9333H7.8125C6.79189 20.9333 5.94612 20.1487 5.87523 19.1308L5 6"
      stroke="#EF4444"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 6V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6"
      stroke="#EF4444"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke="#FFFFFF"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

interface BankAccount {
  id: string;
  initials: string;
  initialsColor: string;
  avatarBg: string;
  name: string;
  masked: string;
  type: 'Checking' | 'Savings';
  isDefault?: boolean;
}

const INITIAL_ACCOUNTS: BankAccount[] = [
  {
    id: '1',
    initials: 'CB',
    initialsColor: '#2563EB',
    avatarBg: '#EFF6FF',
    name: 'Chase Bank',
    masked: '****4821',
    type: 'Checking',
    isDefault: true,
  },
  {
    id: '2',
    initials: 'BA',
    initialsColor: '#EF4444',
    avatarBg: '#FEF2F2',
    name: 'Bank of America',
    masked: '****7392',
    type: 'Savings',
  },
  {
    id: '3',
    initials: 'WF',
    initialsColor: '#D97706',
    avatarBg: '#FFFBEB',
    name: 'Wells Fargo',
    masked: '****5610',
    type: 'Checking',
  },
];

// ── Bank card ─────────────────────────────────────────────────────────────────

interface BankCardProps {
  account: BankAccount;
  onRemove: (id: string) => void;
}

const BankCard = ({ account, onRemove }: BankCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <View style={[styles.avatar, { backgroundColor: account.avatarBg }]}>
        <Text
          style={[styles.avatarText, { color: account.initialsColor }]}
          allowFontScaling={false}
        >
          {account.initials}
        </Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.bankName} allowFontScaling={false}>
          {account.name}
        </Text>
        <Text style={styles.bankSub} allowFontScaling={false}>
          {account.masked} · {account.type}
        </Text>
      </View>

      {account.isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultBadgeText} allowFontScaling={false}>
            Default
          </Text>
        </View>
      )}
    </View>

    <View style={styles.actionRow}>
      <Pressable style={styles.viewDetailsBtn} accessibilityRole="button">
        <Text style={styles.viewDetailsText} allowFontScaling={false}>
          View Details
        </Text>
      </Pressable>

      <Pressable
        style={styles.trashBtn}
        onPress={() => onRemove(account.id)}
        accessibilityLabel={`Remove ${account.name}`}
        accessibilityRole="button"
      >
        <TrashIcon />
      </Pressable>
    </View>
  </View>
);

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LinkedAccountsScreen() {
  const navigation = useNavigation<any>();
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);

  const handleBack   = useCallback(() => navigation.goBack(), [navigation]);
  const handleRemove = useCallback((id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  }, []);
  const handleLink   = useCallback(() => {}, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={handleBack}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Linked Bank Accounts
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Account cards ─────────────────────────────────────────────── */}
        <View style={styles.list}>
          {accounts.map(account => (
            <BankCard
              key={account.id}
              account={account}
              onRemove={handleRemove}
            />
          ))}
        </View>

        {/* ── Link CTA ──────────────────────────────────────────────────── */}
        <AppButton
          label="Link New Bank Account"
          onPress={handleLink}
          leftIcon={<PlusIcon />}
          style={styles.linkBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    height: 56,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  list: {
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingTop: 17,
    paddingHorizontal: 17,
    paddingBottom: 1,
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  bankName: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  bankSub: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  defaultBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexShrink: 0,
  },
  defaultBadgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 10,
    lineHeight: 15,
    color: '#2563EB',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  viewDetailsBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  trashBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  linkBtn: {
    borderRadius: 14,
    height: 52,
  },
});
