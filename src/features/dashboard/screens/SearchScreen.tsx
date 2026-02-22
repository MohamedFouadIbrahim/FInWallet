import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';

// ── Icons ─────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="#9CA3AF"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 14L11.1 11.1"
      stroke="#9CA3AF"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

const XIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
      stroke="#6B7280"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

const ClockIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Circle cx={8} cy={8} r={6} stroke="#9CA3AF" strokeWidth={1.3} />
    <Path
      d="M8 5.33334V8L9.66667 9.66667"
      stroke="#9CA3AF"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
      stroke="#9CA3AF"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SeeAllArrowIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
      stroke="#2563EB"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Quick link icons
const ElectricityIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 11L10 2L8 9H13L7 18L9 11H3Z"
      stroke="#D97706"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BankTransferIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M6 8L3 11L6 14M14 8L17 11L14 14M9 11H11"
      stroke="#2563EB"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M3 11H17" stroke="#2563EB" strokeWidth={1.5} strokeLinecap="round" strokeOpacity={0.3} />
  </Svg>
);

const AirtimeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 15C4 15 5 12 7 10C9 8 10 6 10 4"
      stroke="#059669"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M6 17C6 17 8 13 11 11C14 9 15 7 16 4"
      stroke="#059669"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Circle cx={4.5} cy={15.5} r={1.5} fill="#059669" />
    <Circle cx={7} cy={17.5} r={1.5} fill="#059669" />
  </Svg>
);

const SplitBillIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx={7} cy={7} r={3} stroke="#7C3AED" strokeWidth={1.4} />
    <Circle cx={13} cy={7} r={3} stroke="#7C3AED" strokeWidth={1.4} />
    <Path
      d="M3 16C3 13.7909 4.79086 12 7 12H13C15.2091 12 17 13.7909 17 16"
      stroke="#7C3AED"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

// Empty state icons
const EmptyTransactionIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Path
      d="M4 4H10V10H4V4ZM18 4H24V10H18V4ZM4 18H10V24H4V18Z"
      stroke="#D1D5DB"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 18H24M24 18V24M24 18L18 24"
      stroke="#D1D5DB"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M14 4V8M4 14H8M14 14H18M14 20V24M20 14H24" stroke="#D1D5DB" strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const EmptyContactsIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Circle cx={11} cy={10} r={4} stroke="#D1D5DB" strokeWidth={1.5} />
    <Path
      d="M4 22C4 18.6863 7.13401 16 11 16H15"
      stroke="#D1D5DB"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Circle cx={19} cy={16} r={3} stroke="#D1D5DB" strokeWidth={1.5} />
    <Path
      d="M14 24C14 21.7909 16.2386 20 19 20C21.7614 20 24 21.7909 24 24"
      stroke="#D1D5DB"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuickLink {
  label: string;
  iconBg: string;
  icon: React.ReactNode;
}

