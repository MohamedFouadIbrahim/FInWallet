import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from '@features/auth/navigation/AuthNavigator';
import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
}
