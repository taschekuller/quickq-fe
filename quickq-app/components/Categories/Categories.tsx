import { useState } from 'react'
import { XStack, YStack, Text, Button, Image, AnimatePresence } from 'tamagui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

type Category = {
  label: string
  icon: string
}

const categories: Category[] = [
  { label: 'Edebiyat', icon: require('@/assets/icons/literature.png') },
  { label: 'Tarih', icon: require('@/assets/icons/history.png') },
  { label: 'Felsefe', icon: require('@/assets/icons/philosophy.png') },
  { label: 'Coğrafya', icon: require('@/assets/icons/geography.png') },
  { label: 'Matematik', icon: require('@/assets/icons/math.png') },
  { label: 'Kimya', icon: require('@/assets/icons/chemistry.png') },
  { label: 'Biyoloji', icon: require('@/assets/icons/biology.png') },
  { label: 'Fizik', icon: require('@/assets/icons/physics.png') },
  { label: 'Geometri', icon: require('@/assets/icons/geometry.png') },
  { label: 'İngilizce', icon: require('@/assets/icons/english.png') },
]

export const Categories = () => {
  const [expanded, setExpanded] = useState(false)

  const visibleCategories = expanded ? categories : categories.slice(0, 5)

  return (
    <YStack space="$3" padding="$4" borderRadius="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" space="$2">
          <Text fontSize="$4" color="white">Kategoriler</Text>
        </XStack>
        <Button
          unstyled
          color={'$background'}
          scaleIcon={1.5}
          onPress={() => setExpanded(prev => !prev)}
          icon={expanded ? ChevronUp : ChevronDown}
        />
      </XStack>

      <AnimatePresence>
        <XStack
          flexWrap="wrap"
          justifyContent="space-between"
          animation="quick"
          enterStyle={{ opacity: 0, scale: 0.95 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
        >
          {visibleCategories.map((category, idx) => (
            <YStack
              key={idx}
              width="18%"
              height={60}
              alignItems="center"
              justifyContent="center"
              padding="$2"
              marginVertical="$2"
              borderWidth={1}
              borderRadius="$4"
            >
              <Image src={category.icon} width={24} height={24} />
              <Text fontSize="$1" color="white" textAlign="center">{category.label}</Text>
            </YStack>
          ))}
        </XStack>
      </AnimatePresence>
    </YStack>
  )
}
