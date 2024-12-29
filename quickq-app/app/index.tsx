import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'

export default function index() {
    const [loggedInUser, setloggedInUser] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (loggedInUser) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    },[])

    return (
        <>
            <Redirect href={!loggedInUser ? '/(routes)/Onboarding' : '/(tabs)'} />
        </>
    )
}