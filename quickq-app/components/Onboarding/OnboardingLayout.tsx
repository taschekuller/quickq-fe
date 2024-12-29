import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Dimensions, Button } from 'react-native';
import OnboardingLayoutItem from './OnboardingLayoutItem';

import { onBoardingSlides } from '../../configs/constants';
import { Redirect } from 'expo-router';


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
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
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
                {currentIndex > 0 &&
                    <View style={styles.prevBtn}>
                        <Button title={'<-'} onPress={() => {
                            handlePrevSlide()
                        }} />
                    </View>}

                <View style={styles.nextBtn}>
                    <Button title="->" onPress={() => {
                        handleNextSlide()
                    }} />
                </View>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    buttonContainer: {
        display: 'flex',
        flex: 0.2,
        flexDirection: 'row',
        width: '80%',
    },
    prevBtn: {
        backgroundColor: '#e1e1e1',
        height: 64,
        width: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextBtn: {
        backgroundColor: '#d9f87f',
        height: 64,
        width: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: "center"
    }
});

export default OnboardingLayout;
