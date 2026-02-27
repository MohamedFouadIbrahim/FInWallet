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
import Svg, { Path, G } from 'react-native-svg';

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

// ── Types & data ───────────────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  phone: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Alex Turner',
    phone: '+1 (555) 123-4567',
    initials: 'AT',
    avatarBg: 'rgba(37,99,235,0.09)',
    avatarColor: '#2563eb',
  },
  {
    id: '2',
    name: 'Jessica Lee',
    phone: '+1 (555) 234-5678',
    initials: 'JL',
    avatarBg: 'rgba(5,150,105,0.09)',
    avatarColor: '#059669',
  },
  {
    id: '3',
    name: 'Ryan Martinez',
    phone: '+1 (555) 345-6789',
    initials: 'RM',
    avatarBg: 'rgba(124,58,237,0.09)',
    avatarColor: '#7c3aed',
  },
  {
    id: '4',
    name: 'Sophie Wilson',
    phone: '+1 (555) 456-7890',
    initials: 'SW',
    avatarBg: 'rgba(239,68,68,0.09)',
    avatarColor: '#ef4444',
  },
  {
    id: '5',
    name: 'Jake Thompson',
    phone: '+1 (555) 567-8901',
    initials: 'JT',
    avatarBg: 'rgba(217,119,6,0.09)',
    avatarColor: '#d97706',
  },
];

// ── ContactRow ────────────────────────────────────────────────────────────────

interface RowProps {
  contact: Contact;
  selected: boolean;
  isLast: boolean;
  onPress: () => void;
  isDark: boolean;
}

function ContactRow({ contact, selected, isLast, onPress, isDark }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Select ${contact.name}`}
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
        {/* Avatar */}
        <View
          style={[
            styles.avatar,
            { backgroundColor: contact.avatarBg },
            selected && {
              borderWidth: 2,
              borderColor: `${contact.avatarColor}40`,
            },
          ]}
        >
          <Text
            style={[styles.avatarText, { color: contact.avatarColor }]}
            allowFontScaling={false}
          >
            {contact.initials}
          </Text>
        </View>

        {/* Name + phone */}
        <View className="flex-1 gap-[2px]">
          <Text
            className="font-inter-semibold text-[14px] leading-[21px] text-neutral-900 dark:text-neutral-50"
            allowFontScaling={false}
          >
            {contact.name}
          </Text>
          <Text
            className="font-inter-medium text-[12px] leading-[18px] text-[#9CA3AF]"
            allowFontScaling={false}
          >
            {contact.phone}
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

// ── SendToContactScreen ───────────────────────────────────────────────────────

export default function SendToContactScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string>('1');
  const [query, setQuery] = useState('');

  const filteredContacts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return CONTACTS;
    return CONTACTS.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedContact = useMemo(
    () => CONTACTS.find(c => c.id === selectedId),
    [selectedId],
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedContact) return;
    navigation.navigate('AmountEntry', {
      recipientId: selectedContact.id,
      recipientName: selectedContact.name,
      recipientSubtitle: selectedContact.phone,
      transferType: 'contact',
    });
  }, [navigation, selectedContact]);

  const continueLabel = selectedContact
    ? `Continue · ${selectedContact.name.split(' ')[0]}`
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
          Select Contact
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
            placeholder="Search contacts…"
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
          YOUR CONTACTS
        </Text>

        {/* Contacts card */}
        <View
          className="mx-xl rounded-2xl overflow-hidden"
          style={[
            styles.listCard,
            isDark ? styles.listCardDark : styles.listCardLight,
          ]}
        >
          {filteredContacts.length === 0 ? (
            <View className="py-xl px-base items-center">
              <Text
                className="font-inter-regular text-small text-neutral-400"
                allowFontScaling={false}
              >
                No contacts found
              </Text>
            </View>
          ) : (
            filteredContacts.map((contact, index) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                selected={selectedId === contact.id}
                isLast={index === filteredContacts.length - 1}
                onPress={() => handleSelect(contact.id)}
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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
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
