import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'


export default function HomeScreen() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0);
    const [books, setBooks] = useState(['The Secret', 'The Are of War'])

    const addBook = (title) => {
        setBooks(books => {
            return [...books, title.trim()]
        })
    }
    const clearState = () => {
        setName('');
        setAge(0);
        setBooks(['The Secret', 'The Are of War'])
    }
    const removeBook = (index) => {
        if(books[index]) {
            const newBooks = [...books];
            newBooks.splice(index, 1)
            setBooks(newBooks)
        }
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
        {
            books.map(item => {
                return( <Text>{ item }</Text>)
            })
        }
        <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onChange={(ev) => setName(ev.target.value)} />
        <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onChange={ (ev) => setAge(ev.target.value)} />
        <TextInput 
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onBlur={ (ev) => addBook(ev.target.value)} />
        <TextInput 
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            onBlur={ (ev) => removeBook(ev.target.value)} />
        <Button
            style={{
                backgroundColor: 'rgb(150, 180, 190)',
                borderRadius: 150, 
                color: '#fff',
                top: 10
            }}
            onPress={ () => { clearState()}}
            title="Clear States" />
    </View>
  )
}
