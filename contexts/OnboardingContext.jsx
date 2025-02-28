import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to load the onboarding status from AsyncStorage
    const loadOnboardingStatus = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("onboardingCompleted");
            if (storedValue === "true") {
                setOnboardingComplete(true);
            }
            else {
                setOnboardingComplete(false);
            }
        } catch (error) {
            Alert.alert("Error reading onboarding status from AsyncStorage");
        } finally {
            setIsLoading(false);
        }
    };

    // Load onboarding status during initialization
    useEffect(() => {
        loadOnboardingStatus();
    }, []);

    const onboard = async () => {
        try {
            await AsyncStorage.setItem("onboardingCompleted", "true");
            setOnboardingComplete(true);
            return Promise.resolve();
        } catch (error) {
            console.error("Error saving onboarding completion:", error);
            return Promise.reject(error);

        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.setItem("onboardingCompleted", "false");
            setOnboardingComplete(false);
            return Promise.resolve();
        } catch (error) {
            console.error("Error resetting onboarding status:", error);
            return Promise.reject(error);
        }
    };

    return (
        <OnboardingContext.Provider
            value={{
                onboardingComplete,
                isLoading, // Expose loading state
                setOnboardingComplete,
                onboard,
                logout,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

// Custom hook to access context
export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
};