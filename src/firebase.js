import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBUj4l2lqpuR7tVwKvYue_KaSkvd3yQq1I',
  authDomain: 'amz-clone-69649.firebaseapp.com',
  databaseURL: 'https://amz-clone-69649.firebaseio.com',
  projectId: 'amz-clone-69649',
  storageBucket: 'amz-clone-69649.appspot.com',
  messagingSenderId: '195104630397',
  appId: '1:195104630397:web:f0fd18d9584c0fc641b314',
  measurementId: 'G-CBNH7VV0S4'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
