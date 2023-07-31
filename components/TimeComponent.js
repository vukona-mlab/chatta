import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const TimeComponent = ({ milliseconds }) => {
    const [time, setTime] = useState(0)
    useEffect(() => {
        convertTime()
    }, [milliseconds])
    const convertTime = () => {

        console.log(milliseconds);
        const time = {
            hours: Math.floor((milliseconds / (60 * 60))),
            minutes: getDouble(Math.floor((milliseconds / (60)) % 60)),
            seconds: getDouble(Math.floor((milliseconds) % 60))
        }
        setTime(time)
    }
    const getDouble = (time) => {
        return time < 10 ? '0' + time : '' + time
    }
    return (
        <View style={ styles.container }>
            {
                time.hours > 0 && (
                    <Text>{ `${ time.hours }:` }</Text>
                )
            }
            <Text>{ `${ time.minutes }:` }</Text>
            <Text>{ time.seconds }</Text>
        </View>
    )
}

export default TimeComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})