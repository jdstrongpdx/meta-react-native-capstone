import React from 'react';
import {ScrollView, Image, StyleSheet, Text, View, Pressable} from 'react-native';

const Welcome = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerWrapper}>
                <Image
                    style={styles.titleLogo}
                    source={require('../assets/images/logo.png')}
                    resizeMode="cover"
                    accessible={true}
                    accessibilityLabel={'Little Lemon Logo'}
                />

                <Text style={styles.headerText}>Little Lemon</Text>
            </View>
            <Text style={styles.regularText}>
                Little Lemon is a charming neighborhood bistro that serves simple food
                and classic cocktails in a lively but casual environment. We would love
                to hear your experience with us!
            </Text>

            <Pressable
                onPress={() => navigation.navigate('Onboarding')}
                style={styles.buttonWrapper}
            >
                <Text style={styles.buttonText}>Onboarding</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Menu')}
                style={styles.buttonWrapper}
            >
                <Text style={styles.buttonText}>Menu</Text>
            </Pressable>

            <Image
                style={styles.image}
                source={require('../assets/images/Picture1.png')}
                resizeMode="cover"
                accessible={true}
                accessibilityLabel={'Cookbook'}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 300,
    },
    image: {
        width: 350,
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        padding: 24,
        marginTop: 25,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    headerText: {
        paddingRight: 10,
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 10,
        fontSize: 30,
        textAlign: 'center',
    },
    regularText: {
        fontSize: 24,
        padding: 20,
        marginVertical: 8,
        textAlign: 'center',
    },
    titleLogo: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    title: {
        marginTop: 16,
        paddingVertical: 10,
        color: '#333333',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonWrapper: {
        marginTop: 20,
        height: 35,
        width: 300,
        borderRadius: 8,
        backgroundColor: '#495E57',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    disabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }
});

export default Welcome;
