importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDTKYy7hrTcJkYNLDlsownmuRfXxmxc8FE",
  authDomain: "notification-2d825.firebaseapp.com",
  projectId: "notification-2d825",
  storageBucket: "notification-2d825.firebasestorage.app",
  messagingSenderId: "902789459042",
  appId: "1:902789459042:web:6275d6caaef3154113353b",
  measurementId: "G-5RKN90KEKN"
});

const messaging = firebase.messaging();
