import { StyleSheet, Text, View, Modal, Dimensions, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

const LoginModal = ({ isVisible, hideModal, loginUser }) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [password, setPassword] = useState('')
    const textRef = useRef()
    useEffect(() => {
        const hideSubscription = Keyboard.addListener('keyboardDidHide', (e) => {
            // console.log(e);
            setKeyboardHeight(e.endCoordinates.height)
        })
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            // console.log(e);
            setKeyboardHeight(e.endCoordinates.height)
        })
        textRef?.current?.focus()
        return () => {
            hideSubscription.remove()
            showSubscription.remove()
        }
    }, [])
    return (
        <Modal
            visible={isVisible}
            transparent
            onRequestClose={ hideModal }
        >
            <TouchableOpacity style={styles.container} onPress={(e) => hideModal()} >
                <View  onStartShouldSetResponder={(event) => true} style={[ styles.innerContainer, {marginBottom: keyboardHeight ? keyboardHeight - 77 : 100 } ]}>
                    <Text style={styles.text}>Enter the password for</Text>
                    <Text style={[styles.text, { fontWeight: '500' }]}>{'User'}</Text>
                    <TextInput
                        ref={ textRef }
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.updateBtn} onPress={() => loginUser(password)}>
                        <Text style={styles.updateText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default LoginModal

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0, 0.65)',
        alignItems: 'center'
    },
    innerContainer: {
        height: 200,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,
        width: 320,
        marginTop: 'auto',
        marginBottom: 100,
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: 'rgb(30, 30, 30)'
    },
    textInput: {
        borderRadius: 15,
        borderColor: '#1EA0E5',
        borderWidth: 1,
        padding: 10,
        height: 46,
        marginVertical: 10,
        width: 280
    },
    updateBtn: {
        backgroundColor: '#1EA0E5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 46,
        width: 280
    },
    updateText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    }
})