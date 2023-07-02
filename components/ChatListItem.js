import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ChatListItem({navigation, type, data, name}) {
    // console.log('data: ',data);
    // console.log(name);
    
    return (
        <View style={[styles.container, type === 'chatRequest' && { backgroundColor: '#47A37B' }]}>
            <View style={styles.img} />
            <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Chat', { type: type, data: data })}>
                <View style={styles.rightContent}>
                    <View style={styles.topText}>
                        <Text style={styles.contactName}>{ data.name || data.id }</Text>
                        <Text style={styles.time}>{ data.dateSent }</Text>
                    </View>
                    <View style={styles.bottomText}>
                        <Text numberOfLines={1} style={styles.msg}>{ data.message || data.lastMessage?.message || 'Text loading' }</Text>
                        <View style={styles.counterContainer}>
                            <Text style={styles.counter}>{ type === 'chatRequest' ? 1 : 3 }</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#FFFf'
    },
    touchable: {
        flex: 1
    },
    rightContent: {
        flex: 1,
        paddingVertical: 5,
        marginLeft: 10,
        justifyContent: 'space-evenly'
    },
    topText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contactName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E6E6E6'
    },
    time: {
        fontSize: 12,
        color: '#FFF'
    },
    bottomText: {
        flexDirection: "row",
        justifyContent: 'center'
    },
    msg: {
        color: '#CACACA',
        fontSize: 13,
        flex: 1
    },
    counterContainer: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    counter: {
        color: '#26394D',
        fontSize: 12
    }
})