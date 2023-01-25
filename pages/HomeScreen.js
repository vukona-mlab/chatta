import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import HomeComponent from '../components/HomeComponent';
import { UserContext } from '../services/userContext';


export default function HomeScreen() {
    const [name, setName] = useState('Vukona')
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

  return (
    <View>
        <UserContext.Provider value={{ name: name, changeName: setName}}>
            <HomeComponent changeName={(text) => setName(text)}/>
        </UserContext.Provider>
        
    </View>
  )
}
