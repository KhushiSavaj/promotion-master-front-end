importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyABUta46auxBhkzLIckED7AnQ2uVf02nhQ",
    // authDomain: "promoall-b323c.firebaseapp.com",
    projectId: "promoall-b323c",
    // storageBucket: "promoall-b323c.appspot.com",
    messagingSenderId: "204385538079",
    appId: "1:204385538079:web:13bd00aa92253b8a62852a",
    // measurementId: "G-22W8VZ1P78",
});


if(firebase.messaging.isSupported()){
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification("my notification title");
      });
    return promiseChain;
  });
}