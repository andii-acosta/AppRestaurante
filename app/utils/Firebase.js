import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCSHWP1VEuCXANM-FZeC-ScS3etxd612MQ",
    authDomain: "apprestaurante-b8e50.firebaseapp.com",
    databaseURL: "https://apprestaurante-b8e50.firebaseio.com",
    projectId: "apprestaurante-b8e50",
    storageBucket: "apprestaurante-b8e50.appspot.com",
    messagingSenderId: "333252239090",
    appId: "1:333252239090:web:3c66c93e917639c996fa6b"
  };

  export const firebaseApp= firebase.initializeApp(firebaseConfig);