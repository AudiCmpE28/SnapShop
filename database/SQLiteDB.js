import * as SQLite from "expo-sqlite";


/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))
// create and return db object
const db = SQLite.openDatabase("imgDB", 1.2);
db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'));

export class database {
  static resetTable1() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS ItemDetails;", [],
        () => { console.log("Dropped Tables"); },
        (_, error) => reject(error));
    })
  }
  static resetTable2() {
    db.transaction((tx) => {
      tx.executeSql("  DROP TABLE IF EXISTS RecentItems;", [],
        () => { console.log("Dropped Tables"); },
        (_, error) => reject(error));
    })
  }

  static reset() {
    this.resetTable1();
    this.resetTable2();
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
   * @param price Price of said item
   * @param referenceID Foreignkey referencing table1 rID
   * */
  static dbinit() {
    console.log("Inside initDB");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // console.log("now creating recentitems table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS RecentItems (rID INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT)",
          [],
          () => { console.log("Created RecentItems"); resolve },
          (_, error) => reject(error)
        );
        // console.log("...finished");
        // console.log("now creating itemdetails table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItemDetails (iID INTEGER PRIMARY KEY AUTOINCREMENT , itemUrl TEXT, itemName TEXT, storeName TEXT, price REAL, referenceID INTEGER, FOREIGN KEY(referenceID) REFERENCES RecentItems(rID))",
          [],
          () => { console.log("Created ItemDetails"); resolve },
          (_, error) => reject(error)
        );
        // console.log("...finished");
      });
    });
  }

  static insertUrl_RecentItems(imageurl) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO RecentItems (rID, imageUrl) values (?,?)",
          [null, imageurl],
          (_, result) => {
            // console.log("Inside insertUrl_RecentItems, inserting...%d", result.insertId)
            resolve(result.insertId)
          },
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
          [null, itemurl, itemname, storename, price, referenceID],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }
  static getItemDetails(ID) {
    if (ID == -1) {
      console.log("Inside getitemDetails ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      console.log("Inside getitemDetails %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=?",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
  static getItemDetailsv2(ID) {
    if (ID == -1) {
      console.log("Inside getitemDetails ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      console.log("Inside getitemDetails %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=?",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
  static getRecentItem(ID) {
    if (ID == -1) {
      console.log("Inside getRecentItem ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      console.log("Inside getRecentItem %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems WHERE rID =?",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
} //database
