// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "XXXXXXXXXX",
	authDomain: "XXXXXXXXXX",
	projectId: "XXXXXXXXXX",
	storageBucket: "XXXXXXXXXX",
	messagingSenderId: "XXXXXXXXXX",
	appId: "XXXXXXXXXX",
	measurementId: "XXXXXXXXXX"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };