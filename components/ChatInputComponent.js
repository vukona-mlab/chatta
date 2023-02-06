import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons'; 

export default function ChatInputComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <MaterialIcons name="emoji-emotions" size={24} style={styles.emoji}/>
        <TextInput placeholder={'Type a message'} style={styles.textInput}/>
        <MaterialIcons name="camera-alt" size={24} style={styles.emoji}/>
        <FontAwesome name="paperclip" size={22} style={styles.clip}/>
      </View>
      <View style={styles.micContainer}>
      <FontAwesome name="microphone" size={24} style={styles.mic}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: '100%'
    },
    leftView: {
        height: 42,
        flex: 1,
        borderRadius: 21,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 7,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    emoji: {
        
        color: '#272727',
        marginRight: 10
    },
    textInput: {
        fontSize: 15,
        color: '#4F4F4F',
        flex: 1,
    },
    camera: {
        height: 21,
        width: 21,
        backgroundColor: '#4F4F4F',
        marginHorizontal: 10
    },
    clip: {
        height: 21,
        width: 21,
        // backgroundColor: '#4F4F4F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    micContainer: {
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: '#FFF',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mic: {
        color: '#272727',
       
    }
})