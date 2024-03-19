// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDLy7ewDXL6l9eXh3ysUuF48NkjNaMQR4Y",
	authDomain: "college-recommendation-4fbb9.firebaseapp.com",
	projectId: "college-recommendation-4fbb9",
	storageBucket: "college-recommendation-4fbb9.appspot.com",
	messagingSenderId: "276285419679",
	appId: "1:276285419679:web:5cd36cd7a2584d506472aa",
	measurementId: "G-QMEBT9SM1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

