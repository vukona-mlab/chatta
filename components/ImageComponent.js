import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image as LazyImage } from 'react-native-elements'

const ImageComponent = ({uri}) => {
  const [imageDimensions, setImageDimensions] = useState({ w: 0, h: 0})
  useEffect(() => {
    if(!uri) return
    Image.getSize(uri, (width, height) => {
      console.log({ width, height });

      let ratio = width/height
      let w = 260
      let h = w/ratio
      console.log({ w, h });
      setImageDimensions({ w: w, h: h })
    })
  }, [uri])
  console.log({uri});
  return (
    <LazyImage
      source={{ uri: uri }}
      style={{
        width: imageDimensions.w,
        height: imageDimensions.h
      }}
      placeholderStyle={{
        width: imageDimensions.w,
        height: imageDimensions.h,
        backgroundColor:  '#1EA0E5',
        justifyContent: 'center',
        alignItems: 'center'
      }}
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

const styles = StyleSheet.create({})