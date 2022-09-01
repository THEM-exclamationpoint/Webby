// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Webby
// const firebaseConfig = {
//   apiKey: 'AIzaSyDmFbqZb3X-E5ZigYQx4sNQM_8AXjEyAUc',
//   authDomain: 'webster-12a69.firebaseapp.com',
//   projectId: 'webster-12a69',
//   storageBucket: 'webster-12a69.appspot.com',
//   messagingSenderId: '150449082022',
//   appId: '1:150449082022:web:993599dba14d4211a16e67',
//   measurementId: 'G-0RMLVGPL4S',
// }

//Webby2
const firebaseConfig = {
  apiKey: "AIzaSyAWg2P1znzVm686OX_TlqJnmvq_Ym3K72U",
  authDomain: "webby2-ea4e7.firebaseapp.com",
  projectId: "webby2-ea4e7",
  storageBucket: "webby2-ea4e7.appspot.com",
  messagingSenderId: "537189817627",
  appId: "1:537189817627:web:4f594041c23124168d07be",
  measurementId: "G-MFR0JXBV3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)

const db = getFirestore(app)

export {db, app, firebaseConfig}
