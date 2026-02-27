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
import Svg, { Circle, Path, G } from 'react-native-svg';

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

const CheckCircleIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Circle cx="11" cy="11" r="11" fill="#2563EB" />
    <Path
      d="M6.5 11L9.5 14L15.5 8"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Types & data ───────────────────────────────────────────────────────────────

export interface Country {
  id: string;
  flag: string;
  name: string;
  currency: string;
  rate: string;
}

const COUNTRIES: Country[] = [
  { id: 'gb', flag: '🇬🇧', name: 'United Kingdom', currency: 'GBP', rate: '0.783' },
  { id: 'de', flag: '🇩🇪', name: 'Germany', currency: 'EUR', rate: '0.919' },
  { id: 'fr', flag: '🇫🇷', name: 'France', currency: 'EUR', rate: '0.919' },
  { id: 'ae', flag: '🇦🇪', name: 'United Arab Emirates', currency: 'AED', rate: '3.673' },
  { id: 'jp', flag: '🇯🇵', name: 'Japan', currency: 'JPY', rate: '149.5' },
  { id: 'ca', flag: '🇨🇦', name: 'Canada', currency: 'CAD', rate: '1.361' },
  { id: 'au', flag: '🇦🇺', name: 'Australia', currency: 'AUD', rate: '1.523' },
  { id: 'in', flag: '🇮🇳', name: 'India', currency: 'INR', rate: '83.10' },
  { id: 'pk', flag: '🇵🇰', name: 'Pakistan', currency: 'PKR', rate: '278.5' },
  { id: 'sa', flag: '🇸🇦', name: 'Saudi Arabia', currency: 'SAR', rate: '3.751' },
];

// ── CountryRow ─────────────────────────────────────────────────────────────────

interface CountryRowProps {
  country: Country;
  selected: boolean;
  isLast: boolean;
  onPress: () => void;
  isDark: boolean;
}

function CountryRow({ country, selected, isLast, onPress, isDark }: CountryRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Select ${country.name}`}
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
        {/* Flag container */}
        <View
          style={[
            styles.flagContainer,
            isDark ? styles.flagContainerDark : styles.flagContainerLight,
          ]}
        >
          <Text style={styles.flagText} allowFontScaling={false}>
            {country.flag}
          </Text>
        </View>

        {/* Name + rate */}
        <View className="flex-1 gap-[2px]">
          <Text
            className="font-inter-semibold text-[14px] leading-[21px] text-neutral-900 dark:text-neutral-50"
            allowFontScaling={false}
          >
            {country.name}
          </Text>
          <Text
            className="font-inter-medium text-[12px] leading-[18px] text-[#9CA3AF]"
            allowFontScaling={false}
          >
            {`1 USD = ${country.rate} ${country.currency}`}
          </Text>
        </View>

        {/* Currency pill / checkmark */}
        {selected ? (
          <CheckCircleIcon />
        ) : (
          <View style={styles.currencyPill}>
            <Text style={styles.currencyPillText} allowFontScaling={false}>
              {country.currency}
            </Text>
          </View>
        )}
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

// ── CountrySelectScreen ────────────────────────────────────────────────────────

export default function CountrySelectScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string>('gb');
  const [query, setQuery] = useState('');

  const filteredCountries = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedCountry = useMemo(
    () => COUNTRIES.find(c => c.id === selectedId),
    [selectedId],
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedCountry) return;
    navigation.navigate('RecipientDetails', { country: selectedCountry });
  }, [navigation, selectedCountry]);

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
          Select Country
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
            placeholder="Search country or currency…"
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
          POPULAR DESTINATIONS
        </Text>

        {/* Countries card */}
        <View
          className="mx-xl overflow-hidden"
          style={[
            styles.listCard,
            isDark ? styles.listCardDark : styles.listCardLight,
          ]}
        >
          {filteredCountries.length === 0 ? (
            <View className="py-xl px-base items-center">
              <Text
                className="font-inter-regular text-small text-neutral-400"
                allowFontScaling={false}
              >
                No countries found
              </Text>
            </View>
          ) : (
            filteredCountries.map((country, index) => (
              <CountryRow
                key={country.id}
                country={country}
                selected={selectedId === country.id}
                isLast={index === filteredCountries.length - 1}
                onPress={() => handleSelect(country.id)}
                isDark={isDark}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View className="px-xl pt-[12px] pb-[10px]" style={styles.footer}>
        {selectedCountry && (
          <View style={styles.selectionChipWrap}>
            <View style={styles.selectionChip}>
              <Text style={styles.chipFlag} allowFontScaling={false}>
                {selectedCountry.flag}
              </Text>
              <Text style={styles.selectionChipText} allowFontScaling={false}>
                {selectedCountry.name} · {selectedCountry.currency}
              </Text>
            </View>
          </View>
        )}
        <AppButton
          label={
            selectedCountry
              ? `Continue · ${selectedCountry.name}`
              : 'Continue'
          }
          onPress={handleContinue}
          disabled={!selectedCountry}
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
  flagContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderWidth: 1,
  },
  flagContainerLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  flagContainerDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  flagText: {
    fontSize: 28,
    lineHeight: 36,
  },
  currencyPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    flexShrink: 0,
  },
  currencyPillText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  // Footer
  footer: {
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  selectionChipWrap: {
    flexDirection: 'row',
  },
  selectionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
  },
  chipFlag: {
    fontSize: 18,
    lineHeight: 22,
  },
  selectionChipText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#2563EB',
  },
});
