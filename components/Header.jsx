import {StyleSheet, View, Image} from "react-native";

const Header = () => {
    return (
        <>
            {/* Little Lemon Logo */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/littleLemonLogo.png')}
                    style={styles.logo}
                />
            </View>
        </>
    );
};

export default Header;

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 150,
        resizeMode: "contain",
        alignSelf: "center",
    },
});