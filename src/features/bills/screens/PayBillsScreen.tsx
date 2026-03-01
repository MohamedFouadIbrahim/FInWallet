import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CATEGORY_ITEM_WIDTH = (SCREEN_WIDTH - 48 - 12) / 2;

// ── Icons ─────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = ({ color = '#9CA3AF' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.75 15.75L12.525 12.525" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path d="M5.25 3.5L8.75 7L5.25 10.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BookmarkIcon = () => (
  <Svg width={8} height={8} viewBox="0 0 8 8" fill="none">
    <Path d="M6.33333 7L4 5.66667L1.66667 7V1.66667C1.66667 1.48986 1.7369 1.32029 1.86193 1.19526C1.98695 1.07024 2.15652 1 2.33333 1H5.66667C5.84348 1 6.01305 1.07024 6.13807 1.19526C6.2631 1.32029 6.33333 1.48986 6.33333 1.66667V7Z" stroke="#2563EB" strokeWidth={0.666667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Category Icons ─────────────────────────────────────────────────────────────

const ElectricityIcon = ({ color = '#F59E0B' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M3.66667 12.8333C3.4932 12.8339 3.32313 12.7853 3.17621 12.6931C3.02929 12.6008 2.91155 12.4688 2.83667 12.3124C2.76179 12.1559 2.73285 11.9814 2.75321 11.8091C2.77356 11.6368 2.84238 11.4739 2.95167 11.3392L12.0267 1.98917C12.0947 1.91059 12.1875 1.85749 12.2897 1.83859C12.392 1.81968 12.4976 1.83609 12.5893 1.88513C12.6809 1.93416 12.7532 2.01291 12.7942 2.10843C12.8352 2.20396 12.8426 2.31059 12.815 2.41083L11.055 7.92917C11.0031 8.06806 10.9857 8.21748 11.0042 8.36459C11.0227 8.5117 11.0767 8.65212 11.1614 8.77381C11.2461 8.89549 11.3591 8.99481 11.4907 9.06323C11.6222 9.13166 11.7684 9.16715 11.9167 9.16667H18.3333C18.5068 9.16608 18.6769 9.21472 18.8238 9.30694C18.9707 9.39916 19.0885 9.53117 19.1633 9.68765C19.2382 9.84412 19.2671 10.0186 19.2468 10.1909C19.2264 10.3632 19.1576 10.5261 19.0483 10.6608L9.97333 20.0108C9.90526 20.0894 9.8125 20.1425 9.71027 20.1614C9.60804 20.1803 9.50242 20.1639 9.41075 20.1149C9.31908 20.0658 9.2468 19.9871 9.20578 19.8916C9.16475 19.796 9.15743 19.6894 9.185 19.5892L10.945 14.0708C10.9969 13.9319 11.0143 13.7825 10.9958 13.6354C10.9773 13.4883 10.9233 13.3479 10.8386 13.2262C10.7539 13.1045 10.6409 13.0052 10.5093 12.9368C10.3778 12.8683 10.2316 12.8329 10.0833 12.8333H3.66667Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const WaterIcon = ({ color = '#3B82F6' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M6.41667 14.9417C8.43333 14.9417 10.0833 13.2642 10.0833 11.2292C10.0833 10.1658 9.56083 9.1575 8.51583 8.305C7.47083 7.4525 6.6825 6.1875 6.41667 4.85833C6.15083 6.1875 5.37167 7.46167 4.3175 8.305C3.26333 9.14833 2.75 10.175 2.75 11.2292C2.75 13.2642 4.4 14.9417 6.41667 14.9417Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.5133 6.05C12.1438 5.0427 12.5907 3.93162 12.8333 2.76833C13.2917 5.06 14.6667 7.26 16.5 8.72667C18.3333 10.1933 19.25 11.935 19.25 13.7683C19.2552 15.0354 18.8841 16.2756 18.1837 17.3315C17.4833 18.3874 16.4852 19.2116 15.3158 19.6996C14.1464 20.1876 12.8585 20.3174 11.6152 20.0725C10.372 19.8276 9.22949 19.2191 8.3325 18.3242" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InternetIcon = ({ color = '#8B5CF6' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M11 18.3333H11.01" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M1.83333 8.085C4.35427 5.83021 7.61781 4.58364 11 4.58364C14.3822 4.58364 17.6457 5.83021 20.1667 8.085" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4.58333 11.7874C6.29685 10.1078 8.6006 9.16706 11 9.16706C13.3994 9.16706 15.7032 10.1078 17.4167 11.7874" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7.79167 15.0599C8.64842 14.2201 9.8003 13.7497 11 13.7497C12.1997 13.7497 13.3516 14.2201 14.2083 15.0599" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TvIcon = ({ color = '#EC4899' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Defs>
      <ClipPath id="clip_tv">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip_tv)">
      <Path d="M18.3333 6.41667H3.66667C2.65414 6.41667 1.83333 7.23748 1.83333 8.25V18.3333C1.83333 19.3459 2.65414 20.1667 3.66667 20.1667H18.3333C19.3459 20.1667 20.1667 19.3459 20.1667 18.3333V8.25C20.1667 7.23748 19.3459 6.41667 18.3333 6.41667Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.5833 1.83333L11 6.41667L6.41667 1.83333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const MobileIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M15.5833 1.83333H6.41667C5.40414 1.83333 4.58333 2.65414 4.58333 3.66667V18.3333C4.58333 19.3459 5.40414 20.1667 6.41667 20.1667H15.5833C16.5959 20.1667 17.4167 19.3459 17.4167 18.3333V3.66667C17.4167 2.65414 16.5959 1.83333 15.5833 1.83333Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11 16.5H11.01" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InsuranceIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M18.3333 11.9167C18.3333 16.5 15.125 18.7917 11.3117 20.1208C11.112 20.1885 10.8951 20.1853 10.6975 20.1117C6.875 18.7917 3.66667 16.5 3.66667 11.9167V5.5C3.66667 5.25688 3.76324 5.02373 3.93515 4.85182C4.10706 4.67991 4.34022 4.58333 4.58333 4.58333C6.41667 4.58333 8.70833 3.48333 10.3033 2.09C10.4975 1.92408 10.7446 1.83292 11 1.83292C11.2554 1.83292 11.5025 1.92408 11.6967 2.09C13.3008 3.4925 15.5833 4.58333 17.4167 4.58333C17.6598 4.58333 17.8929 4.67991 18.0648 4.85182C18.2368 5.02373 18.3333 5.25688 18.3333 5.5V11.9167Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GovernmentIcon = ({ color = '#DC2626' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M2.75 20.1667H19.25" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5.5 16.5V10.0833" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9.16667 16.5V10.0833" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12.8333 16.5V10.0833" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16.5 16.5V10.0833" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11 1.83333L18.3333 6.41667H3.66667L11 1.83333Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const OtherIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path d="M11 11.9167C11.5063 11.9167 11.9167 11.5063 11.9167 11C11.9167 10.4937 11.5063 10.0833 11 10.0833C10.4937 10.0833 10.0833 10.4937 10.0833 11C10.0833 11.5063 10.4937 11.9167 11 11.9167Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17.4167 11.9167C17.9229 11.9167 18.3333 11.5063 18.3333 11C18.3333 10.4937 17.9229 10.0833 17.4167 10.0833C16.9104 10.0833 16.5 10.4937 16.5 11C16.5 11.5063 16.9104 11.9167 17.4167 11.9167Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4.58333 11.9167C5.08959 11.9167 5.5 11.5063 5.5 11C5.5 10.4937 5.08959 10.0833 4.58333 10.0833C4.07707 10.0833 3.66667 10.4937 3.66667 11C3.66667 11.5063 4.07707 11.9167 4.58333 11.9167Z" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  iconBg: string;
  icon: React.ReactNode;
}

interface SavedBiller {
  id: string;
  initials: string;
  name: string;
  initialsColor: string;
  initials_bg: string;
  hasAuto: boolean;
}

const CATEGORIES: Category[] = [
  { id: 'electricity', label: 'Electricity', iconBg: '#FFFBEB', icon: <ElectricityIcon /> },
  { id: 'water',       label: 'Water',       iconBg: '#EFF6FF', icon: <WaterIcon /> },
  { id: 'internet',    label: 'Internet',    iconBg: '#F5F3FF', icon: <InternetIcon /> },
  { id: 'tv',          label: 'TV',          iconBg: '#FDF2F8', icon: <TvIcon /> },
  { id: 'mobile',      label: 'Mobile',      iconBg: '#F0FDF4', icon: <MobileIcon /> },
  { id: 'insurance',   label: 'Insurance',   iconBg: '#EFF6FF', icon: <InsuranceIcon /> },
  { id: 'government',  label: 'Government',  iconBg: '#FEF2F2', icon: <GovernmentIcon /> },
  { id: 'other',       label: 'Other',       iconBg: '#F3F4F6', icon: <OtherIcon /> },
];

const SAVED_BILLERS: SavedBiller[] = [
  {
    id: '1',
    initials: 'PG',
    name: 'PowerGrid Energy',
    initialsColor: '#F59E0B',
    initials_bg: 'rgba(245,158,11,0.09)',
    hasAuto: true,
  },
  {
    id: '2',
    initials: 'FN',
    name: 'FiberNet Pro',
    initialsColor: '#8B5CF6',
    initials_bg: 'rgba(139,92,246,0.09)',
    hasAuto: true,
  },
  {
    id: '3',
    initials: 'CW',
    name: 'CityWater Utilities',
    initialsColor: '#3B82F6',
    initials_bg: 'rgba(59,130,246,0.09)',
    hasAuto: false,
  },
  {
    id: '4',
    initials: 'T1',
    name: 'TelcoOne',
    initialsColor: '#2563EB',
    initials_bg: 'rgba(37,99,235,0.09)',
    hasAuto: true,
  },
];

// ── CategoryCard ──────────────────────────────────────────────────────────────

interface CategoryCardProps {
  item: Category;
  onPress: () => void;
}

const CategoryCard = React.memo(({ item, onPress }: CategoryCardProps) => (
  <Pressable
    style={[styles.categoryCard, { width: CATEGORY_ITEM_WIDTH }]}
    onPress={onPress}
    accessibilityLabel={item.label}
  >
    <View style={[styles.categoryIconWrap, { backgroundColor: item.iconBg }]}>
      {item.icon}
    </View>
    <Text className="font-inter-semibold text-[13px] leading-[19.5px] text-[#374151] dark:text-neutral-300 text-center" allowFontScaling={false}>
      {item.label}
    </Text>
  </Pressable>
));

// ── BillerCard ────────────────────────────────────────────────────────────────

interface BillerCardProps {
  biller: SavedBiller;
}

const BillerCard = React.memo(({ biller }: BillerCardProps) => (
  <Pressable
    style={styles.billerCard}
    accessibilityLabel={biller.name}
  >
    {/* Initials avatar */}
    <View style={[styles.billerAvatar, { backgroundColor: biller.initials_bg }]}>
      <Text
        style={[styles.billerInitials, { color: biller.initialsColor }]}
        allowFontScaling={false}
      >
        {biller.initials}
      </Text>
    </View>

    {/* Name */}
    <Text
      className="font-inter-medium text-[11px] leading-[16.5px] text-[#374151] dark:text-neutral-300 text-center"
      style={{ width: 70 }}
      numberOfLines={1}
      allowFontScaling={false}
    >
      {biller.name}
    </Text>

    {/* Auto badge */}
    {biller.hasAuto && (
      <View className="flex-row items-center gap-[2px]">
        <BookmarkIcon />
        <Text className="font-inter-medium text-[9px] leading-[13.5px] text-info-600" allowFontScaling={false}>
          Auto
        </Text>
      </View>
    )}
  </Pressable>
));

// ── PayBillsScreen ─────────────────────────────────────────────────────────────

export default function PayBillsScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (item: Category) => {
    navigation.navigate('ProviderSelect', {
      categoryId: item.id,
      categoryName: item.label,
    });
  };

  const filteredCategories = searchQuery
    ? CATEGORIES.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : CATEGORIES;

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
        <Text
          className="flex-1 font-jakarta-bold text-[20px] text-[#111827] dark:text-neutral-50 leading-[30px]"
          allowFontScaling={false}
        >
          Pay Bills
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Search bar ─────────────────────────────────────────────────── */}
        <View className="flex-row items-center gap-[12px] bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[14px] px-[17px] h-[48px]">
          <SearchIcon />
          <TextInput
            className="flex-1 font-inter-regular text-[14px] text-[#111827] dark:text-neutral-50"
            placeholder="Search bills..."
            placeholderTextColor="rgba(17,24,39,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            allowFontScaling={false}
          />
        </View>

        {/* ── Categories ─────────────────────────────────────────────────── */}
        <View className="mt-[20px] gap-[12px]">
          <Text
            className="font-inter-medium text-[13px] text-[#6B7280] dark:text-neutral-400 tracking-[0.5px] uppercase"
            allowFontScaling={false}
          >
            Categories
          </Text>

          {/* 2-column grid */}
          <View style={styles.categoryGrid}>
            {filteredCategories.map(item => (
              <CategoryCard
                key={item.id}
                item={item}
                onPress={() => handleCategoryPress(item)}
              />
            ))}
          </View>
        </View>

        {/* ── Saved Billers ──────────────────────────────────────────────── */}
        <View className="mt-[20px] gap-[12px]">
          {/* Section header */}
          <View className="flex-row items-center justify-between">
            <Text
              className="font-inter-medium text-[13px] text-[#6B7280] dark:text-neutral-400 tracking-[0.5px] uppercase"
              allowFontScaling={false}
            >
              Saved Billers
            </Text>
            <Pressable
              className="flex-row items-center gap-[4px] active:opacity-pressed"
              accessibilityLabel="View all billers"
            >
              <Text className="font-inter-semibold text-[13px] text-info-600" allowFontScaling={false}>
                View All
              </Text>
              <ChevronRightIcon />
            </Pressable>
          </View>

          {/* Horizontal scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.billersScroll}
          >
            {SAVED_BILLERS.map(biller => (
              <BillerCard key={biller.id} biller={biller} />
            ))}
          </ScrollView>
        </View>

        <View className="h-xl" />
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 10,
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Saved Billers
  billersScroll: {
    gap: 12,
  },
  billerCard: {
    width: 88,
    height: 112,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 1,
    gap: 8,
  },
  billerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  billerInitials: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    lineHeight: 18,
  },
});
