import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import "./global.css"
 
function App() {
  const isDarkMode = useColorScheme() === 'dark';
// const safeAreaInsets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {

  return (
    <View style={styles.container}>
      <Text className='font-jakarta-semibold' >
        heedok
      </Text>

      <Text  >
        heedok
      </Text>

      <Text>
        heedok
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
});

export default App;
