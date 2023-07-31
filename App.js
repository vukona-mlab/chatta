import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RegisterScreen from './pages/RegisterScreen';
import { useFonts } from 'expo-font'
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import HomeStackNav from './components/HomeStackNav';
import ChatScreen from './pages/ChatScreen';
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from './contexts/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkAuthState } from './services/firebase-service';
export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator()
  const [isLoggedIn, setUserState] = useState(!!checkAuthState())
  // console.log = () => null
  useEffect(() => {
    // console.log('auth State: ', !!checkAuthState());
  }, [])
  useFonts({
    'berkshire': require('./assets/fonts/berkshire.ttf')
  }) // switch to Fonts.loadAsync
  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ isLoggedIn, toggleUserState: setUserState }}>
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName='HomeStackNav'
          >
            {
              !isLoggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <Stack.Screen name="Chat" options={({ navigation }) => ({
                    // headerShown: false
                    headerStyle: {
                      backgroundColor: '#3F5973'
                    },
                    headerTintColor: '#FFF',
                    headerLeft: () => (
                      <View style={styles.chatHeaderLeft}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <Ionicons name="chevron-back" size={30} color="#FFF" style={styles.chatBackicon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View style={styles.profilePic}></View>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity>
                        <SimpleLineIcons name="options-vertical" size={20} color="#FFF" />
                      </TouchableOpacity>
                    )
                  })}>
                    {(props) => <ChatScreen {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="HomeStackNav" options={{
                    headerShown: false
                  }}>
                    {(props) => <HomeStackNav {...props} />}
                  </Stack.Screen>
                </>
              )
            }


          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>

    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10
  },
  chatBackicon: {
    paddingLeft: 5,
    paddingRight: 5
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 10
  }
});
