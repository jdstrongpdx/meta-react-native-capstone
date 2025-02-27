import { View, StyleSheet } from "react-native";
import React from "react";

const Footer = ({ children }) => {
    return (
        <View style={styles.footer}>
            {children}
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        flex: 0.10,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        padding: 20,
    },
});