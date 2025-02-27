import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {View, StyleSheet, Alert} from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createMenuTable, getMenuItems, saveMenuItems} from "./utilities/database";
import {getSectionListData} from "./utilities/utils";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);

    const checkOnboardingStatus = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("onboardingCompleted");
            if (storedValue === "true") {
                setOnboardingCompleted(true);
            }
        } catch (error) {
            Alert.alert("Error reading onboarding status from AsyncStorage");
        } finally {
            setLoading(false);
        }
    };

    // Function to read onboarding flag from AsyncStorage on app startup
    useEffect(() => {
        // check onboarding status
        checkOnboardingStatus();
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName={onboardingCompleted ? "Home" : "Onboarding"}>
                    {/* Onboarding Screen */}
                    {!onboardingCompleted ? (
                        <Stack.Screen
                            name="Onboarding"
                            component={(props) => (
                                <Onboarding
                                    {...props}
                                    setOnboardingCompleted={setOnboardingCompleted}
                                />
                            )}
                        />
                    ) : null}

                    {/* Home Screen */}
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />

                    {/* Profile Screen */}
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
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