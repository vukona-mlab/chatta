import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatComponent from '../components/ChatComponent'
import ChatInputComponent from '../components/ChatInputComponent'
import KeyboardComponent from '../components/KeyboardComponent'

const ChatScreen = () => {
  const [showEmoGifBoard, setShowEmoGifBoard] = useState(false);
  const [msg, setMsg] = useState('')
  const handleEmoji = (emo) => {
    console.log(emo.emoji);
    setMsg(msg => {
      return msg += emo.emoji
    })
  }
  const sendMessage = () => {

  }
  const recordAudio = () => {

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
        <View style={styles.inputs}>
          <ChatInputComponent
            message={msg}
            setMessage={(text) => setMsg(text)}
            showEmoGifBoard={(bln) => setShowEmoGifBoard(bln)}
            isBoardVisible={showEmoGifBoard}
            sendMessage={() => sendMessage()}
            recordAudio={() => recordAudio()}
          />
        </View>
      </View>

      <KeyboardComponent
        isBoardVisible={showEmoGifBoard}
        handleEmoji={(emo) => handleEmoji(emo)}
        handleGif={(url) => handleGif(url)}
      />
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