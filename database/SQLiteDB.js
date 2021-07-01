import * as SQLite from 'expo-sqlite';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// create and return db object

export const db= SQLite.openDatabase('imgDB');



/**
 * Creates a table RecentItems containing: 
 * @param ID The Id of the picture
 * @param itemURL The image URL
 * @param itemName product image refers to
 * @param storeName Name of store where said item can be purchased
 * @param price Price of said item
 * */
export function initDB(){

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS RecentItems (ID INTEGER PRIMARY KEY AUTOINCREMENT, itemURL TEXT, itemName TEXT, storeName TEXT, price REAL)'
        )
    })
}

export  function insertUrl(imgDB,url){
    imgDB.transaction(tx =>{
        tx.executeSql('INSERT INTO RecentItems (ID, itemURL) values (?,?)',[null,url],console.log(SQLite.ResultSet),console.log(console.error()))
})

// console.log("insertURL success %s",url)

}

export function getItemwithID(imgDB,ID)
{
    if(ID == -1){
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems',[],(_,{ rows })=>console.log(JSON.stringify(rows)))
            // tx.executeSql('SELECT * FROM RecentItems',[],console.log(SQLite.ResultSet),console.log(console.error()))

        })
    }
    if(ID>=-1)
    {
        imgDB.transaction(tx =>{
            tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID,],(_,{ rows })=>console.log(JSON.stringify(rows)))
            // tx.executeSql('SELECT * FROM RecentItems WHERE ID =?',[ID],console.log(SQLite.ResultSet),console.log(console.error()))
        })
    }
    alert(JSON.stringify(rows))
    // console.log("getItemwithID success %d",ID)

}