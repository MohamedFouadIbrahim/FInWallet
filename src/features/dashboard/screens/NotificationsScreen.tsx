import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ─────────────────────────────────────────────────────────────────────

const ArrowLeftIcon = ({ color = '#111827' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M12.5 15L7.5 10L12.5 5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ color = '#9CA3AF' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M15.833 13.333V8.333C15.833 5.112 13.443 2.5 10 2.5C6.557 2.5 4.167 5.112 4.167 8.333V13.333L2.5 15H17.5L15.833 13.333Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.667 17.5C11.667 18.42 10.92 19.167 10 19.167C9.08 19.167 8.333 18.42 8.333 17.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={7} stroke={color} strokeWidth={1.5} />
    <Path
      d="M6 9L8 11L12 7"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldAlertIcon = ({ color = '#D97706' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 2L3 4.5V9C3 12.5 5.7 15.74 9 16.5C12.3 15.74 15 12.5 15 9V4.5L9 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 7V9.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={9} cy={12} r={0.75} fill={color} />
  </Svg>
);

const CashbackIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Rect x={2} y={4} width={14} height={10} rx={2} stroke={color} strokeWidth={1.5} />
    <Path d="M2 7.5H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={12} cy={11} r={1} fill={color} />
  </Svg>
);

const ShieldCheckIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 2L3 4.5V9C3 12.5 5.7 15.74 9 16.5C12.3 15.74 15 12.5 15 9V4.5L9 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 9L8 10.5L11.5 7"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowDownCircleIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={7} stroke={color} strokeWidth={1.5} />
    <Path
      d="M9 6V12M6.5 9.5L9 12L11.5 9.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  isUnread: boolean;
  iconBg: string;
  cardBg: string;
  borderColor: string;
  icon: React.ReactNode;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TODAY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Transaction Successful',
    body: 'You sent $50.00 to Sarah Chen. Funds typically arrive instantly.',
    time: '2m ago',
    isUnread: true,
    iconBg: '#D1FAE5',
    cardBg: '#F0FDF4',
    borderColor: 'rgba(5,150,105,0.13)',
    icon: <CheckCircleIcon />,
  },
  {
    id: '2',
    title: 'Security Alert',
    body: 'New login detected from Chrome on MacBook. Not you? Secure your account.',
    time: '15m ago',
    isUnread: true,
    iconBg: '#FEF3C7',
    cardBg: '#FFFBEB',
    borderColor: 'rgba(217,119,6,0.13)',
    icon: <ShieldAlertIcon />,
  },
  {
    id: '3',
    title: 'Cashback Earned',
    body: "You earned $2.50 cashback on your last purchase. Keep shopping!",
    time: '1h ago',
    isUnread: false,
    iconBg: '#DBEAFE',
    cardBg: '#F9FAFB',
    borderColor: '#F3F4F6',
    icon: <CashbackIcon />,
  },
];

const YESTERDAY_NOTIFICATIONS: Notification[] = [
  {
    id: '4',
    title: 'KYC Approved',
    body: 'Your identity verification was approved. Full features are now unlocked.',
    time: '1d ago',
    isUnread: false,
    iconBg: '#D1FAE5',
    cardBg: '#F9FAFB',
    borderColor: '#F3F4F6',
    icon: <ShieldCheckIcon />,
  },
  {
    id: '5',
    title: 'Payment Received',
    body: 'John Doe sent you $500.00. Your balance has been updated.',
    time: '1d ago',
    isUnread: false,
    iconBg: '#DBEAFE',
    cardBg: '#F9FAFB',
    borderColor: '#F3F4F6',
    icon: <ArrowDownCircleIcon />,
  },
];

// ── NotificationCard ──────────────────────────────────────────────────────────

interface NotificationCardProps {
  item: Notification;
}

function NotificationCard({ item }: NotificationCardProps) {
  return (
    <View
      className="rounded-[14px] border overflow-hidden"
      style={{
        backgroundColor: item.cardBg,
        borderColor: item.borderColor,
      }}
    >
      <View className="flex-row gap-md pt-[15px] pb-[15px] px-[15px]">
        <View
          className="w-[40px] h-[40px] rounded-md items-center justify-center shrink-0"
          style={{ backgroundColor: item.iconBg }}
        >
          {item.icon}
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-[6px]">
            <Text
              className="font-inter-semibold text-[13px] leading-[16.9px] text-[#111827] dark:text-neutral-50 flex-1 pr-sm"
              allowFontScaling={false}
            >
              {item.title}
            </Text>
            {item.isUnread && (
              <View className="w-[8px] h-[8px] rounded-full bg-info-600 mt-[4px] shrink-0" />
            )}
          </View>
          <Text
            className="font-inter-regular text-small leading-[18px] text-[#6B7280] dark:text-neutral-400"
            allowFontScaling={false}
          >
            {item.body}
          </Text>
          <Text
            className="font-inter-regular text-[11px] leading-[16.5px] text-[#9CA3AF] dark:text-neutral-500 mt-[6px]"
            allowFontScaling={false}
          >
            {item.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── NotificationsScreen ───────────────────────────────────────────────────────

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(2);

  const handleMarkAllRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return (
    <ScreenWrapper>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View
        className="flex-row items-center gap-md px-xl border-b border-[#F3F4F6] dark:border-neutral-800"
        style={styles.header}
      >
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-neutral-100 dark:bg-neutral-800 items-center justify-center shrink-0"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon />
        </Pressable>

        <View className="flex-1 flex-row items-center gap-sm">
          <Text
            className="font-jakarta-bold text-[18px] leading-[27px] text-[#111827] dark:text-neutral-50"
            allowFontScaling={false}
          >
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View className="bg-error-500 rounded-full h-[20px] min-w-[23px] px-[6px] items-center justify-center">
              <Text
                className="font-inter-bold text-[11px] leading-[16.5px] text-white"
                allowFontScaling={false}
              >
                {unreadCount}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={handleMarkAllRead}
          accessibilityLabel="Mark all notifications as read"
          style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            className="font-inter-semibold text-[13px] leading-[19.5px] text-info-600"
            allowFontScaling={false}
          >
            Mark all read
          </Text>
        </Pressable>
      </View>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Today section */}
        <Text
          className="font-inter-semibold text-[11px] text-[#9CA3AF] dark:text-neutral-500 tracking-[0.77px] uppercase px-xl"
          style={{ marginTop: 20, marginBottom: 12 }}
          allowFontScaling={false}
        >
          Today
        </Text>
        <View className="px-xl gap-[10px]">
          {TODAY_NOTIFICATIONS.map(item => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </View>

        {/* Yesterday section */}
        <Text
          className="font-inter-semibold text-[11px] text-[#9CA3AF] dark:text-neutral-500 tracking-[0.77px] uppercase px-xl"
          style={{ marginTop: 24, marginBottom: 12 }}
          allowFontScaling={false}
        >
          Yesterday
        </Text>
        <View className="px-xl gap-[10px]">
          {YESTERDAY_NOTIFICATIONS.map(item => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </View>

        {/* Caught up footer */}
        <View className="items-center gap-[10px] pt-[20px] pb-[24px] mt-sm">
          <View className="w-[44px] h-[44px] rounded-[14px] bg-neutral-100 dark:bg-neutral-800 items-center justify-center">
            <BellIcon />
          </View>
          <Text
            className="font-inter-regular text-[13px] leading-[19.5px] text-[#9CA3AF] dark:text-neutral-500"
            allowFontScaling={false}
          >
            {"You're all caught up!"}
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
  },
});
