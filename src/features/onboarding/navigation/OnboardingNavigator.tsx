import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@features/onboarding/screens/SplashScreen';
import WelcomeScreen from '@features/onboarding/screens/WelcomeScreen';

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
