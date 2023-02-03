import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './pages/RegisterScreen';
import { useFonts } from 'expo-font'
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator()
  useFonts({
    'berkshire': require('./assets/fonts/berkshire.ttf')
  })
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFF',
          tabBarStyle:{
            backgroundColor: '#26394D',
            borderTopColor: '#BABABA'
          }
        }}
        tabBarOptions={{
          showLabel: false
        }}
      >
        <Tab.Screen
          name="Profile"
          component={(props) => <ProfileScreen {...props} /> }
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="person" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Home"
          component={(props) => <HomeScreen {...props} /> }
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="chatbox" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={(props) => <HomeScreen {...props} /> }
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="heart" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Login" options={{
          headerShown: false
        }}>
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{
          headerShown: false
        }}>
          {(props) => <RegisterScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
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
