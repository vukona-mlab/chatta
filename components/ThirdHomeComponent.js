import React from 'react'
import { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { UserContext } from '../services/userContext'

export default function ThirdHomeComponent() {
    const context = useContext(UserContext)
  return (
    <View>
        <Text>{context.name}</Text>
        <Button onPress={() => context.changeName('Mnisi')} title="Change Name"/>
    </View>
  )
}
