import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function LoginScreen({navigation}) {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button 
        title="Switch"
        onPress={() => navigation.navigate('Register', {
          text: 'fromLogin',
          id: 'sdf734f',
          time: '12:09:34'
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({})