import { Dimensions, StyleSheet, Text, View, ScrollView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import ChatListItem from '../components/ChatListItem'
import HomeSearchComponent from '../components/HomeSearchComponent'
import ChatInputComponent from '../components/ChatInputComponent'
import ChatRequest from '../components/ChatRequest'
import FAB from '../components/FAB'
import ChatComponent from '../components/ChatComponent'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import { fetchChatRequests, requestNewChat, deleteRequest, acceptRequest, fetchOngoingChats, fetchUserData } from '../services/firebase-service'
import { useEffect } from 'react'



const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { isLoggedIn} = useContext(UserContext)
  const [name, setName] = useState('')
  const [chatRequests, setChatRequests] = useState([])
  const [ongoingChats, setOngoingChats] = useState([])
  console.log(
    isLoggedIn
  );
    const requestChat = async(email, msg) => {
      try {
        const res = await requestNewChat(email, msg)
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    const chatRequestSnapShothandler = async(snapShot) => {
      let requests = []
      requests = await Promise.all(
        snapShot.docs.map(doc => {
          const datetime = new Date(doc.data().time.toDate())
          const date = datetime.getDate() + '/' + (datetime.getMonth() + 1 ) + '/' + datetime.getFullYear();
          const time = datetime.getHours() + ':' + datetime.getMinutes() + (datetime.getHours() > 12 ? ' PM' : ' AM')
          const id = doc.data().requestorID;
          // console.log('user id: ', id);
          return fetchUserData(id).then(user => {
            // console.log('user data: ', user.data());
            return {
              ...doc.data(),
              id: doc.id,
              timeSent: time,
              dateSent: date,
              name: user.data().name,
              email: user.data().email,
              status: user.data().status
            }
          })
        })
      )



      // snapShot.forEach(doc => {
      //   console.log(doc.data());
      //   const datetime = new Date(doc.data().time.toDate())
      //   console.log({ datetime });
      //   const date = datetime.getDate() + '/' + (datetime.getMonth() + 1 ) + '/' + datetime.getFullYear();
      //   const time = datetime.getHours() + ':' + datetime.getMinutes() + (datetime.getHours() > 12 ? ' PM' : ' AM')
      //   const id = doc.data().requestorID;
      //   console.log('user id: ', id);
      //   return fetchUserData(id).then(user => {
      //     console.log('user data: ', user.data());
      //     return { }
      //     return {
      //       ...doc.data(),
      //       id: doc.id,
      //       timeSent: time,
      //       dateSent: date,
      //       name: user.data().name,
      //       email: user.data().email,
      //       status: user.data().status
      //     }
      //   })
      // })
      // console.log(requests);
      setChatRequests(requests)
    }
    const ongoingChatsSnapshotHandler = async(snapShot) => {
      let chats = []
      chats = await Promise.all(
        snapShot.docs.map(doc => {
          const datetime = new Date(doc.data().time.toDate())
          const date = datetime.getDate() + '/' + (datetime.getMonth() + 1 ) + '/' + datetime.getFullYear();
          const time = datetime.getHours() + ':' + datetime.getMinutes() + (datetime.getHours() > 12 ? ' PM' : ' AM')
          const id = doc.data().lastMessage.sender;
          return fetchUserData(id).then(user => {
            // console.log('user data: ', user);
            return {
              ...doc.data(),
              id: doc.id,
              timeSent: time,
              dateSent: date,
              name: user.data().name,
              email: user.data().email,
              status: user.data().status
            }
          })
          
        })
      )
      setOngoingChats(chats)
    }
    useEffect(() => {
      const chatRequestSub = fetchChatRequests(chatRequestSnapShothandler)
      const ongoingChatsSub = fetchOngoingChats(ongoingChatsSnapshotHandler)
      
      return () => {
        chatRequestSub()
        ongoingChatsSub()
      }
    }, [])

    
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <ChatRequest onPress={(email, msg) => { setIsModalVisible(false); requestChat(email, msg) }} />
      </Modal>
      <ScrollView
        scrollEnabled={true}
      >
        {
          chatRequests.map((data) => {
            return <ChatListItem navigation={navigation} type={'chatRequest'} data={data} />
          })
        }
        {
          ongoingChats.map((data) => {
            return <ChatListItem navigation={navigation} type={'ongoingChat'} data={data} />
          })
        }
        
        {/* <ChatListItem navigation={navigation} type={'chat'} />
        <ChatListItem navigation={navigation} type={'chat'} />
        <Text>{name}</Text> */}

      </ScrollView>

      <Pressable onPress={() => setIsModalVisible(true)}>
        <FAB />
      </Pressable>

      <StatusBar style="light" />
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