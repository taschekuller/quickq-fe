import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Card, Text, XStack, YStack, Avatar, Button, Input, ScrollView } from 'tamagui';
import {
  MessageCircleMore, Bookmark, SlidersHorizontal, ChevronLeft, BookmarkCheck

} from '@tamagui/lucide-icons';

interface QuestionDetailProps {
  question: {
    id: number;
    category: string;
    user: string;
    topic: string;
    createdAt: string;
    tags: string[];
  }
  onBackPress: () => void;
}

const questions = [
  {
    id: 1,
    category: 'Elektrik Devreleri',
    user: 'Doğukan',
    topic: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz...',
    createdAt: '2h',
    tags: ['elektrik', 'ampul', 'parlaklık'],
  },
  {
    id: 2,
    category: 'Hücre Bölünmesi',
    user: 'Selin',
    topic: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz...',
    createdAt: '3h',
    tags: ['hücre', 'bölünme', 'mitoz'],
  },
  {
    id: 3,
    category: 'Cümlede Anlam',
    user: 'Memoş',
    topic: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz...',
    createdAt: '4h',
    tags: ['cümle'],
  },
  {
    id: 4,
    category: 'Homojen Karışım',
    user: 'Betül',
    topic: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz...',
    createdAt: '5h',
    tags: ['homojen', 'karışım'],
  },
];

const answers = [
  { id: 1, user: 'Selin SINDIRAN', timeAgo: '7h', content: 'Paralel bağlı devrelerde...' },
  { id: 2, user: 'Betül KÜÇÜKKARADUMAN', timeAgo: '5h', content: 'Seri bağlı devreler için...' },
  { id: 3, user: 'Doğukan İNCE', timeAgo: '3h', content: 'Paralel bağlı devrelerde...' },
];

const QuestionDetail = ({ question, onBackPress }: QuestionDetailProps) => {
  return (
    <View>
      <YStack >
        {/* Back button */}
        <Button
          icon={ChevronLeft}
          circular
          mb="$4"
          onPress={onBackPress}
        />
      </YStack>

      <YStack f={1} p="$4" backgroundColor="$background">


        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Question Section */}
          <YStack space="$3" mb="$6">
            <Text fontSize="$7" fontWeight="bold">{question.category}</Text>

            <XStack ai="center" space="$2">
              <Avatar circular size="$3" bg="$blue10">
                <Avatar.Fallback style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Text>{question.user.charAt(0)}</Text>
                </Avatar.Fallback>
              </Avatar>
              <Text fontSize="$4">{question.user}</Text>
              <Text fontSize="$2" color="$color9">{question.createdAt}</Text>
            </XStack>

            <Text fontSize="$4" color="$color11">
              {question.topic}
            </Text>

            <XStack gap={4} flexWrap="wrap">
              {question.tags.map((tag, index) => (
                <Button key={index} size="$2" theme="blue" alignSelf="flex-start">
                  <Text fontSize="$3">#{tag}</Text>
                </Button>
              ))}
            </XStack>
          </YStack>

          {/* Answers Section */}
          <YStack space="$5">
            {answers.map((answer) => (
              <YStack key={answer.id} space="$2" borderBottomWidth={1} borderColor="$color5" pb="$4">
                <XStack ai="center" space="$2">
                  <Avatar circular size="$2" bg="$pink10">
                    <Avatar.Fallback style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Text>{answer.user.charAt(0)}</Text>
                    </Avatar.Fallback>
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
    </View >
  );
};

interface Question {
  id: number;
  category: string;
  user: string;
  topic: string;
  createdAt: string;
  tags: string[];
}

export default function MainForum() {
  const [questionDetail, setQuestionDetail] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null); // TODO : type
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);

  const handleQuestionPress = (id: number) => {
    const foundQuestion = questions.find(q => q.id === id);
    if (foundQuestion) {
      setSelectedQuestion(foundQuestion);
      setQuestionDetail(true);
    }
  };

  const handleBackPress = () => {
    setQuestionDetail(false);
    setSelectedQuestion(null);
  };

  const toggleBookmark = (question: Question, event: any) => {
    event.stopPropagation(); // Prevent triggering the parent onPress

    setBookmarkedQuestions(prev => {
      const isAlreadyBookmarked = prev.some(q => q.id === question.id);

      if (isAlreadyBookmarked) {
        // Remove from bookmarks
        return prev.filter(q => q.id !== question.id);
      } else {
        // Add to bookmarks
        return [...prev, question];
      }
    });
  };

  const isBookmarked = (id: number) => {
    return bookmarkedQuestions.some(q => q.id === id);
  };

  return (
    <YStack f={1} px="$2">
      {questionDetail && selectedQuestion ? (
        <QuestionDetail question={selectedQuestion} onBackPress={handleBackPress} />
      ) : (
        <View>
          {/* Search bar */}
          <XStack ai="center" jc="space-between" mb="$4">
            <Input
              placeholder="Soru ara..."
              width="85%"
            />
            <Button size="$3" icon={SlidersHorizontal} circular />
          </XStack>

          {/* Scrollable forum posts */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack space="$4">
              {questions.map((q) => (
                <Pressable key={q.id} onPress={() => handleQuestionPress(q.id)}>
                  <Card padding="$4" elevate bordered>
                    <YStack space={2}>
                      <YStack space="$1" style={styles.questionHeader}>
                        <Text fontWeight="bold" fontSize="$6">{q.category}</Text>
                        <Text color="$color9" fontSize="$4">{q.createdAt}</Text>
                      </YStack>
                      <XStack ai="center" mt={5} gap={5}>
                        <Avatar circular size="$2" bg="$purple10">
                          <Avatar.Fallback style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{q.user.charAt(0)}</Text>
                          </Avatar.Fallback>
                        </Avatar>
                        <Text fontSize="$3">{q.user}</Text>
                      </XStack>
                      <Text numberOfLines={2} mt={2} color="$color9">
                        {q.topic}
                      </Text>
                      <XStack mt={5} gap={5} justifyContent="space-between" alignItems="center">
                        <XStack>
                          <Button circular scaleIcon={1.5} icon={MessageCircleMore} onPress={() => handleQuestionPress(q.id)} />
                          <Button
                            circular
                            scaleIcon={1.5}
                            icon={isBookmarked(q.id) ? BookmarkCheck : Bookmark}
                            color={isBookmarked(q.id) ? '#D9F87F' : 'white'}
                            onPress={(e) => toggleBookmark(q, e)}
                          />
                        </XStack>
                        <XStack gap={2}>
                          {q.tags.map((tag, index) => (
                            <Button radiused key={index} size="$1" theme="blue" mt={6} alignSelf="flex-start">
                              <Text>
                                {`#${tag}`}
                              </Text>
                            </Button>
                          ))}
                        </XStack>
                      </XStack>
                    </YStack>
                  </Card>
                </Pressable>
              ))}
            </YStack>
          </ScrollView>
        </View>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  questionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
