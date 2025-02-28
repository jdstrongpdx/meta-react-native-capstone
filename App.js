import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {View, StyleSheet, Alert} from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import {navigationRef} from "./utilities/navigationRef";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [onboardingComplete, setOnboardingComplete] = useState(false);

    const loadOnboardingStatus = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("onboardingCompleted");
            if (storedValue === "true") {
                setOnboardingComplete(true);
            }
        } catch (error) {
            Alert.alert("Error reading onboarding status from AsyncStorage");
        } finally {
            setLoading(false);
        }
    };

    const setOnboardingStatus = async (status) => {
        try {
            if (status) {
                await AsyncStorage.setItem("onboardingCompleted", "true");
                setOnboardingComplete(true);
            } else {
                await AsyncStorage.setItem("onboardingCompleted", "false");
                setOnboardingComplete(false);
            }

        } catch (error) {
            Alert.alert("Error saving onboarding status to AsyncStorage");
        }
    };

    // Function to read onboarding flag from AsyncStorage on app startup
    useEffect(() => {
        // check onboarding status
        loadOnboardingStatus();
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName={onboardingComplete ? "Home" : "Onboarding"}>
                    {/* Onboarding Screen */}
                    {!onboardingComplete ? (
                        <Stack.Screen
                            name="Onboarding"
                            component={(props) => (
                                <Onboarding
                                    {...props}
                                    setOnboardingStatus={setOnboardingStatus}
                                />
                            )}
                        />
                    ) : null}

                    {/* Home Screen */}
                    <Stack.Screen name="Home" component={Home}/>

                    {/* Profile Screen */}
                    <Stack.Screen
                        name="Profile"
                        component={(props) => (
                            <Profile
                                {...props}
                                setOnboardingStatus={setOnboardingStatus}
                            />
                        )}
                    />

                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
    },
});