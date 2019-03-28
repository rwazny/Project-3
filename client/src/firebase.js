import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCaCOX-thcFCE6LyC1f6355JT1GwIxgR0Q',
  authDomain: 'dbphit.firebaseapp.com',
  databaseURL: 'https://dbphit.firebaseio.com',
  projectId: 'dbphit',
  storageBucket: 'dbphit.appspot.com',
  messagingSenderId: '148507230979'
};

firebase.initializeApp(config);

export default firebase.auth();

// Add a realtime Listner
