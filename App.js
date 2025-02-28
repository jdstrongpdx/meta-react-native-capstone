import React from "react";
import {View, StyleSheet, Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {OnboardingProvider, useOnboarding} from "./contexts/OnboardingContext";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import {NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "./utilities/navigationRef";

const Stack = createNativeStackNavigator();

function AppNavigator() {

    const { onboardingComplete, isLoading } = useOnboarding();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Navigator
                initialRouteName={onboardingComplete ? "Home" : "Onboarding"}>
                {!onboardingComplete ? (
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                ) : (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Profile" component={Profile} />
                    </>
                )}
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
    },
});

export default function App() {
    return (
        <OnboardingProvider>
            <NavigationContainer ref={navigationRef}>
            <AppNavigator />
            </NavigationContainer>
        </OnboardingProvider>
    );
}
