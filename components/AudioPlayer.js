import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import TimeComponent from './TimeComponent';

const AudioPlayer = ({ selectedAudio, item, setSelected }) => {
    const [trackDuration, setTrackDuration] = useState(0);
    const [trackPosition, setTrackPosition] = useState(0);
    const [sound, setSound] = useState()
    const audio = useRef(new Audio.Sound())

    useEffect(() => {
        return audio.current ? async() => {
            sound && await sound.unloadAsync()
            audio.current.unloadAsync()
            setSound(null)
            setSelected({ id: null, playing: false })
        } : undefined

    }, [audio])
    const setUpTrack = async() => {
        setTrackDuration(5000990)
        try {
            await audio.current.loadAsync(require('../assets/audio/myztro-tobetsa.mp3'), {}, true)

            await audio.current.setOnPlaybackStatusUpdate(handleUpdate);
            await audio.current.setProgressUpdateIntervalAsync(500);
            const status = await audio.current.getStatusAsync()
            setTrackDuration(status.durationMillis / 1000)
        } catch (error) {

        }
    }
    useEffect(() => {
        setUpTrack()
        return () => {
            setTrackPosition(0)
            setTrackDuration(0)
            setSound(null)
        }
    }, [])
    useEffect(() => {
        console.log({ trackPosition });
    }, [trackPosition])
    const handleUpdate = async (status) => {
        try {
            if (!status.isLoaded) {
                console.log('error loading');
            } else {
                if (status.isPlaying) {
                    const res = await audio.current.getStatusAsync()

                    const positionMillis = parseInt(res.positionMillis)
                    setTrackPosition(positionMillis / 1000)    
                } else {
                    console.log('not playing');
                    if(status.durationMillis === trackPosition * 1000) {
                        setSelected(selected => ({ ...selected, playing: false }))
                    }
                }
                if (status.isBuffering) {
                    // console.log('buffering');
                }
            }
        } catch (error) {
            console.error(error);
        }
       
    }
    const pauseAudio = async () => {
        try {
            await audio.current.pauseAsync()
            setSelected((selected) => ({ ...selected, playing: false }))
        } catch (error) {
            console.log('attempt to stop: ', error);
        }
    }

    const playAudioAsync = async() => {
        try {
            await audio.current.playFromPositionAsync(parseInt(trackPosition * 1000))
            setSelected({ id: item.docID, playing: true })
        } catch (error) {
            console.log({ err: error });
        }
    }
    const handleSlideComplete = async (seconds) => {
        try {
            setTrackPosition(seconds)
            if(selectedAudio.playing) {
                await audio.current.playFromPositionAsync(parseInt(seconds * 1000))
            }
            if(trackDuration === seconds) setSelected(selected => ({ ...selected, playing: false }))
        } catch (error) {

        }

    }
    const handleSlideStart = async (seconds) => {
        setTrackPosition(seconds)
        await audio.current.pauseAsync()
    }
    return (
        <View style={{ flexDirection: 'row', }}>
            {
                selectedAudio.id === item.docID && selectedAudio.playing ? (
                    <TouchableOpacity onPress={() => pauseAudio(item.text, item.docID)}>
                        <Ionicons name="pause" size={35} color="black" style={[styles.pauseicon, { marginRight: 0 }]} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => playAudioAsync(item.text, item.docID)}>
                        <Ionicons name="play" size={35} color="black" style={[styles.pauseicon, { marginRight: 0 }]} />
                    </TouchableOpacity>
                )
            }
            <View style={{ flexDirection: 'column', flex: 1, marginTop: 10 }}>
                <Slider
                    value={ trackPosition || 0 }
                    step={0.5}
                    onSlidingComplete={ handleSlideComplete }
                    onSlidingStart={ handleSlideStart }
                    minimumValue={0}
                    maximumValue={trackDuration}
                    style={{ flex: 1, padding: 0, marginLeft: 0, marginRight: 0 }}
                    containerStyle={{ backgroundColor: 'red', display: 'flex', width: 200 }}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor='black'
                    thumbTintColor='black'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginRight: 15 }}>
                    <TimeComponent milliseconds={trackPosition} />
                    <TimeComponent milliseconds={trackDuration} />
                </View>
            </View>
        </View>
    )
}

export default AudioPlayer

const styles = StyleSheet.create({})