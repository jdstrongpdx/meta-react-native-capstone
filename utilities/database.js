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
        () => console.log("Table created successfully"),
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
          () => console.log(`Inserted item: ${item.name}`),
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
        () => console.log("Menu table cleared"),
        (txObj, error) => console.log("Error clearing menu table", error)
    );
  });
};
