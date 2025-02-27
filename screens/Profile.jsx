import React, { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
    Switch,
    View,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePageView from "../components/ProfilePageView";

export default function Onboarding({ navigation, setOnboardingCompleted }) {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [phoneNumber, onChangePhoneNumber] = useState('');
    const [specialOffers, setSpecialOffers] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [disabled, setDisabled] = useState(true);

    // Load data from AsyncStorage on component mount
    useEffect(() => {
        loadUserData();
    }, []);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleEmailChange = (value) => {
        onChangeEmail(value);
        setDisabled(!validateEmail(value) || name.trim().length === 0);
    };

    const handlePress = () => {
        setDisabled(true);
        if (!validateEmail(email) || name.trim().length === 0) {
            Alert.alert('Please enter a valid name and email address');
            setDisabled(false);
        } else {
            saveUserData().then(() => {
                navigation.navigate('Profile'); // TODO update route
            }).catch(error => {
                Alert.alert("Error saving profile data in AsyncStorage");
            });
        }
    };

    const loadUserData = async () => {
        try {
            const savedName = await AsyncStorage.getItem("userName");
            const savedEmail = await AsyncStorage.getItem("userEmail");
            const savedPhoneNumber = await AsyncStorage.getItem("userPhoneNumber");
            const savedSpecialOffers = await AsyncStorage.getItem("userSpecialOffers");
            const savedNewsletter = await AsyncStorage.getItem("userNewsletter");

            // Update state with loaded values
            if (savedName) onChangeName(savedName);
            if (savedEmail) onChangeEmail(savedEmail);
            if (savedPhoneNumber) onChangePhoneNumber(savedPhoneNumber);
            if (savedSpecialOffers !== null) setSpecialOffers(savedSpecialOffers === "true");
            if (savedNewsletter !== null) setNewsletter(savedNewsletter === "true");
        } catch (error) {
            console.error("Error loading data from AsyncStorage:", error);
        }
    };

    const saveUserData = async () => {
        try {
            // Save all fields to AsyncStorage
            await AsyncStorage.setItem("userName", name.trim());
            await AsyncStorage.setItem("userEmail", email.trim());
            await AsyncStorage.setItem("userPhoneNumber", phoneNumber.trim());
            await AsyncStorage.setItem("userSpecialOffers", specialOffers.toString());
            await AsyncStorage.setItem("userNewsletter", newsletter.toString());
            setOnboardingCompleted(true);
        } catch (error) {
            console.error("Error saving profile data in AsyncStorage:", error);
        }
    };

    const handleLogout = () => {
        setOnboardingCompleted(false);
        navigation.navigate('Welcome');
    };

    return (
        <ProfilePageView>
            {/* Content */}
            <>
                <Text style={styles.headerText}>Profile Information</Text>
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
                <Text style={styles.regularText}>Phone Number *</Text>
                <TextInput
                    style={styles.inputBox}
                    value={phoneNumber}
                    onChangeText={onChangePhoneNumber}
                    placeholder={'123-456-7890'}
                    keyboardType={'phone-pad'}
                />

                <Text style={styles.headerText}>Email Notifications</Text>
                <View style={styles.row}>
                    <Text style={styles.switchText}>Special Offers</Text>
                    <Switch
                        value={specialOffers}
                        onValueChange={(value) => setSpecialOffers(value)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.switchText}>Newsletter</Text>
                    <Switch
                        value={newsletter}
                        onValueChange={(value) => setNewsletter(value)}
                    />
                </View>
            </>

            {/* Footer */}
            <>
                <View style={styles.buttonRow}>
                    <Pressable
                        onPress={() => handleLogout()}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => handlePress()}
                        style={[styles.button, disabled && styles.disabled]}
                        disabled={disabled}
                    >
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </Pressable>
                </View>
            </>
        </ProfilePageView>
    );
}

const styles = StyleSheet.create({
    regularText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 8,
    },
    switchText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 8,
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 20,
        fontWeight: 'bold',
        marginTop: 20,
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
        alignSelf: 'flex-end',
        backgroundColor: '#CCD2D8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#EECF49',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    disabled: {
        opacity: 0.5,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
});