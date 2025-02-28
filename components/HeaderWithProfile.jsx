import AsyncStorage from "@react-native-async-storage/async-storage";
import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useEffect, useState} from "react";
import { navigate } from '../utilities/navigationRef';

const Header = () => {
    const [avatar, setAvatar] = useState(null);
    const [initials, setInitials] = useState(""); // State to store initials

    const loadAvatar = async () => {
        const savedImage = await AsyncStorage.getItem("userAvatar");
        if (savedImage) setAvatar(savedImage);
    };

    const loadInitials = async () => {
        const savedName = await AsyncStorage.getItem("userName");
        if (!savedName) return "";
        const names = savedName.trim().split(" ");
        const initials = names.map((n) => n[0].toUpperCase());
        setInitials(initials.join("")); // Set initials once they are resolved
    };

    const goToProfile = () => {
        navigate("Profile");

    };

    useEffect(() => {
        loadAvatar();
        loadInitials();
    }, []);

    return (
        <>
            <View style={styles.row}>

                {/* Little Lemon Logo */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/littleLemonLogo.png')}
                        style={styles.logo}
                    />
                </View>

                {/* Avatar Display */}
                <Pressable style={styles.avatarButton} onPress={goToProfile}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : (
                            <Text style={styles.placeholder}>{initials}</Text> // Use resolved initials from state
                        )}
                </Pressable>

            </View>
        </>
    );
};

export default Header;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 20,
        height: 60,
    },
    logo: {
        marginLeft: 90,
        height: 50,
        width: 150,
        resizeMode: "contain",
    },
    avatarButton: {
        marginRight: 0,
        backgroundColor: "#4D5D57",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    placeholder: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
    },
});