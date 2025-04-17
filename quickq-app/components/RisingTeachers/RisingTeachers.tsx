import { View, Text, Image } from 'tamagui'
import { Button, Card, H2, Paragraph, XStack, YStack } from 'tamagui'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import PagerView from 'react-native-pager-view'
import { useWindowDimensions } from 'react-native'


const mockTeacherNoahImage = require("../../assets/images/Teachers/TeacherNoah.png");
const mockTeacherLianneImage = require("../../assets/images/Teachers/TeacherLianne.png");
const mockTeacherImage = require("../../assets/images/Teachers/TeacherHan.png");

const teachers = [
  {
    id: 1,
    name: 'Noah Keck',
    lesson: 'fzk, mat',
    image: mockTeacherNoahImage,
  },
  {
    id: 2,
    name: 'Lianne Hines',
    lesson: 'kim, biyo',
    image: mockTeacherLianneImage,
  },
  {
    id: 3,
    name: 'Han Noguchi',
    lesson: 'trh, tsf',
    image: mockTeacherImage,
  },
]

export function RisingTeacher() {
  return (
    // <PagerView style={{ height: 280 }} initialPage={0}>
    <View paddingHorizontal={16}>
      <View>
        <XStack>
          {/* Assuming $gray10 contrasts with your page background */}
          <Text fontSize={16} color="white">
            ✨ Parlayan Öğretmenler
          </Text>
        </XStack>
      </View>
      {/* Consider using Tamagui's spacing props like gap instead of padding on the container */}
      <XStack flexWrap="wrap" justifyContent="space-between" paddingVertical="$2" gap="$3">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </XStack>
    </View>
    // </PagerView>
  )
}

function TeacherCard({ teacher }: any) {
  const [liked, setLiked] = useState(false);
  const [pressed, setPressed] = useState(false);

  const { width } = useWindowDimensions();

  return (
    <Card
      elevate
      padding="$2"
      width={width / 3 - 20}
      backgroundColor="#1e1e1e"
      borderRadius="$4"
    >

      <YStack alignItems="center" gap="$2"  >
        <XStack jc={"flex-end"} width={"100%"}>
          <Button
            circular
            unstyled
            backgroundColor="transparent"
            onPress={() => setLiked(!liked)}
            icon={
              <AntDesign
                name={liked ? 'heart' : 'hearto'}
                size={16}
                color="white"
              />
            }
          />
        </XStack>
        <Image
          source={teacher.image}
          width={72}
          height={72}
          borderRadius={36}
        />
        <XStack mt="$2" ai="center" jc="center" gap="$2">
          <Text fontSize={14} color="white" textAlign="center">
            {teacher.name}
          </Text>

        </XStack>

        <Paragraph color="$gray10" fontSize={12} textAlign="center">
          {teacher.lesson}
        </Paragraph>

        <Button
          backgroundColor={"#D9F87F"}
          borderWidth={1}
          borderRadius={16}
          borderColor={"#D9F87F"}
          pressStyle={{ backgroundColor: '#D9F87F', borderWidth: 0.5, borderRadius: 8 }}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          size="$3"
          width="100%"
          padding={4}
        >
          <Text color="#1e1e1e" fontSize={12} fontWeight="bold">
            Mesaj Gönder
          </Text>
        </Button>
      </YStack>
    </Card>
  )
}
