import * as SQLite from 'expo-sqlite';

import SQL_QUERIES from './db-queries';
import { IPost } from '../types/post';

const db = SQLite.openDatabase('dbName', '1.0');

export const initDb = ():Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transactionAsync((transaction: SQLite.SQLTransactionAsync) => {
      return transaction
        .executeSqlAsync(SQL_QUERIES.CREATE_TABLE_QUERY)
        .then((value: SQLite.ResultSet) => {
          console.log("Table created successfully")
          resolve(true);
        })
        .catch((reason: any) => {
          console.log("Failed to create a table")
          console.error(reason);
          reject(reason);
        });
    });
  });
};

export const getAllPlaces = () => {
  return new Promise((resolve, reject) => {
    db.transactionAsync((transaction: SQLite.SQLTransactionAsync) => {
      return transaction.executeSqlAsync(SQL_QUERIES.GET_PLACES_LIST)
      .then((value: SQLite.ResultSet) => {
        resolve(value);
      })
      .catch((reason: any) => {
        console.error(reason);
        reject(reason);
      })
    })
  })
}

export const addPlace = (placeDetails: IPost) => {
  return new Promise((resolve, reject) => {
    console.log(placeDetails)
    db.transactionAsync((transaction: SQLite.SQLTransactionAsync) => {
      return transaction.executeSqlAsync(SQL_QUERIES.ADD_PLACE_QUERY, [
        placeDetails.name,
        placeDetails.image,
        placeDetails.location,
        placeDetails.coordinates.latitude,
        placeDetails.coordinates.longitude,
        placeDetails.locationSnapShot,
      ])
      .then((value: SQLite.ResultSet) => {
        resolve(value);
      })
      .catch((reason: any) => {
        console.error(reason);
        reject(reason)
      })
    })
  })
}

export const getPlaceById = (id: number) => {
  return new Promise((resolve, reject) => {
    db.transactionAsync((transaction: SQLite.SQLTransactionAsync) => {
      return transaction.executeSqlAsync(SQL_QUERIES.GET_PLACE_BY_ID, [id])
      .then((value: SQLite.ResultSet) => {
        console.log(value.rows)
        resolve(value);
      })
      .catch((reason: any) => {
        reject(reason)
      })
    })
  })
}