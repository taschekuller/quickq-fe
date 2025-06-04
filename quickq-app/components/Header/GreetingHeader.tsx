import { View, Text, XStack, Input } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export function GreetingHeader({ name }: { name: string }) {
  return (
    <XStack
      jc="space-between"
      ai="center"
      px="$4"
      py="$2"
    >
      <XStack ai="center" gap="$2">
        <Text fontSize="$5">
          👋
        </Text>
        <Text fontSize="$5" color="#e1e1e1">
          Merhaba, <Text style={{ fontWeight: 700 }} color="#e1e1e1">{name}</Text>
        </Text>
      </XStack>
    </XStack>
  )
}
