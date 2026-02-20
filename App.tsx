import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <OnboardingNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
