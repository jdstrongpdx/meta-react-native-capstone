import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Hero = () => {
    return (
        <View style={styles.hero}>
            <View style={styles.heroContent}>
                {/* Text Content */}
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>Little Lemon</Text>
                    <Text style={styles.heroLocation}>Chicago</Text>
                    <Text style={styles.heroInformation}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>

                {/* Image to the right */}
                <Image
                    source={require('../assets/images/Picture2.png')}
                    style={styles.heroImage}
                />
            </View>
        </View>
    );
};

export default Hero;

const styles = StyleSheet.create({
    hero: {
        flex: 0.30,
        backgroundColor: '#4D5D57',
        justifyContent: 'center',
    },
    heroContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ECD043',
        textAlign: 'left',
        marginBottom: 5,
    },
    heroLocation: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E4E4E4',
        textAlign: 'left',
        marginBottom: 5,
    },
    heroInformation: {
        fontSize: 15,
        color: '#E4E4E4',
        textAlign: 'left',
    },
    heroImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginLeft: 20,
        borderRadius: 20,
    },
});