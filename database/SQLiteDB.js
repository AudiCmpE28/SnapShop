import * as SQLite from 'expo-sqlite';

import { View, Text, TouchableOpacity, ScrollView, RecyclerViewBackedScrollViewBase } from 'react-native';

// create and return db object

export const db= SQLite.openDatabase('imgDB');

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
              tx.executeSql('INSERT INTO RecentItems (ID, itemURL) values (?,?)',[null,url],(_, result) => {console.log(JSON.stringify(result)),(_,error)=>console.log(JSON.stringify(error))});
            }
        )
}




export function getItemwithID(imgDB,ID)
{
    if(ID == -1)
    {
        console.log('Inside getItemwithID ALL')
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems',[],(_, result) => {console.log(JSON.stringify(result))});
            // tx.executeSql('SELECT * FROM RecentItems',[],(_,{ rows })=>console.log(JSON.stringify(rows)))
            // tx.executeSql('SELECT * FROM RecentItems',[],console.log(SQLite.ResultSet),console.log(console.error()))
        })
    }
    if(ID>-1)
    {
        console.log('Inside getItemwithID %d',ID)
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID,],(trans, result) => {console.log(trans, result)});
            // tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID],console.log(SQLite.ResultSet),console.log(console.error()))
        })
    }
    // console.log("getItemwithID success %d",ID)

}