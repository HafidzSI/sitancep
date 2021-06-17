import firebase from 'firebase'


firebase.initializeApp({
    apiKey: "AIzaSyCI4UT7y3RGn4bGFUGbbh4EGCwSVFqW6xo",
    authDomain: "sitancep.firebaseapp.com",
    projectId: "sitancep",
    storageBucket: "sitancep.appspot.com",
    messagingSenderId: "105363604636",
    appId: "1:105363604636:web:ecf5d7f16996be85089959"
})

// const storageRef = firebase.storage().ref();

const FIREBASE = firebase

export default FIREBASE