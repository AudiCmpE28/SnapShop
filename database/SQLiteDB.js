import * as SQLite from "expo-sqlite";


/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))
// create and return db object
const db = SQLite.openDatabase("imgDB", 1.3);
db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'));

export class database {
    static resetTable1() {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE IF EXISTS ItemDetails;", [],
                () => { console.log("Dropped ItemDetails"); },
                (_, error) => reject(error));
        })
    }
    static resetTable2() {
        db.transaction((tx) => {
            tx.executeSql("  DROP TABLE IF EXISTS RecentItems;", [],
                () => { console.log("Dropped RecentItems"); },
                (_, error) => reject(error));
        })
    }
    static resetTable3() {
        db.transaction((tx) => {
            tx.executeSql("  DROP TABLE IF EXISTS UserDetails;", [],
                () => { console.log("Dropped UserDetails"); },
                (_, error) => reject(error));
        })
    }
    // static resetTable4() {
    //     db.transaction((tx) => {
    //         tx.executeSql("  DROP TABLE IF EXISTS UserRecentItems;", [],
    //             () => { console.log("Dropped UserRecentItems"); },
    //             (_, error) => reject(error));
    //     })
    // }
    static reset() {
        this.resetTable1();
        this.resetTable2();
        this.resetTable3();
        // this.resetTable4();
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
        // console.log("Inside initDB");
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                // console.log("now creating recentitems table");
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS RecentItems (uID INTEGER PRIMARY KEY, rID INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT, imgName TEXT)",
                    [],
                    () => { console.log("Created Table RecentItems"); resolve },
                    (_, error) => reject(error)
                );
                // console.log("...finished");
                // console.log("now creating itemdetails table");
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS ItemDetails (iID INTEGER PRIMARY KEY AUTOINCREMENT , itemUrl TEXT, itemName TEXT, storeName TEXT, price REAL, referenceID INTEGER, FOREIGN KEY(referenceID) REFERENCES RecentItems(rID) ON DELETE CASCADE)",
                    [],
                    () => {
                        console.log("Created Table ItemDetails");
                        resolve
                    },
                    (_, error) => reject(error)
                );
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS UserDetails (uID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, userEmail TEXT, userPass TEXT)",
                    [],
                    () => {
                        console.log("Created Table UserDetails");
                        resolve
                    },
                    (_, error) => reject(error)
                );
                // tx.executeSql(
                //     "CREATE TABLE IF NOT EXISTS UserRecentItems (uID INTEGER PRIMARY KEY AUTOINCREMENT, rID INTEGER PRIMARY KEY, FOREIGN KEY(uID) REFERENCES UserDetails(uID), FOREIGN KEY(rID) REFERENCES RecentItems(rID) ON DELETE CASCADE)",
                //     [],
                //     () => {
                //         console.log("Created Table UserRecentItems");
                //         resolve
                //     },
                //     (_, error) => reject(error)
                // );

                // console.log("...finished");
            });
        });
    }
    static limittrigger() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TRIGGER recent_limited AFTER INSERT ON RecentItems BEGIN DELETE FROM RecentItems WHERE rID = (SELECT MIN(rID) FROM RecentItems WHERE (SELECT COUNT(*) FROM RecentItems) >= 7); END",
                    [],
                    () => { console.log("Triggered Limit of Items"); resolve },
                    (_, error) => reject(error)
                );
            }
            )
        })
    }
    // static additemtrigger() {
    //   return new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //       tx.executeSql(
    //         "CREATE TRIGGER autoadditem AFTER INSERT ON RecentItems BEGIN INSERT INTO userItems (rID) = (SELECT MN(rID) FROM RecentItems WHERE (SELECT COUNT(*) FROM RecentItems) >= 7); END",
    //         [],
    //         () => { console.log("Triggered Limit of Items"); resolve },
    //         (_, error) => reject(error)
    //       );
    //     }
    //     )
    //   })
    // }
    /**
     * Inserts the cloudinary link of specified item to RecentItems database
     * @param {*} imageurl 
     * @param {*} imgName 
     * @returns 
     */
    static insertUrl_RecentItems(imageurl, imgName) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO RecentItems (uID, rID, imageUrl, imgName) values (?,?,?,?)",
                    [null, imageurl, imgName],
                    (_, result) => {
                        // console.log("Inside insertUrl_RecentItems, inserting...%d", result.insertId)
                        resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * Based on uID provided, Returns the cloudinary link and ID of the image with specified ID, -1 to return all.
     * @param {*} ID 
     * @returns 
     */
    static getRecentItem(uID,ID) {
        if (ID == -1) {
            // console.log("Inside getRecentItem ALL");
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM RecentItems where uID=(?) ORDER BY rID DESC LIMIT 10",
                        [uID],
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
            // console.log("Inside getRecentItem %d", ID);
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM RecentItems WHERE uID=(?) rID =(?) ORDER BY rID DESC LIMIT 10",
                        [uID,ID],
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
    /**
     * Self explanatory
     * @param {*} itemurl 
     * @param {*} itemname 
     * @param {*} storename 
     * @param {*} price 
     * @param {*} referenceID 
     * @returns 
     */
    static insert_ItemDetails(itemurl, itemname, storename, price, referenceID) {
        // console.log("Inside insertUrl");
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
    /**
     * This function takes the ID referencing the RecentItem table and returns rows which correspond to it
     * @param {*} ID (-1 to return all)
     * @returns All columns from both tables
     */
    static getItemDetails(ID) {
        if (ID == -1) {
            // console.log("Inside getitemDetails ALL");
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID ORDER BY referenceID DESC",
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
            // console.log("Inside getitemDetails %d", ID);
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=? ORDER BY referenceID DESC LIMIT 5",
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

    /**
     * This version only returns the columns from ItemDetails table:
    * @ iID
    * @ itemUrl
    * @ itemname
    * @ storeName
    * @ price
    * @ referenceID
    * */
    static getItemDetailsv2(ID) {
        if (ID == -1) {
            console.log("Inside getitemDetailsv2 ALL");
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID ORDER BY referenceID DESC",
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
            console.log("Inside getitemDetailsv2 %d", ID);
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=? ORDER BY referenceID DESC LIMIT 5",
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
    /**
     * Cascading Delete of itemDetails and recentImage.
     * @param {ID} ID rID of RecentItem
     */
    static imgDelete(uID,ID) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM RecentItems where uID=? ANDr ID=?", [uID,ID],
                    (_, result) => {
                        resolve(result.rowsAffected);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * Pass in ID from RecentImage table, and the imgName you would like to give it.
     * @param {*} ID 
     * @param {*} imgName  
     */
    static update_imgName(uID,ID, imgName) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE RecentItems SET imgName=? WHERE uID=? AND rID=?", [imgName,uID, ID],
                    (_, result) => {
                        resolve;
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * Adds username to database with given parameters
     * @param {*} username 
     * @param {*} email 
     * @param {*} pass 
     * @returns the id of newly added user
     */
    static registerUser(username, email, pass) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO UserDetails (uID, userName, userEmail, userPass) values (?,?,?,?)",
                    [null, username, email, pass],
                    (_, result) => {
                        resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * INSERTS userID and recentItem ids 
     * @param {*} uID 
     * @param {*} rID 
     * @returns 
     */
    // static adduseritems(uID, rID) {
    //     return new Promise((resolve, reject) => {
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "INSERT INTO UserRecentItems (uID, rID) values (?,?)",
    //                 [uID, rID],
    //                 (_, result) => {
    //                     resolve(result.insertId)
    //                 },
    //                 (_, error) => reject(error)
    //             );
    //         });
    //     });
    // }
    /**
     * get the userdetails when given an ID
     * @param {*} uID 
     * @returns 
     */
    static getuserwithID(uID) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM UserDetails where uID=(?)",
                    [uID],
                    (_, result) => {
                        resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * Returns the userID (to be used as a session token?) when the correct username and password(hashed) are inserted
     * @param {*} userName 
     * @param {*} userPass 
     * @returns 
     */
    static getuser(userName, userPass) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT uID FROM UserDetails where userName=(?) AND userPass=(?)",
                    [userName, userPass],
                    (_, result) => {
                        resolve(result.insertId)
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    /**
     * Gets all recent items of a specified userid
     * @param {*} uID 
     * @returns 
     */
    // static getuseritems(uID) {
    //     return new Promise((resolve, reject) => {
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "SELECT * FROM UserRecentItems INNER JOIN RecentItems on rID=rID",
    //                 [uID],
    //                 (_, result) => {
    //                     resolve(result.insertId)
    //                 },
    //                 (_, error) => reject(error)
    //             );
    //         });
    //     });
    // }










} //database
