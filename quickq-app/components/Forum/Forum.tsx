import { Scroll } from '@tamagui/lucide-icons'
import React from 'react'
import { View, Text } from 'react-native'
import { Main, ScrollView } from 'tamagui'
import Header from '../Header/Header'
import MainForum from './MainForum'

export default function Forum() {
  return (
    <ScrollView flex={1} >
      <View>
        <Header />
      </View>
      <View>
        <MainForum />
      </View>
    </ScrollView>
  )
}
