import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import OnboardingLayoutItem from './OnboardingLayoutItem';

import slides from './slides';

const OnboardingLayout = () => {
    const [curentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef(null)

    const viableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
        const index = viewableItems[0]?.index;
        if (index !== null && index !== undefined) {
            setCurrentIndex(index);
        }
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    onViewableItemsChanged={viableItemsChanged}
                    scrollEventThrottle={32}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    renderItem={({ item }) => (
                        <OnboardingLayoutItem
                            item={item}
                        />
                    )} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnboardingLayout;