interface Contact {
  initials: string;
  name: string;
  avatarBg: string;
  textColor: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS: QuickLink[] = [
  {
    label: 'Pay Electricity',
    iconBg: '#FFFBEB',
    icon: <ElectricityIcon />,
  },
  {
    label: 'Bank Transfer',
    iconBg: '#EFF6FF',
    icon: <BankTransferIcon />,
  },
  {
    label: 'Buy Airtime',
    iconBg: '#ECFDF5',
    icon: <AirtimeIcon />,
  },
  {
    label: 'Split Bill',
    iconBg: '#F5F3FF',
    icon: <SplitBillIcon />,
  },
];

const RECENT_CONTACTS: Contact[] = [
  { initials: 'SC', name: 'Sarah', avatarBg: '#F5F3FF', textColor: '#7C3AED' },
  { initials: 'JD', name: 'John', avatarBg: '#ECFDF5', textColor: '#059669' },
  { initials: 'AM', name: 'Alice', avatarBg: '#EFF6FF', textColor: '#2563EB' },
  { initials: 'MB', name: 'Mike', avatarBg: '#FFFBEB', textColor: '#D97706' },
  { initials: 'EW', name: 'Emma', avatarBg: '#FEF2F2', textColor: '#EF4444' },
];

const RECENT_SEARCHES = ['Starbucks', 'Transfer to John', 'Bill payment March'];

// ── SearchScreen ──────────────────────────────────────────────────────────────

export default function SearchScreen() {
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');

  const hasQuery = query.trim().length > 0;

  return (
    <View style={styles.root}>
      {/* ── Search bar ───────────────────────────────────────────────── */}
      <View style={styles.searchBar}>
        <View style={styles.inputWrap}>
          <SearchIcon />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search transactions, contacts..."
            placeholderTextColor="rgba(17,24,39,0.5)"
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
            allowFontScaling={false}
          />
          {hasQuery && (
            <Pressable
              onPress={() => setQuery('')}
              style={styles.clearBtn}
              accessibilityLabel="Clear search"
            >
              <XIcon />
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.cancelBtn}
          accessibilityLabel="Cancel search"
        >
          <Text style={styles.cancelText} allowFontScaling={false}>
            Cancel
          </Text>
        </Pressable>
      </View>

      {/* ── Content ──────────────────────────────────────────────────── */}
      {hasQuery ? (
        // ── Results / empty state ───────────────────────────────────
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Transactions section */}
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            TRANSACTIONS
          </Text>
          <View style={styles.emptyCard}>
            <EmptyTransactionIcon />
            <Text style={styles.emptyText} allowFontScaling={false}>
              {`No transactions found for "${query}"`}
            </Text>
          </View>

          {/* Contacts section */}
          <Text style={[styles.sectionLabel, { marginTop: 24 }]} allowFontScaling={false}>
            CONTACTS
          </Text>
          <View style={styles.emptyCard}>
            <EmptyContactsIcon />
            <Text style={styles.emptyText} allowFontScaling={false}>
              {`No contacts found for "${query}"`}
            </Text>
          </View>
        </ScrollView>
      ) : (
        // ── Initial state ────────────────────────────────────────────
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.initialContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Quick links */}
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            QUICK LINKS
          </Text>
          <View style={styles.quickLinksGrid}>
            {QUICK_LINKS.map(link => (
              <Pressable
                key={link.label}
                style={styles.quickLinkItem}
                className="active:opacity-pressed"
                accessibilityLabel={link.label}
              >
                <View
                  style={[
                    styles.quickLinkIcon,
                    { backgroundColor: link.iconBg },
                  ]}
                >
                  {link.icon}
                </View>
                <Text style={styles.quickLinkLabel} allowFontScaling={false}>
                  {link.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Recent contacts */}
          <View style={styles.contactsHeader}>
            <Text style={styles.sectionLabel} allowFontScaling={false}>
              RECENT CONTACTS
            </Text>
            <Pressable
              className="active:opacity-pressed"
              accessibilityLabel="See all contacts"
            >
              <View style={styles.seeAllRow}>
                <Text style={styles.seeAllText} allowFontScaling={false}>
                  See All
                </Text>
                <SeeAllArrowIcon />
              </View>
            </Pressable>
          </View>
          <View style={styles.contactsRow}>
            {RECENT_CONTACTS.map(contact => (
              <Pressable
                key={contact.initials}
                style={styles.contactItem}
                className="active:opacity-pressed"
                accessibilityLabel={contact.name}
              >
                <View
                  style={[
                    styles.contactAvatar,
                    { backgroundColor: contact.avatarBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.contactInitials,
                      { color: contact.textColor },
                    ]}
                    allowFontScaling={false}
                  >
                    {contact.initials}
                  </Text>
                </View>
                <Text style={styles.contactName} allowFontScaling={false}>
                  {contact.name}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Recent searches */}
          <Text style={[styles.sectionLabel, { marginTop: 24 }]} allowFontScaling={false}>
            RECENT SEARCHES
          </Text>
          <View style={styles.recentList}>
            {RECENT_SEARCHES.map((term, i) => (
              <Pressable
                key={i}
                style={styles.recentItem}
                onPress={() => setQuery(term)}
                className="active:opacity-pressed"
                accessibilityLabel={`Search ${term}`}
              >
                <ClockIcon />
                <Text style={styles.recentText} allowFontScaling={false}>
                  {term}
                </Text>
                <ArrowRightIcon />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Search bar row
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 24,
    paddingRight: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  inputWrap: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    color: '#111827',
    lineHeight: 21,
    padding: 0,
    margin: 0,
  },
  clearBtn: {
    padding: 2,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    color: '#2563EB',
    lineHeight: 21,
  },
  scrollArea: {
    flex: 1,
  },
  // Initial state
  initialContent: {
    padding: 24,
    paddingTop: 20,
  },
  // Results state
  resultsContent: {
    padding: 24,
    paddingTop: 20,
  },
  // Section label
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 0.77,
    textTransform: 'uppercase',
    lineHeight: 16.5,
    marginBottom: 12,
  },
  // Quick links 2x2 grid
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  quickLinkItem: {
    width: '47%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 16,
  },
  quickLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickLinkLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    color: '#111827',
    lineHeight: 19.5,
    flex: 1,
  },
  // Recent contacts
  contactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    color: '#2563EB',
    lineHeight: 19.5,
  },
  contactsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  contactItem: {
    alignItems: 'center',
    gap: 6,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitials: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
  },
  contactName: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
  // Recent searches
  recentList: {
    gap: 0,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  recentText: {
    flex: 1,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
  },
  // Empty state
  emptyCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  emptyText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 19.5,
    textAlign: 'center',
  },
});
