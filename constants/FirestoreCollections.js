import { db_firestore } from '../store/actions/FirestoreActions'

//Available collections
export var userCollection = db_firestore.collection("users")
export var productCollection = db_firestore.collection("products")
export var orderCollection = db_firestore.collection("orders")