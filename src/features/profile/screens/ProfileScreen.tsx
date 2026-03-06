import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ─────────────────────────────────────────────────────────────────────

const ShieldIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M13.3333 8.66667C13.3333 12 11 13.6667 8.22667 14.6333C8.08144 14.6825 7.92369 14.6802 7.78 14.6267C5 13.6667 2.66667 12 2.66667 8.66667V4C2.66667 3.82319 2.7369 3.65362 2.86193 3.5286C2.98695 3.40357 3.15652 3.33333 3.33333 3.33333C4.66667 3.33333 6.33333 2.53333 7.49333 1.52C7.63457 1.39933 7.81424 1.33303 8 1.33303C8.18576 1.33303 8.36543 1.39933 8.50667 1.52C9.67333 2.54 11.3333 3.33333 12.6667 3.33333C12.8435 3.33333 13.013 3.40357 13.1381 3.5286C13.2631 3.65362 13.3333 3.82319 13.3333 4V8.66667Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 8L7.33333 9.33333L10 6.66667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PersonIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M12.6667 14V12.6667C12.6667 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 10 10H6C5.29276 10 4.61448 10.281 4.11438 10.781C3.61428 11.2811 3.33333 11.9594 3.33333 12.6667V14"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 7.33333C9.47276 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47276 2 8 2C6.52724 2 5.33333 3.19391 5.33333 4.66667C5.33333 6.13943 6.52724 7.33333 8 7.33333Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ color = '#D1D5DB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 12L10 8L6 4"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CardIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Rect
      x={1.33333}
      y={3.33333}
      width={13.3333}
      height={9.33333}
      rx={1.33333}
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.33333 6.66667H14.6667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MonitorIcon = ({ color = '#D97706' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Rect
      x={1.33333}
      y={2}
      width={13.3333}
      height={9.33333}
      rx={1.33333}
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.33333 14H10.6667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 11.3333V14"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GlobeIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Defs>
      <ClipPath id="globe-clip">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#globe-clip)">
      <Path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 1.33333C6.28816 3.13077 5.33333 5.51783 5.33333 8C5.33333 10.4822 6.28816 12.8692 8 14.6667C9.71184 12.8692 10.6667 10.4822 10.6667 8C10.6667 5.51783 9.71184 3.13077 8 1.33333Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.33333 8H14.6667"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const SunIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 1.33333V2.66667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 13.3333V14.6667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.28667 3.28667L4.22667 4.22667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.7733 11.7733L12.7133 12.7133"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.33333 8H2.66667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3333 8H14.6667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.28667 12.7133L4.22667 11.7733"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.7733 4.22667L12.7133 3.28667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Defs>
      <ClipPath id="help-clip">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#help-clip)">
      <Path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.06 6C6.21674 5.55445 6.5261 5.17874 6.9333 4.93942C7.3405 4.70011 7.81926 4.61263 8.28478 4.69247C8.7503 4.77232 9.17254 5.01435 9.47672 5.37569C9.78089 5.73702 9.94737 6.19435 9.94667 6.66667C9.94667 8 7.94667 8.66667 7.94667 8.66667"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 11.3333H8.00667"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const MessageIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M14 10C14 10.3536 13.8595 10.6928 13.6095 10.9428C13.3594 11.1929 13.0203 11.3333 12.6667 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SignOutIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12.75L15.75 9L12 5.25"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.75 9H6.75"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

type IconKey =
  | 'person' | 'card' | 'globe' | 'sun'
  | 'shield' | 'monitor'
  | 'help'   | 'message';

interface MenuItem {
  label: string;
  icon: IconKey;
  iconBg: string;
}

interface Section {
  title: string;
  items: MenuItem[];
}

const SECTIONS: Section[] = [
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Edit Profile',         icon: 'person', iconBg: '#EFF6FF' },
      { label: 'Linked Bank Accounts', icon: 'card',   iconBg: '#F5F3FF' },
    ],
  },
  {
    title: 'SECURITY',
    items: [
      { label: 'Security Center',  icon: 'shield',  iconBg: '#F0FDF4' },
      { label: 'Active Sessions',  icon: 'monitor', iconBg: '#FFFBEB' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { label: 'Language', icon: 'globe', iconBg: '#F0FDF4' },
      { label: 'Theme',    icon: 'sun',   iconBg: '#F5F3FF' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { label: 'Help Center',     icon: 'help',    iconBg: '#EFF6FF' },
      { label: 'Contact Support', icon: 'message', iconBg: '#EFF6FF' },
    ],
  },
];

// ── Icon renderer ─────────────────────────────────────────────────────────────

const MenuIcon = ({ icon }: { icon: IconKey }) => {
  switch (icon) {
    case 'person':  return <PersonIcon />;
    case 'card':    return <CardIcon />;
    case 'globe':   return <GlobeIcon />;
    case 'sun':     return <SunIcon />;
    case 'shield':  return <ShieldIcon />;
    case 'monitor': return <MonitorIcon />;
    case 'help':    return <HelpIcon />;
    case 'message': return <MessageIcon />;
  }
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface MenuItemRowProps {
  item: MenuItem;
  isLast: boolean;
  onPress: () => void;
}

const MenuItemRow = ({ item, isLast, onPress }: MenuItemRowProps) => (
  <>
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
      accessibilityLabel={item.label}
      accessibilityRole="button"
    >
      <View style={[styles.menuIconWrap, { backgroundColor: item.iconBg }]}>
        <MenuIcon icon={item.icon} />
      </View>
      <Text style={styles.menuLabel} allowFontScaling={false}>
        {item.label}
      </Text>
      <ChevronRightIcon />
    </Pressable>
    {!isLast && <View style={styles.menuDivider} />}
  </>
);

// ── Main screen ───────────────────────────────────────────────────────────────

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const handleEdit     = useCallback(() => navigation.navigate('EditProfile'), [navigation]);
  const handleSignOut  = useCallback(() => {}, []);
  const handleMenuItem = useCallback((label: string) => {
    if (label === 'Edit Profile') {
      navigation.navigate('EditProfile');
    } else if (label === 'Linked Bank Accounts') {
      navigation.navigate('LinkedAccounts');
    } else if (label === 'Security Center') {
      navigation.navigate('SecurityCenter');
    } else if (label === 'Active Sessions') {
      navigation.navigate('ActiveSessions');
    } else if (label === 'Theme') {
      navigation.navigate('Settings');
    }
  }, [navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Title ─────────────────────────────────────────────────────────── */}
        <Text style={styles.pageTitle} allowFontScaling={false}>
          Profile
        </Text>

        {/* ── Profile card ──────────────────────────────────────────────────── */}
        <View style={styles.profileCard}>
          {/* Avatar row */}
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText} allowFontScaling={false}>
                AC
              </Text>
            </View>

            <View style={styles.avatarInfo}>
              <Text style={styles.userName} allowFontScaling={false}>
                Alex Carter
              </Text>
              <Text style={styles.userEmail} allowFontScaling={false}>
                alex.carter@email.com
              </Text>
              <Text style={styles.userPhone} allowFontScaling={false}>
                +1 (555) 123-4567
              </Text>
            </View>

            <Pressable
              style={styles.editBtn}
              onPress={handleEdit}
              accessibilityLabel="Edit profile"
            >
              <Text style={styles.editBtnText} allowFontScaling={false}>
                Edit
              </Text>
            </Pressable>
          </View>

          {/* KYC banner */}
          <View style={styles.kycBanner}>
            <ShieldIcon color="#059669" />
            <View style={styles.kycInfo}>
              <Text style={styles.kycTitle} allowFontScaling={false}>
                {'KYC Verified · Intermediate Tier'}
              </Text>
              <Text style={styles.kycLimit} allowFontScaling={false}>
                $5,000/day · $20,000/month limit
              </Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText} allowFontScaling={false}>
                Active
              </Text>
            </View>
          </View>
        </View>

        {/* ── Menu sections ─────────────────────────────────────────────────── */}
        {SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionLabel} allowFontScaling={false}>
              {section.title}
            </Text>
            <View style={styles.menuCard}>
              {section.items.map((item, idx) => (
                <MenuItemRow
                  key={item.label}
                  item={item}
                  isLast={idx === section.items.length - 1}
                  onPress={() => handleMenuItem(item.label)}
                />
              ))}
            </View>
          </View>
        ))}

        {/* ── Sign out ──────────────────────────────────────────────────────── */}
        <View style={styles.signOutSection}>
          <Pressable
            style={styles.signOutBtn}
            onPress={handleSignOut}
            accessibilityLabel="Sign out"
          >
            <SignOutIcon />
            <Text style={styles.signOutText} allowFontScaling={false}>
              Sign Out
            </Text>
          </Pressable>

          <Text style={styles.versionText} allowFontScaling={false}>
            FinWallet v3.4.1 · Build 2026.02
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Page title
  pageTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 16,
  },
  // Profile card
  profileCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 21,
    paddingTop: 21,
    paddingBottom: 20,
    gap: 16,
    shadowColor: '#94A3B8',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  avatarInfo: {
    flex: 1,
    gap: 1,
  },
  userName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
  },
  userEmail: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  userPhone: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  editBtn: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  editBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },
  // KYC banner
  kycBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  kycInfo: {
    flex: 1,
    gap: 2,
  },
  kycTitle: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#065F46',
  },
  kycLimit: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#059669',
  },
  activeBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexShrink: 0,
  },
  activeBadgeText: {
    fontFamily: 'Inter24pt-Bold',
    fontSize: 10,
    lineHeight: 15,
    color: '#059669',
  },
  // Menu sections
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 0.77,
    color: '#9CA3AF',
  },
  menuCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#94A3B8',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 62,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  menuDivider: {
    height: 1,
    marginLeft: 62,
    backgroundColor: '#F3F4F6',
  },
  // Sign out
  signOutSection: {
    marginTop: 24,
    paddingHorizontal: 24,
    gap: 16,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
  },
  signOutText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#EF4444',
  },
  versionText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#9CA3AF',
  },
});
