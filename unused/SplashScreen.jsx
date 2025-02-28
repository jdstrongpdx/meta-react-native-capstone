import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const SplashScreen = ({ message = "Loading, please wait..." }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.branding}>My App</Text>
            <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333333", // Dark background for branding
    },
    branding: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20,
    },
    spinner: {
        marginVertical: 20,
    },
    message: {
        fontSize: 16,
        color: "#CCCCCC",
    },
});