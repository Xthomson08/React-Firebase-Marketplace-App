import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import Home from '../screens/Home';
import Auth from './auth';

export default AuthContainer = () => { 
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChange(user) {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChange)
        return subscriber
    }, [])
    
    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <Home /> : <Auth />}
        </NavigationContainer>
    )
}