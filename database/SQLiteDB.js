import * as SQLite from "expo-sqlite";

// create and return db object
const db = SQLite.openDatabase("imgDB2");

/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))

// db.transaction((tx) => {
//   tx.executeSql("DROP TABLE IF EXISTS RecentItems"); //reset of db on each startup, temporary
// });
export class database {
  static reset() {
    console.log("inside reset");
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS RecentItems"); //reset of db on each startup, temporary
      tx.executeSql("DROP TABLE IF EXISTS ItemDetails");
    });
  }
  /**
   * Creates a table RecentItems containing:
   * @param rID The Id of the picture
   * @param imageUrl The image URL
   * 
   * Creates a table ItemDetails: 
   * @param itemUrl item url
   * @param itemName product image refers to
   * @param storeName Name of store where said item can be purchased
   *  @param price Price of said item
   *  @param referenceID Foreignkey referencing table1 rID
   * */
  static dbinit() {
    // console.log("Inside initDB");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // console.log("now creating recentitems table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS RecentItems (rID INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT)",
          [],
          resolve,
          (_, error) => reject(error)
        );
        // console.log("...finished");
        // console.log("now creating itemdetails table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItemDetails (iID INTEGER AUTOINCREMENT , itemUrl TEXT, itemName TEXT, storeName TEXT, price REAL, referenceID INTEGER, FOREIGN KEY(referenceID) REFERENCES RecentItems(rID))",
          [],
          resolve,
          (_, error) => reject(error)
        );
        // console.log("...finished");
      });
    });
  }

  static insertUrl_RecentItems(imageurl) {
    console.log("Inside insertUrl, inserting...");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO RecentItems (rID, imageUrl) values (?,?)",
          [null, imageurl],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }
  static insert_ItemDetails(itemurl, itemname, storename, price, referenceID) {
    console.log("Inside insertUrl");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO ItemDetails (iID, itemUrl, itemName, storeName, price, referenceID) values (?,?,?,?,?,?)",
          [1, itemurl, itemname, storename, price, referenceID],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }
//JOIN WITH ItemDetails TABLE TO RETURN ALL columns with constraint rID==referenceID
  static getitemDetails(ID){
    if (ID == -1) {
      console.log("Inside getItemwithID ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON ItemDetails.referenceID=RecentItems.rID", 
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
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON ItemDetails.referenceID=RecentItems.rID where ItemDetails.rID=?", 
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
