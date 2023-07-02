import React, { useState } from 'react'
import { useContext } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import * as yup from 'yup';
import PassResetModal from '../components/PassResetModal';
import UserContext from '../contexts/UserContext';
import { loginUser, requestPasswordReset } from '../services/firebase-service';
export default function LoginScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassResetModal, toggleShowPassResetModal] = useState(false)
    const { toggleUserState } = useContext(UserContext)
    // console.log("fn: ", toggleUserState);
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    const handleSubmit = () => {
        schema.isValid({
            email: email,
            password: password
        }).then(async valid => {
            if(!valid) {
                Alert.alert('Form error', 'Form has invalid inputs', [{
                    text: 'Ok', onPress: () => console.log('okay pressed')
                }])
            } else {
                // call the login function
                const res = await loginUser(email, password)
                if(res.success) {
                    setEmail('');
                    setPassword('')
                    // props.navigation.navigate('Home')
                    toggleUserState(true)
                } else {
                    Alert.alert('Sign In Error', res.message, [{
                        text: 'Ok', onPress: () => console.log('okay pressed')
                    }])
                }
                    
                
            }
        })
    }
    const requestPasswordResetEmail = async(email) => {
        console.log(email);
        try {
            // console.log('finite');
            await requestPasswordReset(email)
            toggleShowPassResetModal(false)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <KeyboardAvoidingView enabled={false} behavior={'height'} style={styles.container}>
        <PassResetModal isVisible={ showPassResetModal } hideModal={() => toggleShowPassResetModal(false)} sendRequest={(email) => requestPasswordResetEmail(email)}/>
        <View style={styles.topContainer}>
            <Text style={styles.appName}>
                Chatta
            </Text>
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)} />
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.signIn}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpOpt}>
                        <Text style={styles.noAccText}>No account?</Text>
                        <Text style={styles.signUpText} onPress={() => props.navigation.navigate('Register')}>Sign Up</Text>
                    </View>
                    <TouchableOpacity style={styles.forgotPasswordCont} onPress={() => toggleShowPassResetModal(true)}>
                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 80,
        alignItems: 'center',
        backgroundColor: '#26394D'
    },
    topContainer: {
        flex: 1.2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appName: {
        fontFamily: 'berkshire',
        fontSize: 54,
        color: '#FFF',
        
    },
    bottomContainer: {
        flex: 2.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    innerContainer: {
        height: 310,
        backgroundColor: '#FFF',
        borderRadius: 25,
        width: 320,
        padding: 20
    },
    inputContainer: {
        height: 120,
    },
    textInput: {
        borderRadius: 15,
        height: 46,
        borderColor: '#1EA0E5',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10
    },

    actionContainer: {
        height: 140,
        marginTop: 10,
        justifyContent: 'center'
    },
    actionButton: {
        color: '#FFF',
        backgroundColor: '#1EA0E5',
        borderRadius: 15,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signIn: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
    signUpOpt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    noAccText: {
        fontSize: 16
    },
    signUpText: {
        color: '#1EA0E5',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    },
    forgotPasswordCont: {
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: '#1EA0E5',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
