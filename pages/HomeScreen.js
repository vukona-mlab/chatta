import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { View, TextInput } from 'react-native'


export default function HomeScreen() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0);
    const [books, setBooks] = useState(['The Secret', 'The Are of War'])

    const addBook = (title) => {
        setBooks(books => {
            return [...books, title.trim()]
        })
    }
    useEffect(() => {
        console.log(name);
    }, [name])
    useEffect(() => {
        console.log(age);
    }, [age])
    useEffect(() => {
        console.log(books);
    }, [books])
  return (
    <View>
        <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onChange={(ev) => setName(ev.target.value)} />
        <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onChange={ (ev) => setAge(ev.target.value)} />
        <TextInput 
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onBlur={ (ev) => addBook(ev.target.value)} />
    </View>
  )
}
