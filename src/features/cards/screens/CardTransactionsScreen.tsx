import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.75 15.75L12.525 12.525" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilterIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M15.75 3H10.5" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7.5 3H2.25" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.75 9H9" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 9H2.25" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.75 15H12" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 15H2.25" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10.5 1.5V4.5" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 7.5V10.5" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 13.5V16.5" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Category Icons ─────────────────────────────────────────────────────────────

const CoffeeIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M7.5 1.5V3M10.5 1.5V3M4.5 1.5V3" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V12.75C12.75 13.5456 12.4339 14.3087 11.8713 14.8713C11.3087 15.4339 10.5456 15.75 9.75 15.75H5.25C4.45435 15.75 3.69129 15.4339 3.12868 14.8713C2.56607 14.3087 2.25 13.5456 2.25 12.75V6.75C2.25 6.55109 2.32902 6.36032 2.46967 6.21967C2.61032 6.07902 2.80109 6 3 6H13.5C14.2956 6 15.0587 6.31607 15.6213 6.87868C16.1839 7.44129 16.5 8.20435 16.5 9C16.5 9.79565 16.1839 10.5587 15.6213 11.1213C15.0587 11.6839 14.2956 12 13.5 12H12.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GasIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M2.25 16.5H11.25" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 6.75H10.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10.5 16.5V3C10.5 2.60218 10.342 2.22064 10.0607 1.93934C9.77936 1.65804 9.39782 1.5 9 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V16.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10.5 9.75H12C12.3978 9.75 12.7794 9.90804 13.0607 10.1893C13.342 10.4706 13.5 10.8522 13.5 11.25V12.75C13.5 13.1478 13.658 13.5294 13.9393 13.8107C14.2206 14.092 14.6022 14.25 15 14.25C15.3978 14.25 15.7794 14.092 16.0607 13.8107C16.342 13.5294 16.5 13.1478 16.5 12.75V7.3725C16.5 7.17457 16.4611 6.97856 16.3852 6.79577C16.3092 6.61299 16.1979 6.44704 16.0575 6.3075L13.5 3.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const RefundIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M12.75 5.25L5.25 12.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12.75 12.75H5.25V5.25" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlayIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Rect x={2} y={2} width={14} height={14} rx={3} stroke={color} strokeWidth={1.5} />
    <Path d="M7 5.5L13 9L7 12.5V5.5Z" fill={color} />
  </Svg>
);

