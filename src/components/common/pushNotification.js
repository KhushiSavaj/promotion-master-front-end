import firebase from "firebase";
import "firebase/messaging";

const firebaseInit = firebase.initializeApp({
  apiKey: "AIzaSyCR9FfzI26a6Q4Fs4jur0aAGye4MsP-AZg",
  authDomain: "promo-all-star.firebaseapp.com",
  projectId: "promo-all-star",
  storageBucket: "promo-all-star.appspot.com",
  messagingSenderId: "96539452930",
  appId: "1:96539452930:web:6267451687134c7c8ba91b",
  measurementId: "G-QHCKTPKQ2F"
});
let messaging = null;
if (firebase.messaging.isSupported() && "Notification" in window && Notification.permission === "granted") {
  messaging = firebaseInit.messaging();
  messaging.getToken(
    {
      vapidKey: "BARFC-vPpcYjhcuW3r97xPzCJhZnSx18baRgMEqK8MFkPieKrXHJu62REQiDb5KKBRkNqMPRYWHd1GPUGHuYR48"
    }
  )
} else {
  Notification.requestPermission().then(function (permission) {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      new Notification("Hi there!");
    }
  });
}
export { messaging }