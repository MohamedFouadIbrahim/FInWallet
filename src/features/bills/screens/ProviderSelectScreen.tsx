import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Svg, { Path, Polyline } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import type { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

type RouteProps = RouteProp<DashboardStackParamList, 'ProviderSelect'>;

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.75 15.75L12.525 12.525" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Polyline points="3,9 7,13 15,5" stroke="#2563EB" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Provider data per category ────────────────────────────────────────────────

interface Provider {
  id: string;
  initials: string;
  initialsColor: string;
  avatarBg: string;
  name: string;
  subtitle: string;
}

const PROVIDERS_BY_CATEGORY: Record<string, Provider[]> = {
  electricity: [
    { id: 'pg', initials: 'PG', initialsColor: '#F59E0B', avatarBg: 'rgba(245,158,11,0.08)', name: 'PowerGrid Energy', subtitle: 'Residential & commercial power' },
    { id: 'cl', initials: 'CL', initialsColor: '#2563EB', avatarBg: 'rgba(37,99,235,0.08)',   name: 'CityLight Co.',   subtitle: 'City electricity supplier'        },
    { id: 'ee', initials: 'EE', initialsColor: '#059669', avatarBg: 'rgba(5,150,105,0.08)',   name: 'EcoEnergy',       subtitle: 'Green & renewable energy'          },
  ],
  water: [
    { id: 'cw', initials: 'CW', initialsColor: '#3B82F6', avatarBg: 'rgba(59,130,246,0.08)',  name: 'CityWater Utilities', subtitle: 'Tap water & sewage'           },
    { id: 'aq', initials: 'AQ', initialsColor: '#0EA5E9', avatarBg: 'rgba(14,165,233,0.08)',  name: 'AquaSupply',          subtitle: 'Water supply & treatment'     },
  ],
  internet: [
    { id: 'fn', initials: 'FN', initialsColor: '#8B5CF6', avatarBg: 'rgba(139,92,246,0.09)', name: 'FiberNet Pro',   subtitle: 'Fiber optic internet'              },
    { id: 'sl', initials: 'SL', initialsColor: '#2563EB', avatarBg: 'rgba(37,99,235,0.08)',  name: 'SpeedLink',      subtitle: 'Cable broadband plans'             },
    { id: 'cx', initials: 'CX', initialsColor: '#DC2626', avatarBg: 'rgba(220,38,38,0.08)',  name: 'CableX',         subtitle: 'Unlimited home internet'           },
  ],
  tv: [
    { id: 'ms', initials: 'MS', initialsColor: '#EC4899', avatarBg: 'rgba(236,72,153,0.08)', name: 'MediaStream',    subtitle: 'Live TV & streaming'               },
    { id: 'cv', initials: 'CV', initialsColor: '#7C3AED', avatarBg: 'rgba(124,58,237,0.09)', name: 'CableVision',    subtitle: '200+ channels'                     },
    { id: 'dt', initials: 'DT', initialsColor: '#0EA5E9', avatarBg: 'rgba(14,165,233,0.08)', name: 'DigiTV',         subtitle: 'Digital satellite TV'              },
  ],
  mobile: [
    { id: 't1', initials: 'T1', initialsColor: '#2563EB', avatarBg: 'rgba(37,99,235,0.09)',  name: 'TelcoOne',       subtitle: 'Postpaid & prepaid plans'          },
    { id: 'mx', initials: 'MX', initialsColor: '#059669', avatarBg: 'rgba(5,150,105,0.08)',  name: 'MobileX',        subtitle: 'Best value mobile plans'           },
    { id: 'cp', initials: 'CP', initialsColor: '#F59E0B', avatarBg: 'rgba(245,158,11,0.08)', name: 'CellPro',        subtitle: 'Nationwide coverage'               },
  ],
  insurance: [
    { id: 'ss', initials: 'SS', initialsColor: '#2563EB', avatarBg: 'rgba(37,99,235,0.08)',  name: 'SafeShield',     subtitle: 'Life & health insurance'           },
    { id: 'ip', initials: 'IP', initialsColor: '#059669', avatarBg: 'rgba(5,150,105,0.08)',  name: 'InsurePlus',     subtitle: 'Vehicle & property cover'          },
  ],
  government: [
    { id: 'gs', initials: 'GS', initialsColor: '#DC2626', avatarBg: 'rgba(220,38,38,0.08)',  name: 'Gov Services',   subtitle: 'Fines, licenses & fees'            },
    { id: 'td', initials: 'TD', initialsColor: '#374151', avatarBg: 'rgba(55,65,81,0.08)',   name: 'Tax Department',  subtitle: 'Tax filing & payments'            },
  ],
  other: [
    { id: 'pa', initials: 'PA', initialsColor: '#6B7280', avatarBg: 'rgba(107,114,128,0.08)', name: 'Parking Authority', subtitle: 'Parking fines & permits'      },
    { id: 'ts', initials: 'TS', initialsColor: '#F59E0B', avatarBg: 'rgba(245,158,11,0.08)', name: 'Toll Services',     subtitle: 'Highway toll payments'         },
  ],
};

// ── ProviderRow ───────────────────────────────────────────────────────────────

interface ProviderRowProps {
  provider: Provider;
  selected: boolean;
  onPress: () => void;
}

const ProviderRow = React.memo(({ provider, selected, onPress }: ProviderRowProps) => (
  <Pressable
    style={[styles.providerCard, selected && styles.providerCardSelected]}
    onPress={onPress}
    accessibilityLabel={provider.name}
  >
    {/* Avatar */}
    <View style={[styles.avatar, { backgroundColor: provider.avatarBg }]}>
      <Text style={[styles.avatarText, { color: provider.initialsColor }]} allowFontScaling={false}>
        {provider.initials}
      </Text>
    </View>

    {/* Text */}
    <View className="flex-1 gap-[2px]">
      <Text
        className="font-inter-semibold text-[14px] leading-[21px] text-[#111827] dark:text-neutral-50"
        allowFontScaling={false}
        numberOfLines={1}
      >
        {provider.name}
      </Text>
      <Text
        className="font-inter-medium text-[12px] leading-[18px] text-[#6B7280] dark:text-neutral-400"
        allowFontScaling={false}
        numberOfLines={1}
      >
        {provider.subtitle}
      </Text>
    </View>

    {/* Check */}
    {selected && (
      <View style={styles.checkWrap}>
        <CheckIcon />
      </View>
    )}
  </Pressable>
));

// ── ProviderSelectScreen ───────────────────────────────────────────────────────

export default function ProviderSelectScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { categoryId, categoryName } = route.params;

  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const providers = PROVIDERS_BY_CATEGORY[categoryId] ?? [];

  const filtered = useMemo(
    () =>
      query.trim()
        ? providers.filter(
            p =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.subtitle.toLowerCase().includes(query.toLowerCase()),
          )
        : providers,
    [providers, query],
  );

  const canContinue = selectedId !== null;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-[16px]">
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <BackIcon />
        </Pressable>
        <View className="flex-1 gap-[2px]">
          <Text
            className="font-jakarta-bold text-[20px] text-[#111827] dark:text-neutral-50 leading-[30px]"
            allowFontScaling={false}
          >
            Select Provider
          </Text>
          <Text
            className="font-inter-regular text-[12px] text-[#6B7280] dark:text-neutral-400 leading-[18px]"
            allowFontScaling={false}
          >
            {categoryName}
          </Text>
        </View>
      </View>

      {/* ── Scrollable content ──────────────────────────────────────────── */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search */}
        <View className="flex-row items-center gap-[12px] bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[14px] px-[17px] h-[48px]">
          <SearchIcon />
          <TextInput
            className="flex-1 font-inter-regular text-[14px] text-[#111827] dark:text-neutral-50"
            placeholder="Search providers..."
            placeholderTextColor="rgba(17,24,39,0.5)"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            allowFontScaling={false}
          />
        </View>

        {/* Provider list */}
        <View style={styles.list}>
          {filtered.length > 0 ? (
            filtered.map(provider => (
              <ProviderRow
                key={provider.id}
                provider={provider}
                selected={selectedId === provider.id}
                onPress={() => setSelectedId(prev => prev === provider.id ? null : provider.id)}
              />
            ))
          ) : (
            <View className="items-center py-[40px]">
              <Text className="font-inter-regular text-[14px] text-[#9CA3AF] dark:text-neutral-500" allowFontScaling={false}>
                No providers found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.continueButton, canContinue && styles.continueButtonActive]}
          onPress={() => {}}
          disabled={!canContinue}
          accessibilityLabel="Continue"
        >
          <Text
            style={[styles.continueText, canContinue && styles.continueTextActive]}
            allowFontScaling={false}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  list: {
    marginTop: 16,
    gap: 10,
  },

  // Provider card
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    height: 78,
    paddingHorizontal: 17,
  },
  providerCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 21,
  },
  checkWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom bar
  bottomBar: {
    paddingTop: 17,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  continueButtonActive: {
    backgroundColor: '#2563EB',
  },
  continueText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#9CA3AF',
  },
  continueTextActive: {
    color: '#FFFFFF',
  },
});