const FoodDeliveryIcon = ({ color = '#F59E0B' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M6 2.25V6.75C6 7.5 6.75 8.25 7.5 8.25V15.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3.75 2.25V6.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3.75 6.75H6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.25 2.25C11.25 2.25 13.5 3.75 13.5 6.375C13.5 8.25 12 8.625 12 8.625V15.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MusicNoteIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M6.75 15V4.5L14.25 2.25V12.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.75 7.5L14.25 5.25" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx={5.25} cy={15} r={1.5} fill={color} />
    <Circle cx={12.75} cy={12.75} r={1.5} fill={color} />
  </Svg>
);

const ShoppingBagIcon = ({ color = '#F59E0B' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M3 3.75H15L13.5 12.75C13.4 13.5 12.75 14.25 12 14.25H6C5.25 14.25 4.6 13.5 4.5 12.75L3 3.75Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.75 3.75C6.75 2.5 7.75 1.5 9 1.5C10.25 1.5 11.25 2.5 11.25 3.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const PhoneIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Rect x={3} y={1.5} width={12} height={15} rx={2} stroke={color} strokeWidth={1.5} />
    <Path d="M7.5 12.75H10.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M6 4.5H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const PlaneIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M15.75 9L2.25 5.25L4.5 9L2.25 12.75L15.75 9Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4.5 9H9.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const CartIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M1.5 1.5H3.75L5.25 10.5H13.5L15 4.5H4.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx={6} cy={13.5} r={1.125} fill={color} />
    <Circle cx={12.75} cy={13.5} r={1.125} fill={color} />
  </Svg>
);

const StreamingIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={7.5} stroke={color} strokeWidth={1.5} />
    <Path d="M5.25 11.25C7.25 10.25 10.75 10.25 12.75 11.25" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M5.25 8.625C7.75 7.25 10.25 7.25 12.75 8.625" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M6.375 6C7.875 5.25 10.125 5.25 11.625 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  name: string;
  category: string;
  time: string;
  amount: string;
  isPositive: boolean;
  iconBg: string;
  icon: React.ReactElement;
}

interface TransactionGroup {
  date: string;
  items: Transaction[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const TRANSACTION_GROUPS: TransactionGroup[] = [
  {
    date: 'Today',
    items: [
      {
        id: 't1',
        name: 'Starbucks Reserve',
        category: 'Food & Drink',
        time: '9:41 AM',
        amount: '-$6.50',
        isPositive: false,
        iconBg: '#F5F3FF',
        icon: <CoffeeIcon />,
      },
      {
        id: 't2',
        name: 'Shell Gas Station',
        category: 'Transport',
        time: '8:15 AM',
        amount: '-$48.20',
        isPositive: false,
        iconBg: '#F0FDF4',
        icon: <GasIcon />,
      },
      {
        id: 't3',
        name: 'Refund — Nike',
        category: 'Shopping',
        time: '7:30 AM',
        amount: '+$89.99',
        isPositive: true,
        iconBg: '#EFF6FF',
        icon: <RefundIcon />,
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        id: 't4',
        name: 'Netflix',
        category: 'Entertainment',
        time: '11:00 PM',
        amount: '-$15.99',
        isPositive: false,
        iconBg: '#FEF2F2',
        icon: <PlayIcon />,
      },
      {
        id: 't5',
        name: 'Uber Eats',
        category: 'Food & Drink',
        time: '7:45 PM',
        amount: '-$32.40',
        isPositive: false,
        iconBg: '#FFFBEB',
        icon: <FoodDeliveryIcon />,
      },
      {
        id: 't6',
        name: 'Apple Music',
        category: 'Subscription',
        time: '12:00 PM',
        amount: '-$10.99',
        isPositive: false,
        iconBg: '#FEF2F2',
        icon: <MusicNoteIcon />,
      },
      {
        id: 't7',
        name: 'Amazon',
        category: 'Shopping',
        time: '10:30 AM',
        amount: '-$129.99',
        isPositive: false,
        iconBg: '#FFFBEB',
        icon: <ShoppingBagIcon />,
      },
    ],
  },
  {
    date: 'February',
    items: [
      {
        id: 't8',
        name: 'AT&T Wireless',
        category: 'Utilities',
        time: 'Feb 25',
        amount: '-$85.00',
        isPositive: false,
        iconBg: '#EFF6FF',
        icon: <PhoneIcon />,
      },
      {
        id: 't9',
        name: 'Delta Airlines',
        category: 'Travel',
        time: 'Feb 23',
        amount: '-$342.00',
        isPositive: false,
        iconBg: '#F5F3FF',
        icon: <PlaneIcon />,
      },
      {
        id: 't10',
        name: 'Whole Foods',
        category: 'Grocery',
        time: 'Feb 22',
        amount: '-$67.85',
        isPositive: false,
        iconBg: '#F0FDF4',
        icon: <CartIcon />,
      },
      {
        id: 't11',
        name: 'Spotify',
        category: 'Subscription',
        time: 'Feb 20',
        amount: '-$9.99',
        isPositive: false,
        iconBg: '#F0FDF4',
        icon: <StreamingIcon />,
      },
      {
        id: 't12',
        name: 'Shell Gas Station',
        category: 'Transport',
        time: 'Feb 18',
        amount: '-$52.10',
        isPositive: false,
        iconBg: '#F0FDF4',
        icon: <GasIcon />,
      },
    ],
  },
];

// ── TransactionRow ─────────────────────────────────────────────────────────────

function TransactionRow({ item, isLast }: { item: Transaction; isLast: boolean }) {
  return (
    <View>
      <Pressable
        className="flex-row items-center px-[16px] h-[68px] gap-[12px] active:bg-neutral-50 dark:active:bg-neutral-700"
        accessibilityLabel={item.name}
      >
        <View
          className="w-[42px] h-[42px] rounded-[13px] items-center justify-center shrink-0"
          style={{ backgroundColor: item.iconBg }}
        >
          {item.icon}
        </View>

        <View className="flex-1 gap-[2px]">
          <Text
            className="font-inter-semibold text-[14px] leading-[21px] text-[#111827] dark:text-neutral-50"
            allowFontScaling={false}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            className="font-inter-regular text-[12px] leading-[18px] text-[#9CA3AF] dark:text-neutral-500"
            allowFontScaling={false}
          >
            {`${item.category} · ${item.time}`}
          </Text>
        </View>

        <Text
          className="font-jakarta-bold text-[14px] leading-[21px] shrink-0"
          style={{ color: item.isPositive ? '#059669' : '#111827' }}
          allowFontScaling={false}
        >
          {item.amount}
        </Text>
      </Pressable>

      {!isLast && (
        <View className="h-px bg-[#F3F4F6] dark:bg-neutral-700 ml-[70px]" />
      )}
    </View>
  );
}

// ── CardTransactionsScreen ─────────────────────────────────────────────────────

export default function CardTransactionsScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return TRANSACTION_GROUPS;
    const q = search.toLowerCase();
    return TRANSACTION_GROUPS.map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      ),
    })).filter(group => group.items.length > 0);
  }, [search]);

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
          className="flex-1 font-jakarta-bold text-[18px] text-[#111827] dark:text-neutral-50 leading-[27px]"
          allowFontScaling={false}
        >
          Transactions
        </Text>
        {/* Spacer to balance header */}
        <View style={{ width: 40 }} />
      </View>

      {/* ── Card Selector ────────────────────────────────────────────────── */}
      <View className="px-xl mt-[8px]">
        <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[12px] h-[42px] flex-row items-center px-[15px] gap-[10px]">
          <View style={styles.miniCard} />
          <Text
            className="font-inter-semibold text-[13px] leading-[19.5px] text-[#111827] dark:text-neutral-50"
            allowFontScaling={false}
          >
            {'•••• 8294'}
          </Text>
          <Text
            className="font-inter-regular text-[12px] leading-[18px] text-[#9CA3AF] capitalize"
            allowFontScaling={false}
          >
            debit
          </Text>
          <View className="flex-1" />
          <Text
            className="font-inter-medium text-[12px] leading-[18px] text-[#6B7280] dark:text-neutral-400"
            allowFontScaling={false}
          >
            Spent: $801.01
          </Text>
        </View>
      </View>

      {/* ── Search Bar ───────────────────────────────────────────────────── */}
      <View className="px-xl mt-[10px]">
        <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[12px] h-[44px] flex-row items-center px-[15px] gap-[10px]">
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor="rgba(17,24,39,0.4)"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            allowFontScaling={false}
          />
          <Pressable
            accessibilityLabel="Filter transactions"
            style={{ minWidth: 36, minHeight: 36, alignItems: 'center', justifyContent: 'center' }}
          >
            <FilterIcon />
          </Pressable>
        </View>
      </View>

      {/* ── Transaction List ─────────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      >
        {filteredGroups.length === 0 ? (
          <View className="items-center pt-[60px]">
            <Text
              className="font-inter-regular text-[14px] text-[#9CA3AF]"
              allowFontScaling={false}
            >
              No transactions found
            </Text>
          </View>
        ) : (
          filteredGroups.map(group => (
            <View key={group.date} style={styles.groupWrap}>
              <Text
                className="font-inter-semibold text-[11px] text-[#9CA3AF] dark:text-neutral-500 uppercase tracking-[0.5px] mb-[8px]"
                allowFontScaling={false}
              >
                {group.date}
              </Text>

              <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[16px] overflow-hidden">
                {group.items.map((item, i) => (
                  <TransactionRow
                    key={item.id}
                    item={item}
                    isLast={i === group.items.length - 1}
                  />
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  groupWrap: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  miniCard: {
    width: 32,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
});
