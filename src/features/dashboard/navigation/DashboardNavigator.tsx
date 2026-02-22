import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@features/dashboard/screens/HomeScreen';
import SearchScreen from '@features/dashboard/screens/SearchScreen';

export type DashboardStackParamList = {
  HomeMain: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}
