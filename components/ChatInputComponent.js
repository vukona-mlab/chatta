import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import { EvilIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import CameraComponent from './CameraComponent';
import { Camera } from 'expo-camera'

export default function ChatInputComponent({
    showEmoGifBoard, isBoardVisible, message, setMessage, sendMessage, recordAudio, showMediaPicker, recording, pauseRecording, stopRecording, deleteRecording, isPaused, recordingTime
}) {
    const inputRef = useRef();
    const [isCamVisible, setIsCamVisible] = useState(false);
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(5);
    // const [isPaused, setIsPaused] = useState(false)

    const checkCameraPermissions = async () => {
        try {
            let status
            status = (await Camera.getCameraPermissionsAsync()).status
            if (status !== 'granted') status = (await Camera.requestCameraPermissionsAsync()).status
            if (status === 'granted') setIsCamVisible(true)
        } catch (error) {
            // console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={isCamVisible}
            >
                <CameraComponent closeCam={() => setIsCamVisible(false)} />
            </Modal>
            <View style={styles.leftView}>
                {
                    !recording ? (
                        <>
                            {
                                isBoardVisible ? (
                                    <TouchableOpacity onPress={() => { showEmoGifBoard(false); inputRef.current.focus() }}>
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
                            <TouchableOpacity onPress={() => checkCameraPermissions()}>
                                <MaterialIcons name="camera-alt" size={24} style={styles.camera} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => showMediaPicker()}>
                                <FontAwesome name="paperclip" size={22} style={styles.clip} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.recordingCont}>
                            {isPaused ? (
                                <TouchableOpacity onPress={() => recordAudio()}>
                                    <MaterialIcons name="fiber-manual-record" size={32} color="rgb(200, 80, 80)" style={[styles.pauseicon, { top: -3 }]} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => pauseRecording()}>
                                    <Ionicons name="pause" size={24} color="black" style={styles.pauseicon} />
                                </TouchableOpacity>
                            )}

                            <Text style={styles.text}>{isPaused ? "Paused" : "Recording..."}</Text>
                            <View style={styles.recordingTime}>
                                {recordingTime.hours > 0 && <Text style={styles.text}>{recordingTime.hours + ':'}</Text>}
                                <Text style={styles.text}>{recordingTime.minutes + ':'}</Text>
                                <Text style={styles.text}>{recordingTime.seconds}</Text>
                            </View>
                            <TouchableOpacity onPress={() => stopRecording()}>
                                <Ionicons name="stop" size={24} color="black" style={styles.stopIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteRecording}>
                                <MaterialIcons name="delete" size={24} color="rgb(200, 80, 80)" style={styles.delIcon} />
                            </TouchableOpacity>


                        </View>
                    )
                }

            </View>
            <View style={styles.micContainer}>
                {
                    recording || message ? (
                        <TouchableOpacity onPress={() => sendMessage()}>
                            <MaterialIcons name="send" size={24} style={styles.mic} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => recordAudio()}>
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

    },
    recordingCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pauseicon: {
        marginRight: 10,
        marginLeft: 5
    },
    recordingTime: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 5
    },
    text: {
        color: '#4F4F4F',
    },
    delIcon: {
        marginLeft: 5,
        marginRight: 5
    },
    stopIcon: {
        marginLeft: 5,
        // marginRight: 5
    }
})