import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatComponent from '../components/ChatComponent'
import ChatInputComponent from '../components/ChatInputComponent'
import KeyboardComponent from '../components/KeyboardComponent'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import MediaPicker from '../components/MediaPicker';
import { Audio } from 'expo-av'
import { StatusBar } from 'expo-status-bar'

let audioRecording
const ChatScreen = () => {
  const [showEmoGifBoard, setShowEmoGifBoard] = useState(false);
  const [msg, setMsg] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [recording, setRecording] = useState();
  const [isPaused, setIsPaused] = useState();
  const [recordingTime, setRecordingTime] = useState({hours: 0, minutes: 0, seconds: 0})
  const handleEmoji = (emo) => {
    console.log(emo.emoji);
    setMsg(msg => {
      return msg += emo.emoji
    })
  }
  const sendMessage = () => {

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
    console.log(msg);
  }, [msg])
  const handleGif = (url) => {
    console.log(url);
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ChatComponent />
        <MediaPicker isVisible={showMediaPicker}/>

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