import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';

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

const LockIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M12.6667 7.33333H3.33333C2.59695 7.33333 2 7.93029 2 8.66667V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V8.66667C14 7.93029 13.403 7.33333 12.6667 7.33333Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.66667 7.33333V4.66667C4.66667 3.78261 5.01786 2.93477 5.64298 2.30964C6.2681 1.68452 7.11594 1.33333 8 1.33333C8.88405 1.33333 9.7319 1.68452 10.357 2.30964C10.9821 2.93477 11.3333 3.78261 11.3333 4.66667V7.33333"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ color = '#F59E0B' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6.84533 14C6.96236 14.2027 7.13068 14.371 7.33336 14.488C7.53605 14.605 7.76596 14.6666 8 14.6666C8.23404 14.6666 8.46395 14.605 8.66664 14.488C8.86932 14.371 9.03764 14.2027 9.15467 14"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.17467 10.2173C2.08758 10.3128 2.0301 10.4315 2.00924 10.559C1.98837 10.6865 2.00501 10.8174 2.05714 10.9356C2.10926 11.0538 2.19462 11.1544 2.30284 11.225C2.41105 11.2956 2.53745 11.3332 2.66667 11.3333H13.3333C13.4625 11.3334 13.589 11.2959 13.6972 11.2254C13.8055 11.1549 13.891 11.0545 13.9433 10.9363C13.9955 10.8182 14.0123 10.6874 13.9916 10.5599C13.9709 10.4323 13.9136 10.3136 13.8267 10.218C12.94 9.304 12 8.33267 12 5.33333C12 4.27247 11.5786 3.25505 10.8284 2.50491C10.0783 1.75476 9.06087 1.33333 8 1.33333C6.93913 1.33333 5.92172 1.75476 5.17157 2.50491C4.42143 3.25505 4 4.27247 4 5.33333C4 8.33267 3.05933 9.304 2.17467 10.2173Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AppearanceIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M7.68333 1.53C7.71255 1.47097 7.75768 1.42129 7.81363 1.38655C7.86959 1.35181 7.93414 1.3334 8 1.3334C8.06586 1.3334 8.13041 1.35181 8.18637 1.38655C8.24232 1.42129 8.28745 1.47097 8.31667 1.53L9.85667 4.64933C9.95812 4.85464 10.1079 5.03227 10.2931 5.16697C10.4783 5.30167 10.6934 5.38941 10.92 5.42267L14.364 5.92667C14.4293 5.93612 14.4906 5.96365 14.541 6.00613C14.5914 6.04862 14.629 6.10437 14.6493 6.16707C14.6697 6.22978 14.6722 6.29694 14.6564 6.36096C14.6406 6.42498 14.6072 6.4833 14.56 6.52933L12.0693 8.95467C11.9051 9.11473 11.7822 9.31232 11.7112 9.53042C11.6403 9.74852 11.6234 9.98059 11.662 10.2067L12.25 13.6333C12.2615 13.6986 12.2545 13.7657 12.2297 13.8271C12.2049 13.8885 12.1633 13.9417 12.1097 13.9807C12.0561 14.0196 11.9927 14.0427 11.9266 14.0473C11.8605 14.0519 11.7945 14.0378 11.736 14.0067L8.65733 12.388C8.45448 12.2815 8.22879 12.2258 7.99967 12.2258C7.77055 12.2258 7.54485 12.2815 7.342 12.388L4.264 14.0067C4.20555 14.0376 4.1396 14.0515 4.07363 14.0468C4.00767 14.0421 3.94435 14.019 3.89086 13.9801C3.83738 13.9412 3.79589 13.8881 3.7711 13.8268C3.74632 13.7655 3.73924 13.6985 3.75067 13.6333L4.338 10.2073C4.3768 9.98115 4.35999 9.74893 4.28903 9.5307C4.21806 9.31246 4.09507 9.11477 3.93067 8.95467L1.44 6.53C1.3924 6.48402 1.35866 6.4256 1.34264 6.36138C1.32662 6.29717 1.32896 6.22975 1.34939 6.16679C1.36981 6.10384 1.40751 6.04789 1.45818 6.00532C1.50886 5.96275 1.57047 5.93527 1.636 5.926L5.07933 5.42267C5.30617 5.38967 5.52159 5.30204 5.70706 5.16732C5.89252 5.03261 6.04247 4.85485 6.144 4.64933L7.68333 1.53Z"
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

const InfoIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Defs>
      <ClipPath id="info-clip">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#info-clip)">
      <Path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 10.6667V8"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 5.33333H8.00667"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
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
  | 'person' | 'card' | 'globe'
  | 'lock'   | 'shield'
  | 'bell'   | 'appearance'
  | 'help'   | 'info';

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
    title: 'Account',
    items: [
      { label: 'Personal Information', icon: 'person',  iconBg: '#EFF6FF' },
      { label: 'Payment Methods',      icon: 'card',    iconBg: '#F5F3FF' },
      { label: 'Language & Region',    icon: 'globe',   iconBg: '#F0FDF4' },
    ],
  },
  {
    title: 'Security',
    items: [
      { label: 'Change PIN',       icon: 'lock',   iconBg: '#FEF2F2' },
      { label: 'Two-Factor Auth',  icon: 'shield', iconBg: '#F0FDF4' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Notifications', icon: 'bell',       iconBg: '#FFFBEB' },
      { label: 'Appearance',    icon: 'appearance', iconBg: '#F5F3FF' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center',     icon: 'help', iconBg: '#EFF6FF' },
      { label: 'About FinWallet', icon: 'info', iconBg: '#F3F4F6' },
    ],
  },
];

// ── Icon renderer ─────────────────────────────────────────────────────────────

const MenuIcon = ({ icon }: { icon: IconKey }) => {
  switch (icon) {
    case 'person':     return <PersonIcon />;
    case 'card':       return <CardIcon />;
    case 'globe':      return <GlobeIcon />;
    case 'lock':       return <LockIcon />;
    case 'shield':     return <ShieldIcon />;
    case 'bell':       return <BellIcon />;
    case 'appearance': return <AppearanceIcon />;
    case 'help':       return <HelpIcon />;
    case 'info':       return <InfoIcon />;
  }
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface MenuItemRowProps {
  item: MenuItem;
  isLast: boolean;
  isDark: boolean;
  onPress: () => void;
}

const MenuItemRow = ({ item, isLast, isDark, onPress }: MenuItemRowProps) => (
  <>
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
      accessibilityLabel={item.label}
      accessibilityRole="button"
    >
      <View
        style={[
          styles.menuIconWrap,
          { backgroundColor: isDark ? '#0F172A' : item.iconBg },
        ]}
      >
        <MenuIcon icon={item.icon} />
      </View>
      <Text
        style={[styles.menuLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}
        allowFontScaling={false}
      >
        {item.label}
      </Text>
      <ChevronRightIcon color={isDark ? '#4B5563' : '#D1D5DB'} />
    </Pressable>
    {!isLast && (
      <View
        style={[
          styles.menuDivider,
          { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' },
        ]}
      />
    )}
  </>
);

// ── Main screen ───────────────────────────────────────────────────────────────

const ProfileScreen = () => {
  const { isDark } = useTheme();

  const handleEdit     = useCallback(() => {}, []);
  const handleSignOut  = useCallback(() => {}, []);
  const handleMenuItem = useCallback((_label: string) => {}, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        style={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Title ─────────────────────────────────────────────────────────── */}
        <Text
          style={[styles.pageTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}
          allowFontScaling={false}
        >
          Profile
        </Text>

        {/* ── Profile card ──────────────────────────────────────────────────── */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E5E7EB',
              shadowColor: isDark ? '#000' : '#94A3B8',
              shadowOpacity: isDark ? 0.3 : 0.08,
            },
          ]}
        >
          {/* Avatar row */}
          <View style={styles.avatarRow}>
            <LinearGradient
              colors={['#2563EB', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <Text style={styles.avatarText} allowFontScaling={false}>
                AC
              </Text>
            </LinearGradient>

            <View style={styles.avatarInfo}>
              <Text
                style={[styles.userName, { color: isDark ? '#F9FAFB' : '#111827' }]}
                allowFontScaling={false}
              >
                Alex Carter
              </Text>
              <Text
                style={[styles.userEmail, { color: isDark ? '#9CA3AF' : '#6B7280' }]}
                allowFontScaling={false}
              >
                alex.carter@email.com
              </Text>
            </View>

            <Pressable
              style={[
                styles.editBtn,
                { backgroundColor: isDark ? '#1E3A5F' : '#EFF6FF' },
              ]}
              onPress={handleEdit}
              accessibilityLabel="Edit profile"
            >
              <Text style={styles.editBtnText} allowFontScaling={false}>
                Edit
              </Text>
            </Pressable>
          </View>

          {/* KYC banner */}
          <View
            style={[
              styles.kycBanner,
              {
                backgroundColor: isDark ? '#052E16' : '#F0FDF4',
                borderColor: isDark ? '#166534' : '#BBF7D0',
              },
            ]}
          >
            <ShieldIcon color="#059669" />
            <View style={styles.kycInfo}>
              <Text
                style={[styles.kycTitle, { color: isDark ? '#4ADE80' : '#065F46' }]}
                allowFontScaling={false}
              >
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
            <Text
              style={[styles.sectionLabel, { color: isDark ? '#6B7280' : '#9CA3AF' }]}
              allowFontScaling={false}
            >
              {section.title.toUpperCase()}
            </Text>
            <View
              style={[
                styles.menuCard,
                {
                  backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                  borderColor: isDark ? '#334155' : '#E5E7EB',
                  shadowColor: isDark ? '#000' : '#94A3B8',
                  shadowOpacity: isDark ? 0.3 : 0.06,
                },
              ]}
            >
              {section.items.map((item, idx) => (
                <MenuItemRow
                  key={item.label}
                  item={item}
                  isLast={idx === section.items.length - 1}
                  isDark={isDark}
                  onPress={() => handleMenuItem(item.label)}
                />
              ))}
            </View>
          </View>
        ))}

        {/* ── Sign out ──────────────────────────────────────────────────────── */}
        <View style={styles.signOutSection}>
          <Pressable
            style={[
              styles.signOutBtn,
              {
                backgroundColor: isDark ? '#2D1515' : '#FEF2F2',
                borderColor: isDark ? '#7F1D1D' : '#FECACA',
              },
            ]}
            onPress={handleSignOut}
            accessibilityLabel="Sign out"
          >
            <SignOutIcon />
            <Text style={styles.signOutText} allowFontScaling={false}>
              Sign Out
            </Text>
          </Pressable>

          <Text
            style={[styles.versionText, { color: isDark ? '#6B7280' : '#9CA3AF' }]}
            allowFontScaling={false}
          >
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
  scrollContent: {
    paddingBottom: 32,
  },
  // Page title
  pageTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 16,
  },
  // Profile card
  profileCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 21,
    paddingTop: 21,
    paddingBottom: 20,
    gap: 16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 18,
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
    gap: 2,
  },
  userName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 17,
    lineHeight: 25.5,
  },
  userEmail: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  editBtn: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 8,
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
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  kycInfo: {
    flex: 1,
    gap: 2,
  },
  kycTitle: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
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
  },
  menuCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
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
  },
  menuDivider: {
    height: 1,
    marginLeft: 62,
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
    borderWidth: 1,
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
  },
});
