import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react';
import { Audio } from 'expo-av';

export default function ChatComponent({ texts }) {
    const userID = 'veeINdf5345'
    const [selectedAudio, setSelected] = useState()
    const [sound, setSound] = useState()
    const audio = new Audio.Sound();

    // console.log('texts: ', texts);
    // console.log('in the chat com');
    useEffect(() => {
        console.log('hey there');
        return () => {

        }
    }, [])
    useEffect(() => {
        console.log('sound in effect: ', sound);
        return sound ? () =>
            sound.unloadAsync() : undefined
    }, [sound])
    const handleUpdate = (status) => {
        if (!status.isLoaded) {
            console.log('error loading');
        } else {
            if (status.isPlaying) {
                console.log('playing');
            } else {
                console.log('not playing');
            }
            if (status.isBuffering) {
                console.log('buffering');
            }
        }
    }
    const pauseAudio = async(url, ID) => {
        console.log('attempt to stop: ', sound);
        try {
            await sound.stopAsync()
            setSelected(null)
        } catch (error) {
            console.log('attempt to stop: ', error);
        }
    }
    const playAudio = async (url, ID) => {

        try {
            if(sound) {
                console.log('new sound: ', sound);
                await sound.stopAsync()

            }

            await audio.loadAsync({ uri: url }, null, null, false)
            audio.setOnPlaybackStatusUpdate(handleUpdate)
            await audio.playAsync()
            setSelected(ID)
            setSound(audio)
        } catch (error) {
            console.log(error);
        }

    }
    const textse = [
        {
            text: 'Hi there', userID: userID
        },
        {
            text: 'Why here', userID: 'asdfjj43534'
        },
        {
            text: 'Why are we here?', userID: userID
        },
        {
            text: 'What is with this darkness?', userID: 'asdfjj43534'
        },
        {
            text: 'Woah is me', userID: userID
        },
        {
            text: 'When everything is done', userID: userID
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        },
        {
            text: 'I think I need more money. This is not it, I can not be broke forever', userID: 'asdfjj43534'
        }
    ]
    const renderItem = ({ item, index }) => {
        // console.log('item: ', item);
        return (
            <View>
                <View style={[
                    styles.contentHolder,
                    item.userID === userID ? styles.rightContent : styles.leftContent,
                    texts[index - 1]?.userID === item.userID ? { marginBottom: -5 } : null
                ]}>
                    <View style={[
                        styles.textBox,
                        item.userID === userID ? styles.rightText : styles.leftText,
                        texts[index - 1]?.userID === item.userID ? { borderRadius: 15 } : null
                    ]}>
                        {
                            item.type === 'text' ? (
                                <Text style={styles.text}>{item.text}</Text>
                            ) : item.type === 'image' ? (
                                <Image style={{ aspectRatio: 1 }} source={{ uri: item.text }} />
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {
                                        selectedAudio === item.docID ? (
                                            <TouchableOpacity onPress={() => pauseAudio(item.text, item.docID)}>
                                                <Ionicons name="pause" size={35} color="black" style={[styles.pauseicon, { marginRight: 15 }]} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => playAudio(item.text, item.docID)}>
                                                <Ionicons name="play" size={35} color="black" style={[styles.pauseicon, { marginRight: 15 }]} />
                                            </TouchableOpacity>
                                        )
                                    }


                                    {/* <View style={{ flex: 1, height: 2, backgroundColor: 'white', marginRight: 10 }}>
                                        <View style={{ width: 12, height: 12, backgroundColor: 'black', borderRadius: 6, top: -4.5, left: -6 }} />
                                    </View> */}
                                   
                                </View>
                            )
                        }

                    </View>
                    <View style={styles.timeSent}>
                        <Text style={styles.whiteText}>{item.timeSent}</Text>
                        {
                            item.userID === userID && (<>
                                <Entypo name="dot-single" color="#FFF" size={16} />
                                <Text style={styles.whiteText}>Sent</Text>
                            </>)
                        }

                    </View>
                </View>

            </View >
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={texts}
                renderItem={renderItem}

                contentContainerStyle={{ flexDirection: 'column-reverse' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 0,
        overflow: 'hidden',

    },
    contentHolder: {
        width: 280,
        marginVertical: 10
    },
    textBox: {
        padding: 10,
        width: 280,
        // margin: 10
    },
    rightContent: {
        alignSelf: 'flex-end'
    },
    leftContent: {

    },
    text: {
        color: '#EBEBEB',
        fontSize: 15
    },
    rightText: {
        borderRadius: 15,
        borderBottomRightRadius: 0,
        backgroundColor: '#3F5973',
    },
    leftText: {
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        backgroundColor: '#1EA0E5'
    },
    timeSent: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    whiteText: {
        color: "#E4E4E4",
        fontSize: 12
    }
})