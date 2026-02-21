import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterPinScreen from '@features/auth/screens/EnterPinScreen';
import ForgotPasswordScreen from '@features/auth/screens/ForgotPasswordScreen';
import LoginScreen from '@features/auth/screens/LoginScreen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  EnterPin: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="EnterPin" component={EnterPinScreen} />
    </Stack.Navigator>
  );
}
