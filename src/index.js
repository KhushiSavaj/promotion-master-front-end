import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// function initializeUI(swRegistration) {
//   // Set the initial subscription value
//   let isSubscribed;
//   if (isSubscribed) {
//   } else {
//     subscribeUser(swRegistration, isSubscribed);
//   }
//   swRegistration.pushManager.getSubscription().then(function (subscription) {
//     let isSubscribed = !(subscription === null);

//     if (isSubscribed) {
//     } else {
//     }
//   });
// }

// function subscribeUser(swRegistration, isSubscribed) {
//   const applicationServerKey =
//     "BIxuT7b1ij8_c3AS70PXojyVTtknokfvEklCQ7emMkhp41PR0y8iKCH7u_6ZdXtaptRBUb2RuQPW_Khr2oockBQ";
//   swRegistration.pushManager
//     .subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: applicationServerKey,
//     })
//     .then(function (subscription) {
//       isSubscribed = true;
//     })
//     .catch(function (err) {
//     });
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {

      // let swRegistration = registration;
      // initializeUI(swRegistration);
    })
    .catch(function (err) {
    });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
