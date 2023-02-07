import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxl3BUo1sF_Lpn8hoalEIp07d7AzYn44U",
  authDomain: "auth-web-375413.firebaseapp.com",
  projectId: "auth-web-375413",
  storageBucket: "auth-web-375413.appspot.com",
  messagingSenderId: "431808870761",
  appId: "1:431808870761:web:40de8b95452c81530fa5f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
