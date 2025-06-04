import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Text, Pressable } from 'react-native';
import OnboardingLayoutItem from './OnboardingLayoutItem';
import { onBoardingSlides } from '../../configs/constants';
import { Redirect, router } from 'expo-router';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { Button } from "tamagui";
import commonStyles from '../../styles/style';
import * as Haptics from 'expo-haptics';



const OnboardingLayout = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef<FlatList>(null)

    const viableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
        const index = viewableItems[0]?.index;
        if (index !== null && index !== undefined) {
            setCurrentIndex(index);
        }
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const handleNextSlide = () => {
        if (currentIndex < onBoardingSlides.length - 1 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            // <Redirect href="/home" />
            console.log('last :>> ');
        }
    }

    const handlePrevSlide = () => {
        if (currentIndex > 0 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        } else {
            console.log('first :>> ');
        }
    }

    const renderAnimatedUI = () => {
        return (
            <View style={{ flex: 0.7 }}>
                <Animated.FlatList
                    data={onBoardingSlides}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                    onViewableItemsChanged={viableItemsChanged}
                    scrollEventThrottle={32}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    renderItem={({ item }) => (
                        <OnboardingLayoutItem item={item} />
                    )} />
            </View>
        )
    }

    const renderButtonUI = () => {
        return (
            <View style={{ ...styles.buttonContainer, justifyContent: currentIndex > 0 ? 'space-between' : 'center' }}>
                {(currentIndex > 0 && currentIndex < onBoardingSlides.length - 1) &&
                    <View style={styles.prevBtn}>
                        <Button icon={ArrowLeft} pressStyle={commonStyles.buttonActiveBorderless} style={styles.buttonIcons} color="#d9f87f" scaleIcon={2} onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                            handlePrevSlide()
                        }}></Button>
                    </View>}

                {(currentIndex < onBoardingSlides.length - 1) &&
                    <View style={styles.nextBtn}>
                        <Button pressStyle={commonStyles.buttonActiveBorderless} style={styles.buttonIcons} scaleIcon={2} onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                            handleNextSlide()
                        }}>
                            <ArrowRight color={'black'} />
                        </Button>
                    </View>}

                {(currentIndex == onBoardingSlides.length - 1) &&
                    <View style={styles.registerContainer}>
                        <Button
                            style={styles.registerButton}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                router.push('/register')
                            }}>
                            <Text style={styles.registerText}>
                                Hesap Oluştur
                            </Text>
                        </Button>

                        <View style={styles.loginTextContainer}>
                            <Text style={styles.loginText}>
                                Hesabın var mı?
                            </Text>

                            <Pressable
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                    router.push('/login')
                                }}>
                                <Text style={styles.loginHighlight}>
                                    Giriş Yap
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                }
            </View >

        )
    }

    return (
        <View style={styles.container}>
            {renderAnimatedUI()}
            {renderButtonUI()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 96,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',

    },
    buttonContainer: {
        display: 'flex',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 0.2,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 48,

    },
    prevBtn: {
        height: 64,
        width: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d9f87f',
        borderWidth: 2,
    },
    nextBtn: {
        backgroundColor: '#d9f87f',
        height: 64,
        width: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonIcons: {
        backgroundColor: 'transparent',
    },
    registerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 12,
        width: "100%"
    },
    registerButton: {
        width: 250,
        height: 48,
        borderRadius: 20,
        backgroundColor: "#d9f87f",
    },
    registerText: {
        color: "#1e1e1e",
        fontWeight: 600,
        fontSize: 18,
    },
    loginTextContainer: {

        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",
        padding: 8,
        gap: 4,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 500,
        color: "#e1e1e1",
    },
    loginHighlight: {
        color: "#b9aee5",
        fontSize: 16,
        fontWeight: 600,
        padding: 4,

    }
});

export default OnboardingLayout;
