import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { UserContext } from '../services/userContext';
import SecondHomeComponent from './SecondHomeComponent';

export default function HomeComponent() {
    
  return (
    <View>
        {/* Display name from parent component */}
        <SecondHomeComponent />
        {/* <Button onPress={() => context.changeName('Mnisi')} title="Change Name"/> */}
    </View>
  )
}
