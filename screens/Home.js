import {Alert, Pressable, StyleSheet, Text, Dimensions, Image, FlatList, View} from "react-native";
import React, { useState, useEffect } from "react";
import HomePageView from "../components/HomePageView";
import {
    createMenuTable,
    getMenuItems,
    insertMenuItems,
    filterMenuByNameAndCategories
} from "../utilities/database";
import debounce from "lodash.debounce";

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const IMAGE_BASE_URL = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images';
const screenWidth = Dimensions.get("window").width;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const categories = ["Starters", "Mains", "Desserts", "Drinks"];
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
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
                        image: `${IMAGE_BASE_URL}/${item.image}?raw=true`,
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

    const debouncedSearch = debounce((text) => {
        setSearchText(text); // Update `searchText` state with debounce
    }, 500);

    const handleSearchChange = (text) => {
        debouncedSearch(text); // Debounce updates to `searchText`
    };

    useEffect(() => {
        // Trigger filtering logic when either `searchText` or `activeCategories` changes
        filterMenuByNameAndCategories(searchText, activeCategories, (filteredData) => {
            setMenuData(filteredData); // Update filtered menu items in state
        });
    }, [searchText, activeCategories]);

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
        <HomePageView searchText={searchText} handleSearchChange={handleSearchChange}>
            {/* Content */}
            <>
                {/* Header Text */}
                <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>

                {/* Categories Selector */}
                <View style={styles.categoryRow}>
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            onPress={() =>
                                setActiveCategories((prevCategories) =>
                                    prevCategories.includes(category)
                                        ? prevCategories.filter((cat) => cat !== category)
                                        : [...prevCategories, category]
                                )
                            }
                            style={{
                                backgroundColor: activeCategories.includes(category) ? "#4CAF50" : "#CCD2D8",
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                marginHorizontal: 5,
                            }}
                        >
                            <Text style={styles.categoryButtonText}>{category}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Filtered Menu List */}
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
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
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
    categoryRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10
    },
    categoryButtonText: {
        color: "black",
        fontSize: 16
    }
});
