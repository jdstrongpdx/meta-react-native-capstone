import {Image, StyleSheet, View} from "react-native";
import React from "react";

const Header = () => {
    return (
        <>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/littleLemonLogo.png')}
                    style={styles.logo}
                />
            </View>
        </>
    )
};

export default Header;

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 30,
        color: '#4D5B6C',
        textAlign: 'center',
        marginBottom: 20,
    },
});