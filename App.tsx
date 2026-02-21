import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Providers } from '@/app/Providers';
import RootNavigator from '@/navigation/RootNavigator';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <Providers>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Providers>
    </SafeAreaProvider>
  );
}
