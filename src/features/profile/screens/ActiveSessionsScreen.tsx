import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path, Rect, Line, Polyline, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@components/layout/ScreenWrapper';

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

const PhoneIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect
      x={5}
      y={2}
      width={14}
      height={20}
      rx={2}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 18H12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const MonitorIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={3}
      width={20}
      height={14}
      rx={2}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1={8}
      y1={21}
      x2={16}
      y2={21}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Line
      x1={12}
      y1={17}
      x2={12}
      y2={21}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const TabletIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect
      x={4}
      y={2}
      width={16}
      height={20}
      rx={2}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 18H12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#9CA3AF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={9} r={2.5} stroke="#9CA3AF" strokeWidth={2} />
  </Svg>
);

const LogOutIcon = ({ color = '#EF4444', size = 14 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="16 17 21 12 16 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1={21}
      y1={12}
      x2={9}
      y2={12}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

type DeviceType = 'phone' | 'monitor' | 'tablet';

interface Session {
  id: string;
  device: string;
  os: string;
  location: string;
  time: string;
  deviceType: DeviceType;
  isCurrent?: boolean;
}

const INITIAL_SESSIONS: Session[] = [
  {
    id: '1',
    device: 'iPhone 14 Pro',
    os: 'iOS 18.2',
    location: 'New York, NY',
    time: 'Now',
    deviceType: 'phone',
    isCurrent: true,
  },
  {
    id: '2',
    device: 'MacBook Pro 16"',
    os: 'macOS Sequoia',
    location: 'New York, NY',
    time: '2 hours ago',
    deviceType: 'monitor',
  },
  {
    id: '3',
    device: 'iPad Air',
    os: 'iPadOS 18.1',
    location: 'Brooklyn, NY',
    time: 'Yesterday',
    deviceType: 'tablet',
  },
  {
    id: '4',
    device: 'Chrome Browser',
    os: 'Windows 11',
    location: 'Newark, NJ',
    time: '3 days ago',
    deviceType: 'monitor',
  },
];

// ── Session card ──────────────────────────────────────────────────────────────

interface SessionCardProps {
  session: Session;
  onRevoke: (id: string) => void;
}

const DeviceIcon = ({ type, isCurrent }: { type: DeviceType; isCurrent?: boolean }) => {
  const color = isCurrent ? '#2563EB' : '#6B7280';
  switch (type) {
    case 'phone':   return <PhoneIcon color={color} />;
    case 'monitor': return <MonitorIcon color={color} />;
    case 'tablet':  return <TabletIcon color={color} />;
  }
};

const SessionCard = ({ session, onRevoke }: SessionCardProps) => (
  <View
    style={[
      styles.card,
      session.isCurrent && styles.cardCurrent,
    ]}
  >
    <View style={styles.cardRow}>
      {/* Device icon */}
      <View
        style={[
          styles.deviceIcon,
          { backgroundColor: session.isCurrent ? '#EFF6FF' : '#F3F4F6' },
        ]}
      >
        <DeviceIcon type={session.deviceType} isCurrent={session.isCurrent} />
      </View>

      {/* Info */}
      <View style={styles.sessionInfo}>
        {/* Name + Current badge */}
        <View style={styles.nameRow}>
          <Text style={styles.deviceName} allowFontScaling={false}>
            {session.device}
          </Text>
          {session.isCurrent && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText} allowFontScaling={false}>
                Current
              </Text>
            </View>
          )}
        </View>

        {/* OS */}
        <Text style={styles.osText} allowFontScaling={false}>
          {session.os}
        </Text>

        {/* Location + time */}
        <View style={styles.locationRow}>
          <MapPinIcon />
          <Text style={styles.locationText} allowFontScaling={false}>
            {session.location} · {session.time}
          </Text>
        </View>
      </View>

      {/* Revoke button (not for current device) */}
      {!session.isCurrent && (
        <Pressable
          style={styles.revokeBtn}
          onPress={() => onRevoke(session.id)}
          accessibilityLabel={`Log out ${session.device}`}
          accessibilityRole="button"
        >
          <LogOutIcon />
        </Pressable>
      )}
    </View>
  </View>
);

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ActiveSessionsScreen() {
  const navigation = useNavigation<any>();
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  const handleBack   = useCallback(() => navigation.goBack(), [navigation]);
  const handleRevoke = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  }, []);
  const handleLogOutAll = useCallback(() => {
    setSessions(prev => prev.filter(s => s.isCurrent));
  }, []);

  const otherCount = sessions.filter(s => !s.isCurrent).length;

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
          Active Sessions
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Subtitle ──────────────────────────────────────────────────── */}
        <Text style={styles.subtitle} allowFontScaling={false}>
          {sessions.length} active session{sessions.length !== 1 ? 's' : ''} detected
        </Text>

        {/* ── Session cards ─────────────────────────────────────────────── */}
        <View style={styles.list}>
          {sessions.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onRevoke={handleRevoke}
            />
          ))}
        </View>

        {/* ── Log Out All Other Devices ──────────────────────────────────── */}
        {otherCount > 0 && (
          <Pressable
            style={styles.logOutAllBtn}
            onPress={handleLogOutAll}
            accessibilityLabel="Log out all other devices"
            accessibilityRole="button"
          >
            <LogOutIcon color="#EF4444" size={16} />
            <Text style={styles.logOutAllText} allowFontScaling={false}>
              Log Out All Other Devices
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
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
  // Scroll
  scroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  // Subtitle
  subtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
    marginBottom: 16,
  },
  // List
  list: {
    gap: 12,
    marginBottom: 16,
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingTop: 17,
    paddingHorizontal: 17,
    paddingBottom: 17,
  },
  cardCurrent: {
    borderColor: '#BFDBFE',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 61.5,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sessionInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 21,
  },
  deviceName: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  currentBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentBadgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 10,
    lineHeight: 15,
    color: '#059669',
  },
  osText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
  },
  revokeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  // Log out all button
  logOutAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  logOutAllText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#EF4444',
  },
});
