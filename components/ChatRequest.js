import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ChatRequest({onPress}) {
    return (
        <View style={styles.centered}>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <TextInput placeholder="Email" style={styles.textInput} />
                    <TextInput placeholder="Message" style={styles.textInput} />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => onPress()}>
                    <Text style={styles.buttonText}>Send Request</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: 220,
        width: 320,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,

    },
    inputs: {
        height: 105,
        justifyContent: 'space-between'
    },
    textInput: {
        height: 46,
        width: 280,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#1EA0E5',
        padding: 10,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#1EA0E5',
        height: 46,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
})