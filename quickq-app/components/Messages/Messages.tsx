import { useState } from 'react'
import { View, FlatList, Image, SafeAreaView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button, Card, Text, XStack, YStack, Avatar, Input } from 'tamagui'
import { ArrowLeft, Heart, Search, X, CheckCircle, Camera, ArrowRight } from '@tamagui/lucide-icons'
interface Message {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount?: number
  avatar: string
}

interface ChatMessage {
  id: string
  sender: 'me' | 'other'
  text: string
  time: string
  image?: string
}

const messagesData: Message[] = [
  {
    id: '1',
    name: 'Selin Sındıran',
    lastMessage: 'Görseldeki işlem adımlarını...',
    time: '18:31',
    unreadCount: 5,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Doğukan İnce',
    lastMessage: 'Evet, benzer bir yöntem olarak...',
    time: '16:34',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Memoş',
    lastMessage: 'Rica ederim, başarılar dilerim.',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Betül Küçükkaraduman',
    lastMessage: 'Merhaba, fizik soruyla ilgili...',
    time: '2d',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
]

const chatData: ChatMessage[] = [
  {
    id: '1',
    sender: 'other',
    text: 'Merhaba, ekteki adımları takip ederek türev işlemini gerçekleştirebilirsin.',
    time: '16:04',
  },
  {
    id: '2',
    sender: 'other',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    text: '',
    time: '16:04',
  },
  {
    id: '3',
    sender: 'me',
    text: 'Cevabınız için teşekkür ederim.',
    time: '16:04',
  },
]

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Message | null>(null)
  const [searchActive, setSearchActive] = useState(false)
  const [searchText, setSearchText] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {selectedChat ? (
          <YStack f={1} p="$3">
            <XStack ai="center" jc="space-between" mb="$4">
              <Button onPress={() => setSelectedChat(null)} icon={ArrowLeft} circular />
              <Text fontWeight="bold" fontSize="$5">{selectedChat.name}</Text>
              <XStack>
                <Button icon={CheckCircle} variant="outlined" circular scaleIcon={1.5} />
                <Button icon={Heart} variant="outlined" circular scaleIcon={1.55} />
              </XStack>
            </XStack>

            <FlatList
              data={chatData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }} // Add more bottom padding
              renderItem={({ item }) => (
                <YStack mb="$3" ai={item.sender === 'me' ? 'flex-end' : 'flex-start'}>
                  {item.image ? (
                    <Card elevate size="$5" w={250} h={150} bg="$backgroundPress">
                      <Card.Background>
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        />
                      </Card.Background>
                    </Card>
                  ) : (
                    <Card elevate size="$4" bg={item.sender === 'me' ? '$blue10' : '$gray5'}>
                      <YStack px="$3" py="$2">
                        <Text fontSize="$4" pb="$2" fontWeight="bold" color={item.sender === 'me' ? 'white' : '#e1e1e1'}>
                          {item.sender === 'me' ? 'Ben' : selectedChat?.name}
                        </Text>
                        <Text color={item.sender === 'me' ? 'white' : '#e1e1e1'}>{item.text}</Text>
                        <Text fontSize="$1" color={item.sender === 'me' ? '#e1e1e1' : "$gray11"} mt="$1" textAlign="right">
                          {item.time}
                        </Text>
                      </YStack>
                    </Card>
                  )}
                </YStack>
              )}
            />

            <XStack
              p="$3"
              position="absolute"
              bottom={10}
              left={10}
              right={10}
            >
              <Input flex={1} placeholder="Mesajınızı yazın..." />
              <Button circular chromeless icon={Camera} scaleIcon={1.5} />
              <Button circular bg="#D9F87F" icon={ArrowRight} color="#1e1e1e" scaleIcon={1.5} />
            </XStack>
          </YStack>

        ) : (
          <YStack f={1} p="$3">
            <YStack mb="$4">
              <XStack justifyContent='space-between' alignItems='center'>
                {!(searchActive) ? (
                  <Text fontSize="$4" style={{
                    backgroundColor: "#D9F87F",
                    borderRadius: 8,
                    padding: 10,
                    color: "#1e1e1e",
                  }}>
                    Mesajlar
                  </Text>
                ) : ""}
                {searchActive ? (
                  <YStack display='flex' flexDirection='row' alignItems='center'>
                    <Button
                      icon={<X size={20} color="#666" />}
                      variant="outlined"
                      circular
                      onPress={() => setSearchActive(false)} />
                    <Input
                      placeholder="Mesaj ara..."
                      width={"85%"}
                      flex={1}
                      borderRadius={8}
                      paddingHorizontal={16}
                      paddingVertical={8}
                      fontSize="$4"
                      fontWeight="500"
                      color="$gray8"
                      placeholderTextColor="$gray6"
                      autoFocus
                      onBlur={() => setSearchActive(false)}
                    />
                  </YStack>
                ) : (
                  <Button
                    icon={<Search size={20} color="#666" />}
                    variant="outlined"
                    circular
                    onPress={() => setSearchActive(true)}
                  />
                )}
              </XStack>
            </YStack>
            <FlatList
              data={messagesData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <Card
                  elevate
                  size="$5"
                  height={70}
                  display='flex'
                  justifyContent='center'
                  mb="$3"
                  pressStyle={{ scale: 0.97 }}
                  onPress={() => setSelectedChat(item)}
                  bg={item.unreadCount ? '$green4' : '$gray2'}
                >
                  <XStack ai="center" space="$3" p="$2">
                    <Avatar circular size="$4">
                      <Avatar.Image source={{ uri: item.avatar }} />
                    </Avatar>
                    <YStack f={1}>
                      <XStack jc="space-between" ai="center">
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="$2" color={item.unreadCount ? 'white' : '$gray8'}>
                          {item.time}
                        </Text>
                      </XStack>
                      <XStack jc="space-between" ai="center">
                        <Text color={item.unreadCount ? "white" : '$gray8'} numberOfLines={1}>
                          {item.lastMessage}
                        </Text>
                        {item.unreadCount && (
                          <Card elevate size="$2" bc="$green8" br="$10" ai="center" jc="center" style={{ width: 16, height: 16 }}>
                            <Text fontSize="$1" color="white">
                              {item.unreadCount}
                            </Text>
                          </Card>
                        )}
                      </XStack>
                    </YStack>

                  </XStack>
                </Card>
              )}
            />
          </YStack>
        )
        }
      </KeyboardAvoidingView>
    </SafeAreaView >
  )
}
