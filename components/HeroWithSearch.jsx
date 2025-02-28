import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";

const HeroWithSearch = ({searchText, handleSearchChange}) => {
    return (
        <>
        <View style={styles.hero}>
            <View style={styles.heroContent}>
                {/* Text Content */}
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>Little Lemon</Text>
                    <Text style={styles.heroLocation}>Chicago</Text>
                    <Text style={styles.heroInformation}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>

                {/* Image to the right */}
                <Image
                    source={require('../assets/images/Picture2.png')}
                    style={styles.heroImage}
                />
            </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>

            <TextInput
                style={styles.inputBox}
                placeholder="Search dishes..."
                value={searchText}
                onChangeText={handleSearchChange}
            />
        </View>
        </>
    );
};

export default HeroWithSearch;

const styles = StyleSheet.create({
    hero: {
        flex: 0.30,
        backgroundColor: '#4D5D57',
        justifyContent: 'center',
    },
    searchBar: {
        flex: 0.10,
        backgroundColor: '#4D5D57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ECD043',
        textAlign: 'left',
        marginBottom: 5,
    },
    heroLocation: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E4E4E4',
        textAlign: 'left',
        marginBottom: 5,
    },
    heroInformation: {
        fontSize: 15,
        color: '#E4E4E4',
        textAlign: 'left',
    },
    heroImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginLeft: 20,
        borderRadius: 20,
    },
    inputBox: {
        height: 40,
        borderWidth: 2,
        borderColor: '#666',
        width: '90%',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#E4E4E4',
    },
});