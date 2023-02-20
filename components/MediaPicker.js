import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'

const MediaPicker = ({ isVisible }) => {
    const openImagePicker = async () => {
        const options = {
            quality: 1,
            aspect: [4, 3],
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All
        }
        const result = await ImagePicker.launchImageLibraryAsync(options)

    }
    const openAudioPicker = async() => {
        const options = {
            type: 'audio/mpeg'
        }
        try {
            const result = await DocumentPicker.getDocumentAsync(options);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                isVisible && <View style={styles.mediaPickerContainer}>
                    <View style={styles.mediaPicker}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => openImagePicker()}>
                                <MaterialIcons name="camera" size={30} color="#FFF" style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => openAudioPicker()}>
                                <FontAwesome name="microphone" size={30} color="#FFF" style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </>


    )
}

export default MediaPicker

const styles = StyleSheet.create({
    mediaPickerContainer: {
        height: 120,
        width: '100%',
        padding: 10,
        position: 'absolute',
        bottom: 60
    },
    mediaPicker: {
        height: 100,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#FFF',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: '#1EA0E5',
        borderRadius: 24,
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
})