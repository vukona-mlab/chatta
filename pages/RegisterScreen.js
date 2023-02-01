import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function RegisterScreen({route}) {
  console.log(route.params);
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})