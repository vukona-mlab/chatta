import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { useEffect } from 'react';

export default function ChatComponent({ texts }) {
    const userID = 'veeINdf5345'
    // console.log('texts: ', texts);
    // console.log('in the chat com');
    useEffect(() => {
        console.log('hey there');
    }, [])
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
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                    <View style={styles.timeSent}>
                        <Text style={styles.whiteText}>{ item.timeSent }</Text>
                        {
                            item.userID === userID && (<>
                                <Entypo name="dot-single" color="#FFF" size={16} />
                                <Text style={styles.whiteText}>Sent</Text>
                            </>)
                        }

                    </View>
                </View>

            </View>
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