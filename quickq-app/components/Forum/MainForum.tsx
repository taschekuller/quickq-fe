import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { Card, Text, XStack, YStack, Avatar, Button, Input, ScrollView, Label, Select, TextArea, Sheet, Adapt, getFontSize, FontSizeTokens, Spinner, Switch } from 'tamagui';
import {
  MessageCircleMore, Bookmark, SlidersHorizontal, ChevronLeft, BookmarkCheck,
  Plus, FileText, MessageCircleQuestion, Users, UploadCloud, Camera, Check, ChevronDown, ChevronUp,
  Send, Reply, CircleX, Filter, X
} from '@tamagui/lucide-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

interface QuestionDetailProps {
  question: Question;
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
    category: 'Homojen Karışım',
    user: 'Betül',
    topic: 'Bir elektrik devresinde ampulün parlaklığını artırmak istiyoruz...',
    createdAt: '5h',
    tags: ['homojen', 'karışım'],
  },
] as Question[];

const answers = [
  { id: 1, user: 'Selin SINDIRAN', createdAt: '7h', content: 'Paralel bağlı devrelerde...' },
  { id: 2, user: 'Betül KÜÇÜKKARADUMAN', createdAt: '5h', content: 'Seri bağlı devreler için...' },
  { id: 3, user: 'Doğukan İNCE', createdAt: '3h', content: 'Paralel bağlı devrelerde...' },
] as Reply[];

interface Question {
  id: number;
  category: string;
  user: string;
  topic: string;
  createdAt: string;
  tags: string[];
  type?: 'question' | 'post';
  correctOption?: string;
  imageUri?: string;
  replies?: Reply[];
  lecture?: string;
  unit?: string;
  grade?: string;
}

interface Reply {
  id: number;
  content: string;
  user: string;
  createdAt: string;
  imageUri?: string;
}

const QuestionDetail = ({ question, onBackPress, onAddReply }: QuestionDetailProps & { onAddReply: (questionId: number, reply: Partial<Reply>) => void }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "$background" }}>
      <YStack f={1}>
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

            {question.imageUri && (
              <Image
                source={{ uri: question.imageUri }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 8,
                  resizeMode: 'cover',
                  marginVertical: 8
                }}
              />
            )}

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
            {question.replies && question.replies.length > 0 ? (
              question.replies.map((reply, index) => (
                <YStack key={index} space="$2" borderBottomWidth={1} borderColor="$color5" pb="$4">
                  <XStack ai="center" space="$2">
                    <Avatar circular size="$2" bg="$pink10">
                      <Avatar.Fallback style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text>{reply.user.charAt(0)}</Text>
                      </Avatar.Fallback>
                    </Avatar>
                    <Text fontSize="$3">{reply.user}</Text>
                    <Text fontSize="$2" color="$color9">{reply.createdAt}</Text>
                  </XStack>

                  <Text fontSize="$4" color="$color10">
                    {reply.content}
                  </Text>

                  {reply.imageUri && (
                    <Image
                      source={{ uri: reply.imageUri }}
                      style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 8,
                        resizeMode: 'cover',
                        marginVertical: 8
                      }}
                    />
                  )}
                </YStack>
              ))
            ) : (
              <Text color="$color9">Henüz yanıt yok. İlk yanıtı sen ver!</Text>
            )}
          </YStack>

          {/* Reply Component */}
          <ReplyComponent
            questionId={question.id}
            onAddReply={onAddReply}
          />
        </ScrollView>
      </YStack>
    </View>
  );
};

