import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

import DashboardNavigator from '@features/dashboard/navigation/DashboardNavigator';
import WalletNavigator from '@features/wallet/navigation/WalletNavigator';
import AnalyticsScreen from '@features/analytics/screens/AnalyticsScreen';
import ProfileScreen from '@features/profile/screens/ProfileScreen';
import QRScannerScreen from '@features/receive/screens/QRScannerScreen';

// ── Placeholder screens ───────────────────────────────────────────────────────

const PlaceholderScreen = () => <View style={{ flex: 1, backgroundColor: '#F8FAFC' }} />;

// ── Tab param list ────────────────────────────────────────────────────────────

export type MainTabParamList = {
  Home: undefined;
  Wallet: undefined;
  Scan: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// ── Tab icons ─────────────────────────────────────────────────────────────────

const HomeTabIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const WalletTabIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={5}
      width={20}
      height={15}
      rx={2}
      stroke={color}
      strokeWidth={1.8}
    />
    <Path
      d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z"
      fill={color}
    />
    <Path
      d="M2 9H22"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const ScanTabIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 7V5C3 3.89543 3.89543 3 5 3H7"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M17 3H19C20.1046 3 21 3.89543 21 5V7"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M21 17V19C21 20.1046 20.1046 21 19 21H17"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M7 21H5C3.89543 21 3 20.1046 3 19V17"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path d="M3 12H21" stroke="white" strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 7V17" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const AnalyticsTabIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileTabIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

// ── Custom tab bar ─────────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const isCenter = route.name === 'Scan';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCenter) {
          return (
            <View key={route.key} style={styles.centerTabWrap}>
              <Pressable
                style={styles.centerBtn}
                onPress={onPress}
                accessibilityLabel="Scan QR code"
                accessibilityRole="button"
              >
                <ScanTabIcon />
              </Pressable>
            </View>
          );
        }

        const color = isFocused ? '#2563EB' : '#9CA3AF';

        return (
          <Pressable
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            accessibilityLabel={String(label)}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
          >
            {isFocused && <View style={styles.activeIndicator} />}
            {route.name === 'Home' && <HomeTabIcon color={color} />}
            {route.name === 'Wallet' && <WalletTabIcon color={color} />}
            {route.name === 'Analytics' && <AnalyticsTabIcon color={color} />}
            {route.name === 'Profile' && <ProfileTabIcon color={color} />}
            <Text
              style={[styles.tabLabel, { color }]}
              allowFontScaling={false}
            >
              {String(label)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ── Navigator ─────────────────────────────────────────────────────────────────

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={DashboardNavigator} />
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen name="Scan" component={QRScannerScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
    alignItems: 'flex-start',
    height: 76,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    height: 67,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 20,
    height: 3,
    backgroundColor: '#2563EB',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  tabLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  centerTabWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 67,
  },
  centerBtn: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
