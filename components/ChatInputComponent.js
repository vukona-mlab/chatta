import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import React, {useRef} from 'react'
import { EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ChatInputComponent({ showEmoGifBoard, isBoardVisible, message, setMessage }) {
    const inputRef = useRef();
    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                {
                    isBoardVisible ? (
                        <TouchableOpacity onPress={() => { showEmoGifBoard(false); inputRef.current.focus()}}>
                            <MaterialIcons name="keyboard" size={24} style={styles.emoji} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => { showEmoGifBoard(true); Keyboard.dismiss() }}>
                            <MaterialIcons name="emoji-emotions" size={24} style={styles.emoji} />
                        </TouchableOpacity>
                    )
                }


                <TextInput
                    ref={inputRef}
                    placeholder={'Type a message'}
                    style={styles.textInput}
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                />
                <MaterialIcons name="camera-alt" size={24} style={styles.camera} />
                <FontAwesome name="paperclip" size={22} style={styles.clip} />
            </View>
            <View style={styles.micContainer}>
                {
                    message ? (
                        <TouchableOpacity>
                            <MaterialIcons name="send" size={24} style={styles.mic} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity>
                            <FontAwesome name="microphone" size={24} style={styles.mic} />
                        </TouchableOpacity>
                    )
                }
                
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
        marginLeft: 10,
        marginRight: 20
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