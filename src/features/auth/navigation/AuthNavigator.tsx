import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BiometricLoginScreen from '@features/auth/screens/BiometricLoginScreen';
import CreateAccountScreen from '@features/auth/screens/CreateAccountScreen';
import CreatePinScreen from '@features/auth/screens/CreatePinScreen';
import EnterPinScreen from '@features/auth/screens/EnterPinScreen';
import ForgotPasswordScreen from '@features/auth/screens/ForgotPasswordScreen';
import LoginScreen from '@features/auth/screens/LoginScreen';
import OTPVerificationScreen from '@features/auth/screens/OTPVerificationScreen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  EnterPin: undefined;
  CreateAccount: undefined;
  VerifyCode: { maskedIdentifier: string };
  CreatePin: undefined;
  EnableBiometrics: undefined;
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
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="VerifyCode" component={OTPVerificationScreen} />
      <Stack.Screen name="CreatePin" component={CreatePinScreen} />
      <Stack.Screen name="EnableBiometrics" component={BiometricLoginScreen} />
    </Stack.Navigator>
  );
}
