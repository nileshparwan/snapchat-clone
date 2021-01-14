import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCeuD_3QbgnZ2KeL2idHe3ezJ1U_zMySso",
    authDomain: "snapchat-clone-c.firebaseapp.com",
    projectId: "snapchat-clone-c",
    storageBucket: "snapchat-clone-c.appspot.com",
    messagingSenderId: "234245238054",
    appId: "1:234245238054:web:7b38c9b6586513440f65e7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };