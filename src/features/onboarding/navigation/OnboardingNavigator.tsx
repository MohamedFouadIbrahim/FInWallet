import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChooseLanguageScreen from '@features/onboarding/screens/ChooseLanguageScreen';
import GetStartedScreen from '@features/onboarding/screens/GetStartedScreen';
import SplashScreen from '@features/onboarding/screens/SplashScreen';
import WelcomeScreen from '@features/onboarding/screens/WelcomeScreen';

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ChooseLanguage: undefined;
  GetStarted: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    </Stack.Navigator>
  );
}
