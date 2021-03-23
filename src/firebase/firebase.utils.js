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

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  // user exists, lets query in the firestore for see if user exists there
    // ref, used of CRUD
  const userRef = firestore.doc(`users/${userAuth.uid}`);
    // snapshot, represents our data
  const snapShot = await userRef.get();

  console.log('snapshot', snapShot);
  if (!snapShot.exists) {
    // create the user, using the userRef
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user: ', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;