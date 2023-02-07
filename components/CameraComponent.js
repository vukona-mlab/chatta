import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Camera } from 'expo-camera';
import { EvilIcons } from '@expo/vector-icons';
const CameraComponent = ({closeCam}) => {
    const camera = useRef();
    const [hasPermissions, setHasPermissions] = useState(false);

    useEffect(() => {
        (async() => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setHasPermissions(status === 'granted')
        })
    }, [])
  return (
    <View style={styles.container}>
      <Camera 
        type="back"
        ref={camera}
        style={styles.camera}
      >
        <TouchableOpacity onPress={() => closeCam()}>
            <EvilIcons name="close" size={24} color="rgb(230, 230, 230)" style={styles.closeIcon} />
        </TouchableOpacity>

      </Camera>
    </View>
  )
}

export default CameraComponent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    closeIcon: {
        padding: 10
    }
})