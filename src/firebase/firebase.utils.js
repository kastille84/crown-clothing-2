import firebase from 'firebase/app';
import 'firebase/firestore'; //db
import 'firebase/auth'; // auth functionality


const config = {
  apiKey: "AIzaSyAoDls6Qr4QMWsvBeacGeNgaABRMXjg9to",
  authDomain: "crwn-db-d2efc.firebaseapp.com",
  databaseURL: "https://crwn-db-d2efc.firebaseio.com",
  projectId: "crwn-db-d2efc",
  storageBucket: "crwn-db-d2efc.appspot.com",
  messagingSenderId: "569777474464",
  appId: "1:569777474464:web:7538afb4a29154b0d6b2c5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;