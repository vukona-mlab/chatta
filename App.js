import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const Tab = createBottomTabNavigator()
  return(
    <NavigationContainer>
      <Tab.Navigator
        tabBarActiveTintColor="white"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'green',
          }
        }}
        
      >
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarActiveTintColor: "#FFF",
            tabBarIcon: ({color}) => {
              return <Ionicons name="log-in" size={24} color={color} />
            }
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarActiveTintColor: "#FFF",
            tabBarIcon: ({color}) => {
              return <Ionicons name="home" size={24} color={color} />
            }
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
