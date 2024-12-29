import { StyleSheet, View, Image, Text, useWindowDimensions } from "react-native";

type TOnboardingProps = {
    item: {
        image: string,
        title: string,
        description: string,
    }
}

const OnboardingLayoutItem = ({ item }: { item: TOnboardingProps['item'] }) => {

    const { width } = useWindowDimensions();
    return (
        <View
            style={[styles.container, { width }]}>
                <Image
                    source={{ uri: item.image }}
                    style={[styles.image, { width, resizeMode:"contain" }]} />
                <View style={{flex: 0.3}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>


        </View>    
    )
}

export default OnboardingLayoutItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
})