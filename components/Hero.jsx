import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Hero = () => {
    return (
        <View style={styles.hero}>
            <View style={styles.content}>
                {/* Text Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Little Lemon</Text>
                    <Text style={styles.location}>Chicago</Text>
                    <Text style={styles.information}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>

                {/* Image to the right */}
                <Image
                    source={require('../assets/images/Picture2.png')}
                    style={styles.image}
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
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ECD043',
        textAlign: 'left',
        marginBottom: 5,
    },
    location: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E4E4E4',
        textAlign: 'left',
        marginBottom: 5,
    },
    information: {
        fontSize: 15,
        color: '#E4E4E4',
        textAlign: 'left',
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginLeft: 20,
        borderRadius: 20,
    },
});