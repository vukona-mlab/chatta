import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ChatListItem from '../components/ChatListItem'
import HomeSearchComponent from '../components/HomeSearchComponent'
import ChatInputComponent from '../components/ChatInputComponent'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={true}
      >
        <ChatListItem />
        <ChatInputComponent />
      </ScrollView>


    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26394D',
    width: Dimensions.get('window').width
  }
})