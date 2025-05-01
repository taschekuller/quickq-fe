import { YStack, XStack, Text, Avatar, Button, ScrollView } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';

interface QuestionDetailProps {
  id: number;
}

export default function QuestionDetail(id: QuestionDetailProps) {

  const question = {
    id: 1,
    category: 'Elektrik Devreleri',
    user: 'Doğukan İNCE',
    timeAgo: '8h',
    content: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz. Pillerin sayısını mı artırmalıyız yoksa ampulleri seri yerine paralel mi bağlamalıyız? Hangisi daha etkili olur ve neden?',
  };

  const answers = [
    { id: 1, user: 'Selin SINDIRAN', timeAgo: '7h', content: 'Paralel bağlı devrelerde...' },
    { id: 2, user: 'Betül KÜÇÜKKARADUMAN', timeAgo: '5h', content: 'Seri bağlı devreler için...' },
  ];

  return (
    <YStack f={1} p="$4" backgroundColor="$background">
      {/* Back button */}
      <Button
        icon={ChevronLeft}
        circular
        mb="$4"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Question Section */}
        <YStack space="$3" mb="$6">
          <Text fontSize="$7" fontWeight="bold">{question.category}</Text>

          <XStack ai="center" space="$2">
            <Avatar circular size="$3" bg="$blue10">
              <Avatar.Fallback>{question.user.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <Text fontSize="$4">{question.user}</Text>
            <Text fontSize="$2" color="$color9">{question.timeAgo}</Text>
          </XStack>

          <Text fontSize="$4" color="$color11">
            {question.content}
          </Text>

          <Button size="$2" theme="blue" alignSelf="flex-start">
            <Text fontSize="$3">#Elektrik</Text>
          </Button>
        </YStack>

        {/* Answers Section */}
        <YStack space="$5">
          {answers.map((answer) => (
            <YStack key={answer.id} space="$2" borderBottomWidth={1} borderColor="$color5" pb="$4">
              <XStack ai="center" space="$2">
                <Avatar circular size="$2" bg="$pink10">
                  <Avatar.Fallback>{answer.user.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <Text fontSize="$3">{answer.user}</Text>
                <Text fontSize="$2" color="$color9">{answer.timeAgo}</Text>
              </XStack>

              <Text fontSize="$4" color="$color10">
                {answer.content}
              </Text>
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
