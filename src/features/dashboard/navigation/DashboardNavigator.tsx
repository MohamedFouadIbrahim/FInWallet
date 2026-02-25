import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@features/dashboard/screens/HomeScreen';
import SearchScreen from '@features/dashboard/screens/SearchScreen';
import SendMoneyScreen from '@features/transfer/screens/SendMoneyScreen';
import SendToWalletScreen from '@features/transfer/screens/SendToWalletScreen';
import AmountEntryScreen from '@features/transfer/screens/AmountEntryScreen';
import TransferReviewScreen from '@features/transfer/screens/TransferReviewScreen';
import PinConfirmScreen from '@features/transfer/screens/PinConfirmScreen';
import TransferLoadingScreen from '@features/transfer/screens/TransferLoadingScreen';
import TransferSuccessScreen from '@features/transfer/screens/TransferSuccessScreen';

export type DashboardStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  SendMoney: undefined;
  SendToWallet: undefined;
  AmountEntry: { recipientId: string };
  TransferReview: { amount: number; recipientName: string; recipientUsername: string };
  PinConfirm: { amount: number; recipientName: string; recipientUsername: string };
  TransferLoading: { amount: number; recipientName: string; recipientUsername: string };
  TransferSuccess: { amount: number; recipientName: string; recipientUsername: string };
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
      <Stack.Screen
        name="SendMoney"
        component={SendMoneyScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="SendToWallet"
        component={SendToWalletScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="AmountEntry"
        component={AmountEntryScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TransferReview"
        component={TransferReviewScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PinConfirm"
        component={PinConfirmScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TransferLoading"
        component={TransferLoadingScreen}
        options={{ animation: 'fade', gestureEnabled: false }}
      />
      <Stack.Screen
        name="TransferSuccess"
        component={TransferSuccessScreen}
        options={{ animation: 'fade', gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