const SubjectSelect = ({ value, onValueChange }: { value: string, onValueChange: (val: string) => void }) => {
  const subjects = [
    { label: "Matematik", value: "matematik" },
    { label: "Fizik", value: "fizik" },
    { label: "Kimya", value: "kimya" },
    { label: "Biyoloji", value: "biyoloji" },
    { label: "Türkçe", value: "turkce" }
  ];
  return (
    <Select value={value} onValueChange={onValueChange} >
      <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Ders Seçiniz" />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          minWidth={200}
        >
          <Select.Group>
            <Select.Label fontWeight={'bold'} color={'#D9F87F'}>Dersler</Select.Label>
            {React.useMemo(
              () =>
                subjects.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.label}
                      value={item.value}
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [subjects]
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

const UnitSelect = ({ value, onValueChange }: { value: string, onValueChange: (val: string) => void }) => {
  const units = [
    { label: "Ünite 1", value: "unite1" },
    { label: "Ünite 2", value: "unite2" },
    { label: "Ünite 3", value: "unite3" },
    { label: "Ünite 4", value: "unite4" }
  ];

  const [open, setOpen] = useState(false);

  return (
    <Select value={value} onValueChange={onValueChange} >
      <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Ünite Seçiniz" />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          minWidth={200}
        >
          <Select.Group>
            <Select.Label fontWeight={'bold'} color={'#D9F87F'}>Ünite</Select.Label>
            {React.useMemo(
              () =>
                units.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.label}
                      value={item.value}
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [units]
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

const GradeSelect = ({ value, onValueChange }: { value: string, onValueChange: (val: string) => void }) => {
  const grades = [
    { label: "9. Sınıf", value: "9" },
    { label: "10. Sınıf", value: "10" },
    { label: "11. Sınıf", value: "11" },
    { label: "12. Sınıf", value: "12" }
  ];

  return (
    <Select value={value} onValueChange={onValueChange} >
      <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Sınıf Seçiniz" />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          minWidth={200}
        >
          <Select.Group>
            <Select.Label fontWeight={'bold'} color={'#D9F87F'}>Sınıf</Select.Label>
            {React.useMemo(
              () =>
                grades.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.label}
                      value={item.value}
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [grades]
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

const ImagePickerComponent = ({ onImageSelected }: { onImageSelected: (uri: string) => void }) => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const manipResult = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: SaveFormat.JPEG }
        );
        onImageSelected(manipResult.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    setLoading(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const manipResult = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: SaveFormat.JPEG }
        );
        onImageSelected(manipResult.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack>
      <Label mb="$2">Görsel Ekle</Label>
      <XStack space="$4">
        <Button
          icon={UploadCloud}
          onPress={pickImage}
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Galeriden Seç'}
        </Button>
        <Button
          icon={Camera}
          onPress={takePhoto}
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Fotoğraf Çek'}
        </Button>
      </XStack>
    </YStack>
  );
};

const ImagePreview = ({ uri, onRemove }: { uri?: string, onRemove: () => void }) => {
  if (!uri) return null;

  return (
    <YStack mt="$2">
      <XStack justifyContent="space-between" alignItems="center" mb="$2">
        <Label>Seçilen Görsel</Label>
        <Button size="$2" theme="red" onPress={onRemove}>Kaldır</Button>
      </XStack>
      <Image
        source={{ uri }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 8,
          resizeMode: 'cover'
        }}
      />
    </YStack>
  );
};

const ReplyComponent = ({ questionId, onAddReply }: { questionId: number, onAddReply: (questionId: number, reply: Partial<Reply>) => void }) => {
  const [replyText, setReplyText] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();

  const handleSubmit = () => {
    if (!replyText.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir cevap yazın');
      return;
    }

    const newReply: Partial<Reply> = {
      content: replyText,
      user: 'Kullanıcı',
      createdAt: 'Şimdi',
      imageUri
    };

    onAddReply(questionId, newReply);
    setReplyText('');
    setImageUri(undefined);
  };

  return (
    <YStack space="$3" mt="$4" p="$3" borderTopWidth={1} borderColor="$color5">
      <TextArea
        placeholder="Cevabınızı yazın..."
        value={replyText}
        onChangeText={setReplyText}
        minHeight={100}
      />
      <Button
        mt="$2"
        theme="active"
        bg="#D9F87F"
        color="black"
        icon={Send}
        onPress={handleSubmit}
        alignSelf="flex-end"
        disabled={!replyText.trim()}
      >
        Gönder
      </Button>
    </YStack>
  );
};

const QuestionCreate = ({ onSubmit }: { onSubmit: (question: Partial<Question>) => void }) => {
  const [title, setTitle] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['#ayt', '#fizik', '#tekrar']);
  const [newTag, setNewTag] = useState('');
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | undefined>();

  const answerOptions = ['A', 'B', 'C', 'D', 'E'];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir başlık giriniz');
      return;
    }

    // Add the grade to tags if selected
    const allTags = [...tags];
    if (selectedGrade) {
      const gradeTag = selectedGrade;
      if (!allTags.some(tag => tag === gradeTag)) {
        allTags.push(gradeTag);
      }
    }

    const newQuestion: Partial<Question> = {
      category: title,
      user: 'Kullanıcı',
      topic: description || 'Açıklama yok',
      createdAt: 'Şimdi',
      tags: allTags.map(tag => tag.startsWith('#') ? tag.substring(1) : tag),
      correctOption: correctOption || undefined,
      imageUri,
      type: 'question',
      replies: [],
      lecture: selectedClass,
      unit: selectedUnit,
      grade: selectedGrade
    };

    onSubmit(newQuestion);
  };

  return (
    <ScrollView>
      <YStack space="$4" marginBottom={20}>
        <Label>Soru Başlığı *</Label>
        <Input
          placeholder="Örn: Türev'in Tanımı"
          value={title}
          onChangeText={setTitle}
        />

        <Label>Sınıf *</Label>
        <GradeSelect
          value={selectedGrade}
          onValueChange={setSelectedGrade}
        />

        <Label>Ders *</Label>
        <SubjectSelect
          value={selectedClass}
          onValueChange={setSelectedClass}
        />

        <Label>Ünite *</Label>
        <UnitSelect
          value={selectedUnit}
          onValueChange={setSelectedUnit}
        />

        <Label>Cevap</Label>
        <XStack space="$2" flexWrap="wrap">
          {answerOptions.map(opt => (
            <Button
              key={opt}
              bg={correctOption === opt ? '#D9F87F' : undefined}
              color={correctOption === opt ? 'black' : undefined}
              fontWeight={correctOption === opt ? 'bold' : undefined}
              onPress={() => setCorrectOption(opt)}
            >
              {opt}
            </Button>
          ))}
        </XStack>

        <Label>Açıklama</Label>
        <TextArea
          placeholder="Açıklama giriniz."
          value={description}
          onChangeText={setDescription}
        />

        <Label>Etiketler</Label>
        <XStack space="$2" alignItems="center">
          <Input
            flex={1}
            placeholder="Etiket ekle (örn: #matematik)"
            value={newTag}
            onChangeText={setNewTag}
          />
          <Button onPress={handleAddTag} disabled={!newTag.trim()}>
            Ekle
          </Button>
        </XStack>

        <XStack flexWrap="wrap" gap="$2" mt="$2">
          {tags.map((tag, index) => (
            <Button
              key={index}
              size="$2"
              theme="blue"
              alignSelf="flex-start"
              onPress={() => handleRemoveTag(tag)}
              icon={<XStack ml="$1"><CircleX size={12} /></XStack>}
            >
              <Text fontSize="$3">{tag}</Text>
            </Button>
          ))}
        </XStack>

        <ImagePreview
          uri={imageUri}
          onRemove={() => setImageUri(undefined)}
        />

        <ImagePickerComponent
          onImageSelected={(uri) => setImageUri(uri)}
        />

        <Button
          mt="$4"
          bg='#D9F87F'
          color='black'
          fontWeight='bold'
          pressStyle={{ bg: '#D9F87F', opacity: 0.7 }}
          onPress={handleSubmit}
        >
          Soru Oluştur
        </Button>
      </YStack>
    </ScrollView>
  );
}

const PostCreate = ({ onSubmit }: { onSubmit: (post: Partial<Question>) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['#post']);
  const [newTag, setNewTag] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Lütfen bir başlık giriniz');
      return;
    }

    // Add the grade to tags if selected
    const allTags = [...tags];
    if (selectedGrade) {
      const gradeTag = selectedGrade;
      if (!allTags.some(tag => tag === gradeTag)) {
        allTags.push(gradeTag);
      }
    }

    const newPost: Partial<Question> = {
      category: title,
      user: 'Kullanıcı',
      topic: description || 'Açıklama yok',
      createdAt: 'Şimdi',
      tags: allTags.map(tag => tag.startsWith('#') ? tag.substring(1) : tag),
      type: 'post',
      imageUri,
      lecture: selectedClass,
      unit: selectedUnit,
      grade: selectedGrade
    };

    onSubmit(newPost);
  };

  return (
    <ScrollView>
      <YStack space="$4" marginBottom={20}>
        <Label>Post Başlığı *</Label>
        <Input
          placeholder="Örn: YKS Motivasyonu"
          value={title}
          onChangeText={setTitle}
        />

        <Label>Açıklama *</Label>
        <TextArea
          placeholder="Açıklama giriniz."
          value={description}
          onChangeText={setDescription}
        />

        <Label>Etiketler</Label>
        <XStack space="$2" alignItems="center">
          <Input
            flex={1}
            placeholder="Etiket ekle (örn: #motivasyon)"
            value={newTag}
            onChangeText={setNewTag}
          />
          <Button onPress={handleAddTag} disabled={!newTag.trim()}>
            Ekle
          </Button>
        </XStack>

        <XStack flexWrap="wrap" gap="$2" mt="$2">
          {tags.map((tag, index) => (
            <Button
              key={index}
              size="$2"
              theme="blue"
              alignSelf="flex-start"
              onPress={() => handleRemoveTag(tag)}
              icon={<XStack ml="$1"><CircleX size={12} /></XStack>}
            >
              <Text fontSize="$3">{tag}</Text>
            </Button>
          ))}
        </XStack>

        <ImagePreview
          uri={imageUri}
          onRemove={() => setImageUri(undefined)}
        />

        <ImagePickerComponent
          onImageSelected={(uri) => setImageUri(uri)}
        />

        <Button
          mt="$4"
          bg='#D9F87F'
          color='black'
          fontWeight='bold'
          pressStyle={{ bg: '#D9F87F', opacity: 0.7 }}
          onPress={handleSubmit}
        >
          Post Oluştur
        </Button>
      </YStack>
    </ScrollView>
  );
}

