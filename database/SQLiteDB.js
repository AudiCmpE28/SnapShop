import * as SQLite from 'expo-sqlite';

// create and return db object
export const db= SQLite.openDatabase('imgDB');

/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))

/**
 * Creates a table RecentItems containing: 
 * @param ID The Id of the picture
 * @param itemURL The image URL
 * @param itemName product image refers to
 * @param storeName Name of store where said item can be purchased
 * @param price Price of said item
 * */
export function initDB(){
    console.log('Inside initDB');
    // db.transaction(tx => {
    //     tx.executeSql(
    //         'DROP TABLE IF EXISTS RecentItems'  //reset of db on each startup, temporary 
    //         )
    //     }
    // )
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS RecentItems (ID INTEGER PRIMARY KEY AUTOINCREMENT, itemURL TEXT, itemName TEXT, storeName TEXT, price REAL)')
    })
}

export  function insertUrl(imgDB,url){
        console.log('Inside insertUrl');
        imgDB.transaction(
            tx => {
              tx.executeSql('INSERT INTO RecentItems (ID, itemURL) values (?,?)',[null,url],(_, result) => {console.log(JSON.stringify(result))},(_,error)=>{console.log(JSON.stringify(error))});
            }//                                                                                             ^ instead of console logging, try return{resultobj=Json.stringify(result)} ?
        )
}




export function getItemwithID(imgDB,ID)
{
    if(ID == -1)
    {
        console.log('Inside getItemwithID ALL')
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems',[],(_, result) => {console.log(JSON.stringify(result.rows._array))});
            // tx.executeSql('SELECT * FROM RecentItems',[],(_, result) => {console.log(JSON.stringify(result))});

        })
    }
    if(ID>-1)
    {
        console.log('Inside getItemwithID %d',ID)
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID,],(_, result) => {console.log(JSON.stringify(result.rows._array))});
            // tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID],console.log(SQLite.ResultSet),console.log(console.error()))
        })
    }
    // console.log("getItemwithID success %d",ID)

}