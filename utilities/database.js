import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from '../utilities/utils';

const db = SQLite.openDatabase('little_lemon');

export async function createMenuTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

/**
 * 2. Implement a single SQL statement to save all menu data in a table called menuitems.
 * Check the createTable() function above to see all the different columns the table has
 * Hint: You need a SQL statement to insert multiple rows at once.
 **/
export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    // Create SQL placeholders for each row
    const placeholders = menuItems.map(() => '(?, ?, ?, ?)').join(', ');
    const query = `
      INSERT INTO menuitems (id, title, price, category)
      VALUES ${placeholders}
    `;

    // Flatten menuItems data for the parameterized query
    const values = menuItems.flatMap(({ id, title, price, category }) =>
        [id, title, price, category]
    );

    tx.executeSql(
        query,
        values,
        (_, result) => {
          console.log('Menu items saved successfully:', result);
        },
        (_, error) => {
          console.error('Error saving menu items:', error);
          return true; // Rollback on error
        }
    );
  });
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Create placeholders for the active categories
      const categoryPlaceholders = activeCategories.map(() => '?').join(', ');

      // SQL query to filter by title (substring match) and categories
      const sql = `
        SELECT * FROM menuitems
        WHERE title LIKE ?
        AND category IN (${categoryPlaceholders})
      `;

      // Parameters: the query and the active categories
      const params = [`%${query}%`, ...activeCategories];

      // Execute the query
      tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            resolve(rows._array); // Return the filtered results
          },
          (_, error) => {
            console.error('Error filtering by query and categories:', error);
            reject(error); // Reject the promise on error
            return true; // Rollback on error
          }
      );
    });
  });
}

