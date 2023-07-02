import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../pages/ProfileScreen';
import HomeScreen from '../pages/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from '../services/firebase-service';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const HomeStackNav = () => {
  const Tab = createBottomTabNavigator();
  const { toggleUserState } = useContext(UserContext)
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#FFF',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#26394D',
          borderTopColor: '#BABABA'
        }
      }}
    >
      <Tab.Screen
        name="Profile"
        options={({navigation}) => ({
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="chevron-back" size={30} color="#FFF" style={ styles.backIcon } />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => logoutUser(() => toggleUserState(false))}>
              <Ionicons name="log-out-outline" size={24} color="#FFF" style={styles.logoutIcon} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3F5973'
          },
          headerTintColor: '#FFF',
          tabBarStyle: {
            display: 'none'
          }
        })}
      >
        {(props) => <ProfileScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#3F5973'
          },
          headerTintColor: '#FFF',
          title: 'Chatta',
          headerRight: () => (
            <View style={styles.homeHeaderRight}>
              <TouchableOpacity>
                <Ionicons name="search-outline" size={24} color="#FFF" style={styles.headericons}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="options" size={24} color="#FFF" style={styles.headerIcons}/>
              </TouchableOpacity>
            </View>
          )
        }}
      >

        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#3F5973'
          },
          headerTintColor: '#FFF',
        }}
      >
        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default HomeStackNav

const styles = StyleSheet.create({
  homeHeaderRight: {
    flexDirection: 'row'
  },
  headerIcons: {
    paddingLeft: 10,
    paddingRight: 10
  },
  backIcon: {
    marginLeft: 10
  },
  logoutIcon: {
    marginRight: 10
  }
})