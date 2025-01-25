// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);




/*


VITE_apiKey=AIzaSyCYYt7E_xaag2K9QEhPuWtVsQBIe_7YDsE
  VITE_authDomain=blood-donation-applicati-9d609.firebaseapp.com
  VITE_projectId=blood-donation-applicati-9d609
  VITE_storageBucket=blood-donation-applicati-9d609.firebasestorage.app
  VITE_messagingSenderId=557398025947
  VITE_appId=1:557398025947:web:b5c8aa780e080e5b3e8efe


*/