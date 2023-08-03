import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { useEffect } from 'react';
import TimeComponent from './TimeComponent';
import { useRef } from 'react';
import { Audio } from 'expo-av'

const AudioPlayer = ({ item, selectedAudio, setSelectedAudio }) => {
  const [trackDuration, setTrackDuration] = useState(1)
  const [trackPosition, setTrackPosition] = useState(9)
  const audio = useRef(new Audio.Sound())

  useEffect(() => {
    setUpTrack()
  }, [])
  const setUpTrack = async () => {
    try {
      // await audio.current.loadAsync(require('../assets/audio/myztro-tobetsa.mp3'), {}, true)
      await audio.current.loadAsync({ uri: item.text }, {}, true)
      audio.current.setOnPlaybackStatusUpdate(handleAudioUpdate)
      audio.current.setProgressUpdateIntervalAsync(500)
      const status = await audio.current.getStatusAsync()
      console.log({ status: status.durationMillis });
      setTrackDuration(status.durationMillis / 1000)
    } catch (error) {
      console.log({ error });
    }
  }
  useEffect(() => {
    return audio.current ? () => {
      audio.current.unloadAsync()
    } : undefined
  }, [audio])
  const pauseAudio = async () => {
    try {
      await audio.current.pauseAsync()
      setSelectedAudio(selectedAudio => ({ ...selectedAudio, playing: false }))
    } catch (error) {
      console.log({ error });
    }
  }
  const playAudio = async () => {
    try {
      await audio.current.playFromPositionAsync(trackPosition * 1000)
      setSelectedAudio({ id: item.docID, playing: true })
    } catch (error) {
      console.log({ error });
    }
  }
  const handleAudioUpdate = async (statusObject) => {
    // console.log(statusObject);
    if (statusObject.isLoaded) {
      const status = await audio.current.getStatusAsync()
      const positionMillis = parseInt(status.positionMillis)
      if (statusObject.isPlaying) {
        // console.log('in update');
        setTrackPosition(positionMillis / 1000)
      } else {
        // console.log('not playing');

        // console.log({
        //   pos: positionMillis,
        //   dur: status.durationMillis
        // });
        if (positionMillis === status.durationMillis) {
          audio.current.setProgressUpdateIntervalAsync(trackDuration)
          setSelectedAudio(selected => ({ ...selected, playing: false }))
        }

      }
      if (statusObject.isBuffering) {
        // loaders
      }
    } else {

    }
  }
  const handleSlideStart = async (num) => {
    console.log({ num });
    try {
      await audio.current.pauseAsync()
    } catch (error) {
      console.log({ error });
    }
  }
  const handleSlideComplete = async (seconds) => {
    console.log({ seconds });
    try {

      // if(!selectedAudio.playing) setTrackPosition(seconds)
      // await audio.current.setPositionAsync(seconds * 1000)
      if (selectedAudio.playing) await audio.current.playFromPositionAsync(seconds * 1000)
      if (seconds === trackDuration) setSelectedAudio(selected => ({ ...selected, playing: false }))
    } catch (error) {
      console.log({ error });
    }

  }
  const handleValueChange = (e) => {
    console.log({ e });
  }

  useEffect(() => {
    console.log({ trackPosition });
  }, [trackPosition])

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        selectedAudio.id === item.docID && selectedAudio.playing === true
          ? (
            <TouchableOpacity onPress={pauseAudio}>
              <Ionicons name="pause" size={35} color={'#000'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={playAudio}>
              <Ionicons name="play" size={35} color={'#000'} />
            </TouchableOpacity>
          )
      }
      <View style={{ marginTop: 10 }}>
        <Slider
          style={{ width: 230, height: 20 }}
          minimumValue={0}
          maximumValue={trackDuration}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000000"
          thumbTintColor='#000'
          onSlidingStart={handleSlideStart}
          onSlidingComplete={handleSlideComplete}
          onValueChange={handleValueChange}
          value={trackPosition}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15

        }}>
          <TimeComponent seconds={trackPosition} />
          <TimeComponent seconds={trackDuration} />
        </View>
      </View>

    </View>
  )
}

export default AudioPlayer

const styles = StyleSheet.create({})