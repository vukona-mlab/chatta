import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Image as LazyImage } from 'react-native-elements'

const ImageComponent = ({ uri }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    Image.getSize(uri, (width, height) => {
        let ratio = width/height
        let w = 260
        let h = w/ratio
        setHeight(h) 
        setWidth(w)
    })
    const styles = StyleSheet.create({
        image: {
            height: height,
            width: width,
        }
    })
    return (
        <LazyImage
            style={ styles.image }
            source={{ uri: uri }}
            placeholderStyle={[
                styles.image, {
                    backgroundColor: 'rgba(0,0,0,0)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            ]}
            PlaceholderContent={
                <ActivityIndicator
                    size={'large'}
                    color={'#FFF'}
                />
            }
        />
    )
}

export default ImageComponent

