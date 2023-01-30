import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './pages/RegisterScreen';
import { useFonts } from 'expo-font'
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
export default function App() {
  useFonts({
    'berkshire': require('./assets/fonts/berkshire.ttf')
  })
  return (
    <View style={styles.container}>
      <LoginScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
