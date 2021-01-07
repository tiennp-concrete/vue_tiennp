import * as firebase from "firebase/app";
import firebaseConfig from './firebaseConfig';

import 'firebase/database';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

export const userRef = database.ref('user');

