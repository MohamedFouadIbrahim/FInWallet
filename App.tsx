import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';
import { Providers } from '@/app/Providers';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <Providers>
        <NavigationContainer>
          <OnboardingNavigator />
        </NavigationContainer>
      </Providers>
    </SafeAreaProvider>
  );
}
