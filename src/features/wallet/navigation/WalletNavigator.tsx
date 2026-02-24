import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WalletOverviewScreen from '@features/wallet/screens/WalletOverviewScreen';
import TopUpScreen from '@features/wallet/screens/TopUpScreen';
import TopUpAmountScreen from '@features/wallet/screens/TopUpAmountScreen';
import TopUpSuccessScreen from '@features/wallet/screens/TopUpSuccessScreen';

export type WalletStackParamList = {
  WalletOverview: undefined;
  WalletTopUp: undefined;
  WalletTopUpAmount: {
    method: 'card' | 'bank';
  };
  WalletTopUpSuccess: {
    amount: string;
  };
};

const Stack = createNativeStackNavigator<WalletStackParamList>();

export default function WalletNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletOverview" component={WalletOverviewScreen} />
      <Stack.Screen name="WalletTopUp" component={TopUpScreen} />
      <Stack.Screen name="WalletTopUpAmount" component={TopUpAmountScreen} />
      <Stack.Screen name="WalletTopUpSuccess" component={TopUpSuccessScreen} />
    </Stack.Navigator>
  );
}