export default function MainForum() {
  const [questionDetail, setQuestionDetail] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'soru' | 'post' | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>(questions.map(q => ({ ...q, replies: [] })));

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    tags: {
      ayt: false,
      tyt: false
    },
    gradeLevel: {
      '9': false,
      '10': false,
      '11': false,
      '12': false
    },
    lecture: '',
    unit: ''
  });
  const [selectedLecture, setSelectedLecture] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const rotation = useSharedValue(0);
  const firstButtonOffset = useSharedValue(0);
  const secondButtonOffset = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0);

  const toggleFab = () => {
    const newValue = !isFabOpen;
    setIsFabOpen(newValue);

    rotation.value = withSpring(newValue ? 1 : 0, {
      damping: 20,
      stiffness: 100,
      mass: 0.2
    });

    if (newValue) {
      buttonOpacity.value = 1;
      buttonScale.value = withSpring(1, {
        damping: 20,
        stiffness: 300,
        mass: 0.2
      });
      firstButtonOffset.value = withSpring(60, {
        damping: 20,
        stiffness: 200,
        mass: 0.2
      });
      secondButtonOffset.value = withSpring(120, {
        damping: 20,
        stiffness: 200,
        mass: 0.2
      });
    } else {
      firstButtonOffset.value = withSpring(0, {
        damping: 20,
        stiffness: 200,
        mass: 0.2
      });
      secondButtonOffset.value = withSpring(0, {
        damping: 20,
        stiffness: 200,
        mass: 0.2
      });
      buttonScale.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
        mass: 0.2
      });
      buttonOpacity.value = withTiming(0, { duration: 100 });
    }
  };

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value * 45}deg` }
      ],
    };
  });

  const firstButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -firstButtonOffset.value },
        { scale: buttonScale.value }
      ],
      opacity: buttonOpacity.value,
      display: buttonOpacity.value === 0 ? 'none' : 'flex',
    };
  });

  const secondButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -secondButtonOffset.value },
        { scale: buttonScale.value }
      ],
      opacity: buttonOpacity.value,
      display: buttonOpacity.value === 0 ? 'none' : 'flex',
    };
  });

  const handleQuestionPress = (id: number) => {
    const foundQuestion = allQuestions.find(q => q.id === id);
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
    event.stopPropagation();

    setBookmarkedQuestions(prev => {
      const isAlreadyBookmarked = prev.some(q => q.id === question.id);

      if (isAlreadyBookmarked) {
        return prev.filter(q => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });
  };

  const isBookmarked = (id: number) => {
    return bookmarkedQuestions.some(q => q.id === id);
  };

  const handleAddContent = (newContent: Partial<Question>) => {
    const newId = Math.max(0, ...allQuestions.map(q => q.id)) + 1;
    const fullContent = {
      ...newContent,
      id: newId
    } as Question;

    setAllQuestions([fullContent, ...allQuestions]);
    setActiveTab(null);
    Alert.alert('Başarılı', newContent.type === 'post' ? 'Post oluşturuldu!' : 'Soru oluşturuldu!');
  };

  const handleAddReply = (questionId: number, reply: Partial<Reply>) => {
    setAllQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          const newReplyId = q.replies ? Math.max(0, ...q.replies.map(r => r.id)) + 1 : 1;
          const newReply = { ...reply, id: newReplyId } as Reply;

          return {
            ...q,
            replies: [...(q.replies || []), newReply]
          };
        }
        return q;
      })
    );

    if (selectedQuestion && selectedQuestion.id === questionId) {
      const newReplyId = selectedQuestion.replies
        ? Math.max(0, ...selectedQuestion.replies.map(r => r.id)) + 1
        : 1;
      const newReply = { ...reply, id: newReplyId } as Reply;

      setSelectedQuestion({
        ...selectedQuestion,
        replies: [...(selectedQuestion.replies || []), newReply]
      });
    }

    Alert.alert('Başarılı', 'Yanıtınız eklendi!');
  };

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    if (!filtersApplied && !searchQuery.trim()) return allQuestions;

    return allQuestions.filter(question => {
      // Search query filter
      if (searchQuery.trim() &&
        !question.topic.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !question.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Only apply tag/grade/etc filters if filters are applied
      if (filtersApplied) {
        // Tag filters
        if (filters.tags.ayt && !question.tags.some(tag => tag.toLowerCase() === 'ayt')) {
          return false;
        }
        if (filters.tags.tyt && !question.tags.some(tag => tag.toLowerCase() === 'tyt')) {
          return false;
        }

        // Grade level check - check both tags and grade field
        const hasSelectedGrade = Object.entries(filters.gradeLevel).some(([grade, isSelected]) => {
          if (!isSelected) return false;

          // Check if grade is in tags or as a direct property
          return question.tags.some(tag => tag === grade) || question.grade === grade;
        });

        if (Object.values(filters.gradeLevel).some(v => v) && !hasSelectedGrade) {
          return false;
        }

        // Lecture filter - check both category and lecture field
        if (selectedLecture &&
          !question.category.toLowerCase().includes(selectedLecture.toLowerCase()) &&
          (!question.lecture || !question.lecture.toLowerCase().includes(selectedLecture.toLowerCase()))) {
          return false;
        }

        // Unit filter - check both tags and unit field
        if (selectedUnit &&
          !question.tags.some(tag => tag.toLowerCase().includes(selectedUnit.toLowerCase())) &&
          (!question.unit || !question.unit.toLowerCase().includes(selectedUnit.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });
  }, [allQuestions, filters, selectedLecture, selectedUnit, filtersApplied, searchQuery]);

  const applyFilters = () => {
    setFiltersApplied(true);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      tags: { ayt: false, tyt: false },
      gradeLevel: { '9': false, '10': false, '11': false, '12': false },
      lecture: '',
      unit: ''
    });
    setSelectedLecture('');
    setSelectedUnit('');
    setFiltersApplied(false);
    setFilterOpen(false);
    setSearchQuery('');
  };

  if (activeTab === 'soru') {
    return (
      <YStack f={1} px="$2">
        <XStack ai="center" mb="$4">
          <Button
            icon={ChevronLeft}
            circular
            mr="$4"
            onPress={() => setActiveTab(null)}
          />
          <Text fontSize="$6" fontWeight="bold">Soru Oluştur</Text>
        </XStack>
        <QuestionCreate onSubmit={handleAddContent} />
      </YStack>
    );
  }

  if (activeTab === 'post') {
    return (
      <YStack f={1} px="$2">
        <XStack ai="center" mb="$4">
          <Button
            icon={ChevronLeft}
            circular
            mr="$4"
            onPress={() => setActiveTab(null)}
          />
          <Text fontSize="$6" fontWeight="bold">Post Oluştur</Text>
        </XStack>
        <PostCreate onSubmit={handleAddContent} />
      </YStack>
    );
  }

  if (questionDetail && selectedQuestion) {
    return (
      <YStack f={1} px="$2">
        <QuestionDetail
          question={selectedQuestion}
          onBackPress={handleBackPress}
          onAddReply={handleAddReply}
        />
      </YStack>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <YStack f={1} px="$2">
        <XStack ai="center" jc="space-between" mb="$4">
          <Input
            placeholder="Soru ara..."
            width="85%"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button
            size="$3"
            icon={SlidersHorizontal}
            circular
            onPress={() => setFilterOpen(true)}
            bg={filtersApplied ? "#D9F87F" : undefined}
          />
        </XStack>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {filtersApplied && (
            <XStack ai="center" jc="space-between" mb="$2">
              <Text>Filtreler uygulandı</Text>
              <Button size="$2" onPress={clearFilters}>Filtreleri temizle</Button>
            </XStack>
          )}

          <YStack space="$4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <Pressable key={q.id} onPress={() => handleQuestionPress(q.id)}>
                  <Card padding="$3" elevate bordered>
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
              ))
            ) : (
              <YStack ai="center" jc="center" padding="$8">
                <Text fontSize="$5" color="$color9" textAlign="center">
                  Sonuç bulunamadı.
                </Text>
                {filtersApplied && (
                  <Button mt="$4" onPress={clearFilters}>
                    Filtreleri temizle
                  </Button>
                )}
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </YStack>

      {/* Filter Sheet */}
      <Sheet
        modal
        open={filterOpen}
        onOpenChange={setFilterOpen}
        snapPoints={[70]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <YStack space="$4">
            <XStack jc="space-between" ai="center">
              <Text fontWeight="bold" fontSize="$6">Filtrele</Text>
              <Button
                size="$3"
                circular
                icon={X}
                onPress={() => setFilterOpen(false)}
              />
            </XStack>

            {/* Tag Filters */}
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$5">Sınav</Text>
              <XStack space="$4">
                <XStack space="$2" ai="center">
                  <Switch
                    checked={filters.tags.ayt}
                    style={{ backgroundColor: filters.tags.ayt ? '#D9F87F' : '' }}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, tags: { ...filters.tags, ayt: checked } })
                    }
                  />
                  <Text>AYT</Text>
                </XStack>
                <XStack space="$2" ai="center">
                  <Switch
                    checked={filters.tags.tyt}
                    style={{ backgroundColor: filters.tags.tyt ? '#D9F87F' : '' }}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, tags: { ...filters.tags, tyt: checked } })
                    }
                  />
                  <Text>TYT</Text>
                </XStack>
              </XStack>
            </YStack>

            {/* Grade Level Filters */}
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$5">Sınıf</Text>
              <XStack flexWrap="wrap" space="$4">
                {[9, 10, 11, 12].map(grade => (
                  <XStack key={grade} space="$2" ai="center" width="30%">
                    <Switch
                      checked={filters.gradeLevel[grade.toString() as '9' | '10' | '11' | '12']}
                      style={{
                        backgroundColor: filters.gradeLevel[grade.toString() as '9' | '10' | '11' | '12'] ? '#D9F87F' : '',
                        marginBottom: 4,
                      }}
                      onCheckedChange={(checked) => {
                        setFilters({
                          ...filters,
                          gradeLevel: { ...filters.gradeLevel, [grade.toString()]: checked }
                        });
                      }}
                    />
                    <Text>{grade}. Sınıf</Text>
                  </XStack>
                ))}
              </XStack>
            </YStack>

            {/* Lecture Filter */}
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$5">Ders</Text>
              <SubjectSelect
                value={selectedLecture}
                onValueChange={setSelectedLecture}
              />
            </YStack>

            {/* Unit Filter */}
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$5">Ünite</Text>
              <UnitSelect
                value={selectedUnit}
                onValueChange={setSelectedUnit}
              />
            </YStack>

            {/* Filter Action Buttons */}
            <XStack space="$4" mt="$4">
              <Button
                flex={1}
                onPress={clearFilters}
              >
                Temizle
              </Button>
              <Button
                flex={1}
                bg="#D9F87F"
                color="black"
                onPress={applyFilters}
              >
                Uygula
              </Button>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>

      <View style={styles.fabContainer}>
        <Animated.View style={[styles.fabActionButton, secondButtonStyle]}>
          <Button
            size="$5"
            circular
            bg={'#e1e1e1'}
            pressStyle={{ opacity: 0.7, bg: '#e1e1e1' }}
            onPress={() => {
              toggleFab();
              setActiveTab('post');
            }}
          >
            <Users size={18} color="black" />
          </Button>
        </Animated.View>

        <Animated.View style={[styles.fabActionButton, firstButtonStyle]}>
          <Button
            size="$5"
            circular
            bg={'#e1e1e1'}
            pressStyle={{ opacity: 0.7, bg: '#e1e1e1' }}
            onPress={() => {
              toggleFab();
              setActiveTab('soru');
            }}
          >
            <MessageCircleQuestion size={18} color="black" />
          </Button>
        </Animated.View>

        <Button
          size="$5"
          circular
          bg={'#D9F87F'}
          onPress={toggleFab}
          pressStyle={{ opacity: 0.7, bg: '#D9F87F' }}
        >
          <Animated.View style={rotationStyle}>
            <Plus size={24} color="black" />
          </Animated.View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
    zIndex: 999,
  },
  fabActionButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
  }
});
