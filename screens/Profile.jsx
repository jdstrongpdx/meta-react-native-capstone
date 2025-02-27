import React, { useState } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import HeroPageView from "../components/HeroPageView";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handlePress = () => {
        setDisabled(true);
        if (!validateEmail(email) || name.trim().length === 0) {
            Alert.alert('Please enter a valid name and email address');
            setDisabled(false);
        }
        else {
            completeOnboarding().then(() => {
                navigation.navigate('Profile');
            }).catch(error => {
                Alert.alert("Error saving onboarding status in AsyncStorage:");
            })
        }
    };

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem("onboardingCompleted", "true");
            await AsyncStorage.setItem("userName", name.trim());
            await AsyncStorage.setItem("userEmail", email.trim());
        } catch (error) {
            console.error("Error saving onboarding data in AsyncStorage:", error);
        }
    };

    const handleEmailChange = (value) => {
        onChangeEmail(value);
        setDisabled(value.trim().length === 0);
    };

    return (
        <HeroPageView>
            {/* Content */}
            <>
                <Text style={styles.headerText}>Let us get to know you</Text>
                <Text style={styles.regularText}>Name *</Text>
                <TextInput
                    style={styles.inputBox}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder={'John Doe'}
                    keyboardType={'default'}
                />
                <Text style={styles.regularText}>Email *</Text>
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder={'email@example.com'}
                    keyboardType={'email-address'}
                />
            </>

            {/* Footer */}
            <>
                <Pressable
                    onPress={() => handlePress()}
                    style={[styles.button, disabled && styles.disabled]}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </>
        </HeroPageView>
    );
}

const styles = StyleSheet.create({
    regularText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 8,
    },
    headerText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 45,
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
    disabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },
});