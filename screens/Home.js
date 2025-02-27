import { Alert, Pressable, StyleSheet, Text, Dimensions, Image, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import HomePageView from "../components/HomePageView";
import {clearMenuTable, createMenuTable, getMenuItems} from "../utilities/database";

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const IMAGE_BASE_URL = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images';
const screenWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        clearMenuTable()

        // Ensure the database table is created
        createMenuTable();

        // Check the local database for menu items first
        getMenuItems(async (storedMenu) => {
            if (storedMenu.length > 0) {
                // If items exist in the database, use them
                setMenuData(storedMenu);
                console.log("Loading menu items from the database.")
                setLoading(false);
            } else {
                // If no data exists, fetch from the remote API
                try {
                    console.log("Loading menu items from the the internet.")
                    const response = await fetch(API_URL);
                    const json = await response.json();

                    const menuWithImages = json.menu.map((item) => ({
                        ...item,
                        image: `${IMAGE_BASE_URL}/${item.image}?raw=true`, // Add full image URL
                    }));

                    // Save fetched data to the local database
                    insertMenuItems(menuWithImages);

                    // Use the fetched data
                    setMenuData(menuWithImages);
                    console.log(menuData)
                } catch (error) {
                    Alert.alert("Failed to fetch menu. Please try again later.");
                } finally {
                    setLoading(false);
                }
            }
        });
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            {/* Container for text on the left */}
            <View style={styles.textContainer}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <Text style={styles.menuPrice}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                </Text>
            </View>

            {/* Image on the right */}
            <Image source={{ uri: item.image }} style={styles.menuImage} />
        </View>
    );

    return (
        <HomePageView>
            {/* Content */}
            <>
                <Text style={styles.headerText}>ORDER FOR DELIVERY</Text>
                <FlatList
                    data={menuData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMenuItem}
                />
            </>
        </HomePageView>
    );
};

export default Home;

const styles = StyleSheet.create({
    regularText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 5,
    },
    headerText: {
        fontSize: 18,
        color: '#4D5B6C',
        marginBottom: 10,
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: '#CCD2D8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#4D5B6C',
    },
    disabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        width: screenWidth * 0.7,
        paddingRight: 10,
    },
    menuImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    menuName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    menuPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
