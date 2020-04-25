// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase"
import FirebaseKey from '../../constants/FirebaseKey'
// Add the Firebase products that you want to use
import "firebase/firestore";

// Initialize Firebase 
var dbFirebase= !firebase.apps.length ? firebase.initializeApp(FirebaseKey.FirebaseConfig):firebase.app();
//var dbFirebase = firebase.initializeApp(FirebaseKey.FirebaseConfig)

// multimedia instance
var db_storage = dbFirebase.storage()
// database instance
export var db_firestore = dbFirebase.firestore()


// Creates a new document to the given collection
// Will also save the id of document inside the request 
// @param collection The collection name
// @request request The json formated request.
// @return The id of the created document
export function createDocument(collection, request){
    var entry_id = collection.doc().id
    collection.doc(entry_id).set(request)
    collection.doc(entry_id).set({"id":entry_id},{"merge":true})
    return entry_id
}

// Get a single document by id
// @param collection the collection name
// @param document_id The id of the document desired
// @return The document in json format
export async function getDocument(collection,document_id){
    var docRef = collection.doc(document_id)
    await docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var data = doc.data()
            return data
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

// Update a single document by id
// @param collection the collection name
// @param document_id The id of the document desired to update
// @param request The updated values in json format
// @return OK if successfull
export function updateDocument(collection,document_id,request){
    var docRef = collection.doc(document_id)
    docRef.get().then(function(doc) {
        if (doc.exists) {
            collection.doc(document_id).set(request)
            return "OK"
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

// Delete a single document by id
// @param collection the collection name (psot,user,business)
// @param document_id The id of the document desired to delete
// @return OK if successfull
export function deleteDocument(collection,document_id){
    var docRef = collection.doc(document_id)
    docRef.get().then(function(doc) {
        if (doc.exists) {
            collection.doc(document_id).delete()
            return "OK"
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}