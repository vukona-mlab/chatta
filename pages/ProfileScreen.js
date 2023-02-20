import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text } from 'react-native'
import CameraIcon from '../assets/camera-solid.svg';
export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/2022-05-20T22%3A24%3A10.402Z?alt=media&token=c91c8a48-38f3-471e-8903-e41d5bb9f007' }} />
                    <View style={styles.camContainer}>
                        {/* <Image style={styles.camIcon} source={{ uri: CameraIcon}} /> */}
                        <FontAwesome name="camera" size={24} color="#FFF" />
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.textInput} placeholder="Email" />
                        <TextInput style={styles.textInput} placeholder="Name" />
                        <TextInput style={styles.textInput} placeholder="Password" />
                        <TextInput style={styles.textInput} placeholder="Status" />
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.saveOpt}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#26394D',
        alignItems: 'center'
    },
    topContainer: {
        height: 240,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 160,
        height: 160,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 80,
 
    },
    camContainer: {
        height: 42,
        width: 42,
        backgroundColor: '#1EA0E5',
        borderRadius: 21,
        position: 'absolute',
        top: 115,
        left: 115,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camIcon: {
        width: 24,
        height: 20
    },
    bottomContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    innerContainer: {
        height: 380,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,
        width: 320
    },
    textInput: {
        borderRadius: 15,
        borderColor: '#1EA0E5',
        borderWidth: 1,
        padding: 10,
        height: 46,
        marginVertical: 10
    },
    actionContainer: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center'
    },
    saveOpt: {
        backgroundColor: '#1EA0E5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 46,
        width: 280
    },
    saveText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    }

})