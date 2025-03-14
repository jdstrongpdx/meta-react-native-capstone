import {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View,} from 'react-native';
import {Searchbar} from 'react-native-paper';
import debounce from 'lodash.debounce';
import {createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems,} from '../utilities/database';
import Filters from '../components/MenuFilter';
import {getSectionListData, useUpdateEffect} from '../utilities/utils';

const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const sections = ['Appetizers', 'Salads', 'Beverages'];

const Item = ({ title, price }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>${price}</Text>
    </View>
);

export default function Menu() {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    /**
     * 1. Implement this function
     * Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
     * The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
     * So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
     */
    const fetchData = async () => {
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
            console.error('Error fetching data:', error);
            Alert.alert('An error occurred while fetching the menu data. Please try again later.');
            return []; // Return an empty array to handle gracefully
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();

                if (!menuItems.length) {
                    const menuItems = await fetchData();
                    saveMenuItems(menuItems);
                }

                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                // If all filters are deselected, all categories are active
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search"
                placeholderTextColor="white"
                onChangeText={handleSearchChange}
                value={searchBarText}
                style={styles.searchBar}
                iconColor="white"
                inputStyle={{ color: 'white' }}
                elevation={0}
            />
            <Filters
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <SectionList
                style={styles.sectionList}
                sections={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item title={item.title} price={item.price} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#495E57',
    },
    sectionList: {
        paddingHorizontal: 16,
    },
    searchBar: {
        marginBottom: 24,
        backgroundColor: '#495E57',
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        paddingVertical: 8,
        color: '#FBDABB',
        backgroundColor: '#495E57',
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
});
