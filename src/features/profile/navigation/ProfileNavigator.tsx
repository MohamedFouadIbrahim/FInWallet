import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '@features/profile/screens/ProfileScreen';
import EditProfileScreen from '@features/profile/screens/EditProfileScreen';
import LinkedAccountsScreen from '@features/profile/screens/LinkedAccountsScreen';
import SecurityCenterScreen from '@features/profile/screens/SecurityCenterScreen';
import ActiveSessionsScreen from '@features/profile/screens/ActiveSessionsScreen';
import SettingsScreen from '@features/profile/screens/SettingsScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  LinkedAccounts: undefined;
  SecurityCenter: undefined;
  ActiveSessions: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="LinkedAccounts"
        component={LinkedAccountsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SecurityCenter"
        component={SecurityCenterScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ActiveSessions"
        component={ActiveSessionsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
