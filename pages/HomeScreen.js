import { Dimensions, StyleSheet, Text, View, ScrollView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import ChatListItem from '../components/ChatListItem'
import HomeSearchComponent from '../components/HomeSearchComponent'
import ChatInputComponent from '../components/ChatInputComponent'
import ChatRequest from '../components/ChatRequest'
import FAB from '../components/FAB'
import ChatComponent from '../components/ChatComponent'

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <ChatRequest onPress={() => setIsModalVisible(false)} />
      </Modal>
      <ScrollView
        scrollEnabled={true}
      >
        <ChatListItem navigation={navigation}/>
        <ChatListItem navigation={navigation}/>
        <ChatListItem navigation={navigation}/>


      </ScrollView>

      <Pressable onPress={() => setIsModalVisible(true)}>
        <FAB />
      </Pressable>

      {/* <ChatComponent /> */}
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