import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnalyticsScreen from '@features/analytics/screens/AnalyticsScreen';
import CategoryBreakdownScreen from '@features/analytics/screens/CategoryBreakdownScreen';
import SpendingOverviewScreen from '@features/analytics/screens/SpendingOverviewScreen';
import BudgetScreen from '@features/analytics/screens/BudgetScreen';
import AddBudgetScreen from '@features/analytics/screens/AddBudgetScreen';

export type AnalyticsStackParamList = {
  AnalyticsMain: undefined;
  SpendingBreakdown: undefined;
  MonthlyComparison: undefined;
  BudgetManager: undefined;
  AddBudget: undefined;
};

const Stack = createNativeStackNavigator<AnalyticsStackParamList>();

export default function AnalyticsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnalyticsMain" component={AnalyticsScreen} />
      <Stack.Screen
        name="SpendingBreakdown"
        component={CategoryBreakdownScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MonthlyComparison"
        component={SpendingOverviewScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BudgetManager"
        component={BudgetScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="AddBudget"
        component={AddBudgetScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
