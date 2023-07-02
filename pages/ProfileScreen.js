import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text } from 'react-native'
import CameraIcon from '../assets/camera-solid.svg';
import LoginModal from '../components/LoginModal';
import { updateUser, loginUserInternal } from '../services/firebase-service'

export default function ProfileScreen() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('Vukona')
    const [password, setPassword] = useState('4532Vee3')
    const [status, setStatus] = useState('I am online')
    const [showLoginModal, toggleShowLoginModal] = useState(false)

    const saveForm = async() => {
        if(password.trim() || email.trim()) {
            toggleShowLoginModal(true)
        } else {
            updateUserDetails()
        }
    }
    const submitPassReset = async(password) => {
        try {
            await loginUserInternal(password)
            toggleShowLoginModal(false)
            updateUserDetails()
        } catch (error) {
            console.log(error);
        }
    }
    const updateUserDetails = async() => {
        try {
            const userObj = {
                email: email,
                name: username,
                status: status
            }
            if(password.trim()) {
                userObj.password = password
            }
    
            const res = await updateUser(userObj)
            console.log(res);
        } catch (error) {
         console.log(error);   
        }

    }
    
    return (
        <View style={styles.container}>
            <LoginModal
                isVisible={showLoginModal}
                hideModal={() => toggleShowLoginModal(false)}
                loginUser={(password) => submitPassReset(password)}
            />
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
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Name"
                            onChangeText={(text) => setUsername(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Status"
                            onChangeText={(text) => setStatus(text)}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.saveOpt} onPress={() => saveForm()}>
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