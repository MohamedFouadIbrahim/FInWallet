import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@features/dashboard/screens/HomeScreen';
import SearchScreen from '@features/dashboard/screens/SearchScreen';
import SendMoneyScreen from '@features/transfer/screens/SendMoneyScreen';
import SendToWalletScreen from '@features/transfer/screens/SendToWalletScreen';
import SendToBankScreen from '@features/transfer/screens/SendToBankScreen';
import SendToContactScreen from '@features/transfer/screens/SendToContactScreen';
import CountrySelectScreen from '@features/transfer/screens/CountrySelectScreen';
import RecipientDetailsScreen from '@features/transfer/screens/RecipientDetailsScreen';
import AmountEntryScreen from '@features/transfer/screens/AmountEntryScreen';
import TransferReviewScreen from '@features/transfer/screens/TransferReviewScreen';
import PinConfirmScreen from '@features/transfer/screens/PinConfirmScreen';
import TransferLoadingScreen from '@features/transfer/screens/TransferLoadingScreen';
import TransferSuccessScreen from '@features/transfer/screens/TransferSuccessScreen';
import MyQRCodeScreen from '@features/receive/screens/MyQRCodeScreen';

export type DashboardStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  SendMoney: undefined;
  ReceiveMoney: undefined;
  SendToWallet: undefined;
  SendToBank: undefined;
  SendToContact: undefined;
  CountrySelect: undefined;
  RecipientDetails: {
    country: {
      id: string;
      flag: string;
      name: string;
      currency: string;
      rate: string;
    };
  };
  AmountEntry: {
    recipientId: string;
    recipientName?: string;
    recipientSubtitle?: string;
    transferType?: 'wallet' | 'bank' | 'contact' | 'international';
    exchangeRate?: string;
    currency?: string;
  };
  TransferReview: { amount: number; recipientName: string; recipientUsername: string; exchangeRate?: string; currency?: string };
  PinConfirm: { amount: number; recipientName: string; recipientUsername: string; exchangeRate?: string; currency?: string };
  TransferLoading: { amount: number; recipientName: string; recipientUsername: string; exchangeRate?: string; currency?: string };
  TransferSuccess: { amount: number; recipientName: string; recipientUsername: string; exchangeRate?: string; currency?: string };
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
        name="ReceiveMoney"
        component={MyQRCodeScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="SendToWallet"
        component={SendToWalletScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SendToBank"
        component={SendToBankScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SendToContact"
        component={SendToContactScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="CountrySelect"
        component={CountrySelectScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="RecipientDetails"
        component={RecipientDetailsScreen}
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
