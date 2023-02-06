import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../pages/ProfileScreen';
import HomeScreen from '../pages/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStackNav = () => {
    const Tab = createBottomTabNavigator();
  return (
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
  )
}

export default HomeStackNav