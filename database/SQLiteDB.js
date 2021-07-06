import * as SQLite from "expo-sqlite";

// create and return db object
export const db = SQLite.openDatabase("imgDB");

/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))

// db.transaction((tx) => {
//   tx.executeSql("DROP TABLE IF EXISTS RecentItems"); //reset of db on each startup, temporary
// });
export class database {
  /**
   * Creates a table RecentItems containing:
   * @param ID The Id of the picture
   * @param imageUrl The image URL
   * @param itemName product image refers to
   * @param storeName Name of store where said item can be purchased
   * @param price Price of said item
   * */
  static dbinit() {
    console.log("Inside initDB");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS RecentItems (ID INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT, itemName TEXT, storeName TEXT, price REAL)",
          [],
          resolve,
          (_, error) => reject(error)
        );
      });
    });
  }

  static insertUrl(url) {
    console.log("Inside insertUrl");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO RecentItems (ID, imageUrl) values (?,?)",
          [null, url],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }

  static getItemwithID(ID) {
    if (ID == -1) {
      console.log("Inside getItemwithID ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems",
            [],
            (_, result) => {
              console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      console.log("Inside getItemwithID %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems WHERE ID =?",
            [ID],
            (_, result) => {
              console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
} //database
