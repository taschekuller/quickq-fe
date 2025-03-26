import { StyleSheet, View, Image, Text, useWindowDimensions } from "react-native";

type TOnboardingProps = {
    item: {
        image: object,
        title: string,
        description: string,
        highlightedText: string,
    }
}

const OnboardingLayoutItem = ({ item }: { item: TOnboardingProps['item'] }) => {

    const { width } = useWindowDimensions();

    return (
        <View
            style={[styles.container, { width }]}>
                <Image
                    source={ item.image }
                    style={[styles.image]} /> 
                <View style={{flex: 0.5}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>
                        {item.description} 
                        <Text style={styles.highlightedText}>{item.highlightedText}</Text>
                    </Text>
                    
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
        height: '100%',
        backgroundColor: '#1e1e1e',
    },
    image: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        resizeMode: 'contain',
    },
    title: {
        marginTop: 72,
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        color: "#e1e1e1"
    },
    description: {
        marginTop: 24,
        paddingHorizontal: 64,
        lineHeight: 28,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '400',
        color: "#e1e1e1",
        marginBottom: 20,
    },
    highlightedText: {
        fontSize: 20,
        margin: 12,
        fontWeight: '500',
        backgroundColor: 'rgba(185, 174, 229, 0.4)',
        textAlign: 'center',
        color: "#b9aee5"
    }
})