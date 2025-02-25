import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
    Image,
} from 'react-native';

export default function Onboarding({ navigation }) {
    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');

    const handlePress = () => {
        if (!firstName || !lastName) {
            Alert('Please enter your first and last name');
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/littleLemonLogo.png')}
                    style={styles.logo}
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.regularText}>Let us get to know you</Text>
                <Text style={styles.regularText}>First Name</Text>
                <TextInput
                    style={styles.inputBox}
                    value={firstName}
                    onChangeText={onChangeFirstName}
                    placeholder={'First Name'}
                    keyboardType={'default'}
                />
                <Text style={styles.regularText}>Last Name</Text>
                <TextInput
                    style={styles.inputBox}
                    value={lastName}
                    onChangeText={onChangeLastName}
                    placeholder={'Last Name'}
                    keyboardType={'default'}
                />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Pressable onPress={() => handlePress()} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Container takes full screen height
    },
    header: {
        flex: 0.15, // Header takes 15% of screen
        backgroundColor: '#DFE3E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 300,
        resizeMode: 'contain',
    },
    content: {
        flex: 0.7, // Content takes 70% of screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#CCD2D8',
    },
    headerText: {
        fontSize: 30,
        color: '#4D5B6C',
        textAlign: 'center',
        marginBottom: 20,
    },
    regularText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 8,
    },
    inputBox: {
        height: 40,
        borderWidth: 2,
        borderColor: '#4D5B6C',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    footer: {
        flex: 0.15, // Footer takes 15% of screen
        backgroundColor: '#DFE3E8',
        justifyContent: 'center',
        paddingHorizontal: 20, // Padding for button alignment
    },
    button: {
        alignSelf: 'flex-end', // Align button to the right
        backgroundColor: '#CCD2D8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#4D5B6C',
    },
});