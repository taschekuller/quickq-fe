import { Bell, Coins, LogOut, Store } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { Pressable, SafeAreaView } from 'react-native';
import { TamaguiProvider, Button, Input, Text, XStack, YStack, Switch, Card, Avatar, Separator, Dialog } from 'tamagui';
import { ThemedText } from '../ThemedText';

export default function App() {
  const [username, setUsername] = useState('Doğukan INCE');
  const [email, setEmail] = useState('testadres@quickq.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [credits, setCredits] = useState(148);
  const [screen, setScreen] = useState<'home' | 'store' | 'edit'>('home');
  const [phone, setPhone] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(0);


  const renderHome = () => (
    <YStack padding="$4" gap="$4">
      <Card padding="$4" backgroundColor="transparent">
        <YStack display='flex' alignItems="center" justifyContent="center" gap={"$4"}>
          <Avatar size="$6">
            <Avatar.Image src={require("../../assets/images/person1.png")} />
          </Avatar>
          <YStack style={{ alignItems: 'center' }} gap="$1">
            <Text color="white" fontSize="$6">{username}</Text>
            <Text color="gray">{email}</Text>
          </YStack>
          <Button borderRadius={'$8'} color='black' style={{ backgroundColor: "#D9F87F" }} marginLeft="center" onPress={() => setScreen('edit')}>Düzenle</Button>
        </YStack>
      </Card>

      <Card padding="$4" backgroundColor="transparent" gap={"$4"}>

        <Pressable onPress={() => setScreen('store')}>
          <XStack alignItems="center" justifyContent="space-between" height={'$4'} paddingHorizontal={'$2'}>
            <XStack gap="$4" alignItems="center">
              <Store size={24} color="white" />
              <Text color="white">Mağaza</Text>
            </XStack>
            <Text color="white">{credits}</Text>
          </XStack>
        </Pressable>

        <XStack alignItems="center" justifyContent="space-between" height={'$4'} paddingHorizontal={'$2'}>
          <XStack gap="$4" alignItems="center">
            <Bell size={24} color="white" />
            <Text color="white">Bildirimler</Text>
          </XStack>
          <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled}>
            <Switch.Thumb backgroundColor={notificationsEnabled ? "#D9F87F" : "white"} />
          </Switch>
        </XStack>

        <XStack alignItems="center" justifyContent="space-between" height={'$4'} paddingHorizontal={'$2'} >
          <XStack gap="$4" alignItems="center">
            <LogOut size={24} color="white" />
            <Text color="white">Çıkış Yap</Text>
          </XStack>
        </XStack>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button color="red" variant="outlined">Hesabımı Sil</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content backgroundColor="#1E1E1E" padding="$8">
              <YStack gap="$4">
                <Text color="white" fontSize={'$8'} fontWeight="bold">Hesabı Sil</Text>
                <Text color="gray" fontSize={'$4'} marginVertical="$2">
                  Bu işlem kalıcı olarak hesabınızı <ThemedText style={{ fontSize: 14 }} lightColor="red" darkColor='red'>silecektir ve işlem geri alınamaz</ThemedText>. Hesabınızı silmek istiyor musunuz?
                </Text>
                <XStack justifyContent="space-between">
                  <Button theme="red" color="white" onPress={() => console.log('Account deleted')}>Hesabı Sil</Button>
                  <Dialog.Close asChild>
                    <Button color="white">Vazgeç</Button>
                  </Dialog.Close>
                </XStack>

              </YStack>

            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

      </Card>
    </YStack>
  );

  const renderEditProfile = () => (
    <YStack padding="$4" justifyContent='space-between' flex={1}>
      <YStack gap="$4">
        <Avatar size="$6" alignSelf="center">
          <Avatar.Image src={require("../../assets/images/person1.png")} />
        </Avatar>
        <Text color="white" alignSelf="center" marginBottom="$4">{email}</Text>
        <Input value={username} onChangeText={setUsername} placeholder="Ad Soyad" />
        <Input value={email} onChangeText={setEmail} placeholder="E-posta Adresiniz" marginVertical="$2" />
        <Input value={phone} onChangeText={setPhone} placeholder="Telefon Numaranız" />
      </YStack>
      <YStack marginTop="$4" gap="$2" justifyContent='center' alignItems='center' paddingBottom={"$4"}>

        <Button width={'$16'} borderRadius={'$8'} height={'$5'} backgroundColor='#D9F87F' color='black' marginTop="$3" onPress={() => setScreen('home')}>Profili Güncelle</Button>
      </YStack>
    </YStack>
  );

  const renderStore = () => {
    const offers = [
      { credit: 100, price: 10 },
      { credit: 50, price: 6 },
      { credit: 200, price: 19 },
      { credit: 400, price: 37 },
    ];


    return (
      <YStack padding="$4" marginTop={'$8'} flex={1} background='transparent'>
        <XStack alignItems="center" gap="$2">
          <Coins size={24} color="white" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Mağaza
          </Text>
        </XStack>

        <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" marginTop="$6">
          {offers.map((offer, index) => {
            const isSelected = index === selectedOffer;
            return (
              <Pressable key={index} onPress={() => setSelectedOffer(index)} style={{ width: '48%' }}>
                <Card
                  backgroundColor="#2A2A2A"
                  padding="$4"
                  borderRadius="$4"
                  borderColor={isSelected ? "#E4FF5E" : "transparent"}
                  borderWidth={2}
                  elevation={isSelected ? "$4" : "$0"}
                >
                  <YStack alignItems="center" space="$2">
                    <Coins size={32} color="orange" />
                    <Text color="white" fontSize="$5" fontWeight="700">
                      {offer.credit} Kredi
                    </Text>
                    <Text color={isSelected ? "#E4FF5E" : "white"} fontSize="$4" fontWeight="600">
                      ₺ {offer.price}
                    </Text>
                    <Text color="gray" fontWeight="600">
                      Size <Text color="white" fontWeight="700">Özel</Text> Teklif
                    </Text>
                  </YStack>
                </Card>
              </Pressable>
            );
          })}
        </XStack>

        <Button
          marginTop="$6"
          borderRadius={9999}
          backgroundColor="#E4FF5E"
          color="black"
          fontWeight="700"
          onPress={() => setScreen('home')}
          alignSelf="center"
          width="90%"
          height={56}
        >
          Satın Al
        </Button>
      </YStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TamaguiProvider>
        {screen === 'home' && renderHome()}
        {screen === 'edit' && renderEditProfile()}
        {screen === 'store' && renderStore()}
      </TamaguiProvider>
    </SafeAreaView>
  );
}