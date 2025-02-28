import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

/**
 * Create the menu table if it doesn't already exist.
 */
export const createMenuTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS menu (
                                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 name TEXT NOT NULL,
                                                 price REAL NOT NULL,
                                                 description TEXT NOT NULL,
                                                 image TEXT NOT NULL,
                                                 category TEXT NOT NULL
             );`,
            [],
            null,
            (txObj, error) => console.log("Error creating table", error)
        );
    });
};

/**
 * Insert menu items into the database.
 * @param {Array} menuItems - Array of menu items to store in the database.
 */
export const insertMenuItems = (menuItems) => {
    db.transaction((tx) => {
        menuItems.forEach((item) => {
            tx.executeSql(
                `INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);`,
                [item.name, item.price, item.description, item.image, item.category],
                null,
                (txObj, error) => console.log("Error inserting item", error)
            );
        });
    });
};

/**
 * Retrieve all menu items from the database.
 * @param {Function} successCallback - Function to handle the retrieved menu data.
 */
export const getMenuItems = (successCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM menu;`,
            [],
            (txObj, resultSet) => successCallback(resultSet.rows._array),
            (txObj, error) => console.log("Error fetching menu items", error)
        );
    });
};

/**
 * Clear the menu table. (Optional, for debugging or refreshing)
 */
export const clearMenuTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM menu;`,
            [],
            null,
            (txObj, error) => console.log("Error clearing menu table", error)
        );
    });
};

/**
 * Filter menu items by name (case-insensitive, partial match) and categories.
 * @param {string} searchText - Search text to filter dish names.
 * @param {Array} categories - Array of active categories (optional, empty array if inactive).
 * @param {Function} successCallback - Function to handle the filtered menu data.
 */
export const filterMenuByNameAndCategories = (searchText, categories, successCallback) => {
    const baseQuery = `SELECT * FROM menu WHERE 1=1`; // Base to append filters
    const nameFilter = searchText ? ` AND LOWER(name) LIKE LOWER(?)` : ''; // Case-insensitive name matching
    const categoryFilter = categories.length
        ? ` AND LOWER(category) IN (${categories.map(() => '?').join(', ')})`
        : ''; // Case-insensitive categories filtering
    const fullQuery = `${baseQuery}${nameFilter}${categoryFilter};`;

    const params = [];
    if (searchText) params.push(`%${searchText}%`); // Search text param
    params.push(...categories.map((c) => c.toLowerCase())); // Lowercase categories

    db.transaction((tx) => {
        tx.executeSql(
            fullQuery,
            params,
            (txObj, resultSet) => successCallback(resultSet.rows._array),
            (txObj, error) => console.log("Error filtering menu items by name and categories", error)
        );
    });
};