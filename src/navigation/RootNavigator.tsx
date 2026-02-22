import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';
import AuthNavigator from '@features/auth/navigation/AuthNavigator';
import type { KYCStackParamList } from '@features/kyc/navigation/KYCNavigator';
import KYCNavigator from '@features/kyc/navigation/KYCNavigator';
import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: { screen: keyof AuthStackParamList } | undefined;
  KYC: { screen: keyof KYCStackParamList } | undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="KYC" component={KYCNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
