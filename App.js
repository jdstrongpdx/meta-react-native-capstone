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

const Stack = createNativeStackNavigator();

export default function App() {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);

    const fetchMenuData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();

            // Map over the fetched menu items and flatten the category field
            return json.menu.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                category: item.category.title
            }));

        } catch (error) {
            Alert.alert('An error occurred while fetching the menu data. Please try again later.');
            return [];
        }
    };

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

        // fetch and save menu data
        (async () => {
            try {
                await createMenuTable();
                let menuItems = await getMenuItems();

                if (!menuItems.length) {
                    const menuItems = await fetchMenuData();
                    saveMenuItems(menuItems);
                }

                const sectionListData = getSectionListData(menuItems);
                setMenuData(sectionListData);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, []);



    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator>
                    {onboardingCompleted ? (
                        // Navigate to Profile if onboarding is complete
                        <Stack.Screen
                            name="Profile"
                            component={(props) => (
                                <Profile
                                    {...props}
                                    setOnboardingCompleted={setOnboardingCompleted}
                                />
                            )}
                        />
                    ) : (
                        // Pass the completeOnboarding function to Onboarding screen
                        <Stack.Screen
                            name="Onboarding"
                            component={(props) => (
                                <Onboarding
                                    {...props}
                                    setOnboardingCompleted={setOnboardingCompleted}
                                />
                            )}
                        />
                    )}
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