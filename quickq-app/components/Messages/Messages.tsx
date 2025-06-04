import { useState } from 'react'
import { View, FlatList, Image, SafeAreaView, Keyboard, KeyboardAvoidingView, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Card, Text, XStack, YStack, Avatar, Input, AlertDialog } from 'tamagui'
import { ArrowLeft, Heart, Search, X, CheckCircle, Camera, ArrowRight, Image as ImageIcon } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import { Swipeable } from 'react-native-gesture-handler'

interface Message {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount?: number
  avatar: string
  read?: boolean
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
    avatar: 'https://avatar.iran.liara.run/public/1',
    read: false,
  },
  {
    id: '2',
    name: 'Doğukan İnce',
    lastMessage: 'Evet, benzer bir yöntem olarak...',
    time: '16:34',
    avatar: 'https://avatar.iran.liara.run/public/2',
    read: true,
  },
  {
    id: '3',
    name: 'Memoş',
    lastMessage: 'Rica ederim, başarılar dilerim.',
    time: 'Yesterday',
    avatar: 'https://avatar.iran.liara.run/public/3',
    read: true,
  },
  {
    id: '4',
    name: 'Betül Küçükkaraduman',
    lastMessage: 'Merhaba, fizik soruyla ilgili...',
    time: '2d',
    avatar: 'https://avatar.iran.liara.run/public/4',
    read: true,
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
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(chatData)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [messagesList, setMessagesList] = useState<Message[]>(messagesData)
  const [checkSelected, setCheckSelected] = useState(false)
  const [heartSelected, setHeartSelected] = useState(false)

  // Mark message as read
  const markAsRead = (id: string) => {
    setMessagesList(
      messagesList.map(message =>
        message.id === id ? { ...message, read: true, unreadCount: undefined } : message
      )
    );
  };

  // Mark message as unread
  const markAsUnread = (id: string) => {
    setMessagesList(
      messagesList.map(message =>
        message.id === id ? { ...message, read: false, unreadCount: message.unreadCount || 1 } : message
      )
    );
  };

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        style={[styles.swipeAction, { backgroundColor: '#4CAF50', height: 70, borderRadius: 10 }]}
        onPress={() => markAsRead(id)}
      >
        <Text style={styles.swipeActionText}>Okundu</Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (id: string) => {
    return (
      <TouchableOpacity
        style={[styles.swipeAction, { backgroundColor: '#2196F3', height: 70, borderRadius: 10 }]}
        onPress={() => markAsUnread(id)}
      >
        <Text style={styles.swipeActionText}>Okunmadı</Text>
      </TouchableOpacity>
    );
  };

  // Filter messages by sender name
  const filteredMessages = searchText.trim() === ''
    ? messagesList
    : messagesList.filter(message =>
      message.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage: ChatMessage = {
      id: (messages.length + 1).toString(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleImageSelection = async (source: 'camera' | 'gallery') => {
    try {
      let result;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3] as [number, number],
        quality: 0.7,
      };

      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'We need camera permissions to take a photo');
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'We need library permissions to select photos');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        const newMessage: ChatMessage = {
          id: (messages.length + 1).toString(),
          sender: 'me',
          text: '',
          time: new Date().toLocaleTimeString().slice(0, 5),
          image: imageUri,
        };

        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while selecting an image');
    }

    setShowImageOptions(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {selectedChat ? (
          <YStack f={1} p="$3">
            <XStack ai="center" jc="space-between" mb="$4">
              <Button onPress={() => setSelectedChat(null)} icon={ArrowLeft} circular />
              <Text fontWeight="bold" fontSize="$5">{selectedChat.name}</Text>
              <XStack>
                <Button
                  icon={CheckCircle}
                  variant="outlined"
                  circular
                  scaleIcon={1.5}
                  color={checkSelected ? "#D9F87F" : undefined}
                  onPress={() => setCheckSelected(!checkSelected)}
                />
                <Button
                  icon={Heart}
                  variant="outlined"
                  circular
                  scaleIcon={1.55}
                  color={heartSelected ? "#D9F87F" : undefined}
                  onPress={() => setHeartSelected(!heartSelected)}
                />
              </XStack>
            </XStack>

            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
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
              backgroundColor="#000"
            >
              <Input
                flex={1}
                placeholder="Mesajınızı yazın..."
                value={messageText}
                onChangeText={setMessageText}
              />
              <Button
                circular
                chromeless
                icon={Camera}
                scaleIcon={1.5}
                onPress={() => setShowImageOptions(true)}
              />
              <Button
                circular
                bg="#D9F87F"
                icon={ArrowRight}
                color="#1e1e1e"
                scaleIcon={1.5}
                onPress={handleSendMessage}
              />
            </XStack>

            <AlertDialog
              open={showImageOptions}
              onOpenChange={setShowImageOptions}
            >
              <AlertDialog.Portal>
                <AlertDialog.Overlay />
                <AlertDialog.Content>
                  <YStack space="$3" p="$3">
                    <Text fontWeight="bold" fontSize="$5" textAlign="center">Select Image Source</Text>
                    <Button
                      size="$4"
                      icon={Camera}
                      theme="green"
                      onPress={() => handleImageSelection('camera')}
                    >
                      Fotoğraf Çek
                    </Button>
                    <Button
                      size="$4"
                      icon={ImageIcon}
                      theme="blue"
                      onPress={() => handleImageSelection('gallery')}
                    >
                      Galeriye Git
                    </Button>
                    <Button
                      size="$4"
                      theme="red"
                      onPress={() => setShowImageOptions(false)}
                    >
                      İptal Et
                    </Button>
                  </YStack>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog>
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
                      onPress={() => {
                        setSearchActive(false);
                        setSearchText('');
                      }} />
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
                      value={searchText}
                      onChangeText={setSearchText}
                      onBlur={() => {
                        if (searchText.trim() === '') {
                          setSearchActive(false);
                        }
                      }}
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
              data={filteredMessages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <Swipeable
                  renderRightActions={() => renderRightActions(item.id)}
                  renderLeftActions={() => renderLeftActions(item.id)}
                >
                  <Card
                    elevate
                    size="$5"
                    height={70}
                    display='flex'
                    justifyContent='center'
                    mb="$3"
                    pressStyle={{ scale: 0.97 }}
                    onPress={() => {
                      setSelectedChat(item);
                      markAsRead(item.id);
                    }}
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
                </Swipeable>
              )}
            />
          </YStack>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  swipeActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
