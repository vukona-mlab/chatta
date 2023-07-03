import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatComponent from '../components/ChatComponent'
import ChatInputComponent from '../components/ChatInputComponent'
import KeyboardComponent from '../components/KeyboardComponent'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import MediaPicker from '../components/MediaPicker';
import { Audio } from 'expo-av'
import { StatusBar } from 'expo-status-bar'
import { acceptRequest, deleteRequest, fetchOngoingMessages, sendAudio, sendImage, sendPlainText } from '../services/firebase-service'

let audioRecording
const ChatScreen = ({ navigation, route }) => {
console.log('hey');
  const [showEmoGifBoard, setShowEmoGifBoard] = useState(false);
  const [msg, setMsg] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [recording, setRecording] = useState();
  const [isPaused, setIsPaused] = useState();
  const [messages, setMessages] = useState([])
  const [recordingTime, setRecordingTime] = useState({hours: 0, minutes: 0, seconds: 0})
  const handleEmoji = (emo) => {
    console.log(emo.emoji);
    setMsg(msg => {
      return msg += emo.emoji
    })
  }
  const sendMessage = async() => {
    try {
      const res = await sendPlainText(route.params.data.id, msg)
    } catch (error) {
      console.log(error);
    }

  }
  const updateTime = (mils) => {
    // console.log(mils);
    const time = {
      hours: Math.floor((mils.durationMillis / (1000 * 60 * 60))),
      minutes: Math.floor((mils.durationMillis / (1000 * 60)) % 60),
      seconds: Math.floor((mils.durationMillis / 1000) % 60) 
    }
    setRecordingTime(time)
    console.log(time);
  }
  const recordAudio = async() => {
    try {
      if(!isPaused) {
        await Audio.requestPermissionsAsync()
        const rec = new Audio.Recording();
        await rec.prepareToRecordAsync();
        rec.setOnRecordingStatusUpdate(updateTime)
        // setRecording(rec)
        audioRecording = rec
        // setRecording(true)
        
      }
      await audioRecording.startAsync()
      setIsPaused(false)
      setRecording(true)
    } catch (error) {
      
    }

  }
  const pauseRecording = async() => {
    await audioRecording.pauseAsync();
    setIsPaused(true)
  }
  const stopRecording = async() => {
    await audioRecording.stopAndUnloadAsync();
    const uri = audioRecording.getURI();
    audioRecording = null
    console.log(uri);
    setIsPaused(false);
    setRecording(false)
  }
  const deleteRecording = async() => {
    await audioRecording.stopAndUnloadAsync();
    setRecording(false);
    setIsPaused(false)
  }
  useEffect(() => {
    // console.log(msg);
  }, [msg])
  const handleOngoingChats = (snapShot) => {
    let messagesArr = []
    snapShot.forEach((doc) => {
      const datetime = new Date(doc.data().time.toDate())
      const date = datetime.getDate() + '/' + (datetime.getMonth() + 1 ) + '/' + datetime.getFullYear();
      const time = datetime.getHours() + ':' + datetime.getMinutes() + (datetime.getHours() > 12 ? ' PM' : ' AM')
      // console.log('msg: ', doc.data());
      messagesArr = [...messagesArr, { text: doc.data().message, ID: doc.data().sender, timeSent: time, dateSent: date}]
    })
    setMessages(messagesArr)
  }
  useEffect(() => {
    let ongoingChatsSub
    if(route.params.type === 'chatRequest') {
      const textInfo = route.params.data
      setMessages([{
        text: textInfo.message,
        userID: textInfo.requestorID,
        timeSent: textInfo.timeSent,
        dateSent: textInfo.dateSent
      }])

    } else {
      ongoingChatsSub = fetchOngoingMessages(route.params.data.id, handleOngoingChats)
    }
    // console.log(messages);
    return () => {
      if(ongoingChatsSub) {
        ongoingChatsSub()
      }
    }
  }, [])
  useEffect(() => {
    // console.log(messages);
  }, [messages])
  const handleGif = (url) => {
    console.log(url);
  }
  const declineRequest = async() => {
    try {
      await deleteRequest(route.params.data.requestorID)
      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  }
  const acceptUserRequest = async() => {
    try {
      await acceptRequest(route.params.data)
      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  }
  const sendFile = async(file, type, metadata) => {
    console.log('in func');
    try {
      let result
      if(type === 'image') {
        result = await sendImage(route.params.data.id, file)
      } else {
        result = await sendAudio(route.params.data.id, file, metadata)
      }
      console.log(result);
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {
          route.params.type === 'chatRequest' && (
            <View style={styles.requestOptionsCont}>
            <Text style={styles.requestHeader}>User requests a chat</Text>
            <View style={styles.requestBtns}>
              <TouchableOpacity style={[styles.requestTouchable, {backgroundColor: 'red'}]} onPress={() => declineRequest()}>
                <Text style={styles.requestTouchableText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.requestTouchable, {backgroundColor: 'green'}]} onPress={() => acceptUserRequest()}>
                <Text style={styles.requestTouchableText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
          )
        }

        <ChatComponent texts={ messages } />
        <MediaPicker isVisible={showMediaPicker} sendFile={sendFile}/>

        <View style={styles.inputs}>
          <ChatInputComponent
            message={msg}
            setMessage={(text) => setMsg(text)}
            showEmoGifBoard={(bln) => setShowEmoGifBoard(bln)}
            isBoardVisible={showEmoGifBoard}
            sendMessage={() => sendMessage()}
            recordAudio={() => recordAudio()}
            showMediaPicker={() => setShowMediaPicker(!showMediaPicker)}
            recording={recording}
            recordingPaused={isPaused}
            pauseRecording={() => pauseRecording()}
            isPaused={isPaused}
            stopRecording={() => stopRecording()}
            deleteRecording={() => deleteRecording()}
            recordingTime={recordingTime}
          />
        </View>
      </View>

      <KeyboardComponent
        isBoardVisible={showEmoGifBoard}
        handleEmoji={(emo) => handleEmoji(emo)}
        handleGif={(url) => handleGif(url)}
      />

      <StatusBar style="light" backgroundColor='#3F5973' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#26394D',
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingBottom: 60
  },
  requestOptionsCont: {
    paddingVertical: 10,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(200, 200, 200, 0.1)'
  },
  requestHeader: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(230, 230, 230)',
    alignSelf: 'center'
  },
  requestBtns: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  requestTouchable: {
    height: 50,
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestTouchableText: {
    fontSize: 21,
    color: 'rgb(240, 240, 240)',
    fontWeight: '500',
    letterSpacing: 0.5
  },

  inputs: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  }
})
export default ChatScreen