import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChooseTierScreen from '@features/kyc/screens/ChooseTierScreen';
import DocumentCaptureScreen from '@features/kyc/screens/DocumentCaptureScreen';
import KYCStatusScreen from '@features/kyc/screens/KYCStatusScreen';
import SelfieScreen from '@features/kyc/screens/SelfieScreen';

export type KYCStackParamList = {
  KYCIntro: undefined;
  DocumentCapture: undefined;
  SelfieCapture: undefined;
  ChooseTier: undefined;
};

const Stack = createNativeStackNavigator<KYCStackParamList>();

export default function KYCNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="KYCIntro" component={KYCStatusScreen} />
      <Stack.Screen name="DocumentCapture" component={DocumentCaptureScreen} />
      <Stack.Screen name="SelfieCapture" component={SelfieScreen} />
      <Stack.Screen name="ChooseTier" component={ChooseTierScreen} />
    </Stack.Navigator>
  );
}
