import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Header from '@/components/Header/Header';
import { ScrollView } from 'tamagui';
import WeeklySummary from '../WeeklySummary/WeeklySummary';
import { GreetingHeader } from '../Header/GreetingHeader';
import { RisingTeacher } from '../RisingTeachers/RisingTeachers';
import { Categories } from '../Categories/Categories';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
      </View>
      <View>
        <GreetingHeader name="Selin" />
      </View>
      <View>
        <WeeklySummary />
      </View>
      <View>
        <RisingTeacher />
      </View>
      <View>
        <Categories />
      </View>
    </ScrollView>
  )
}
