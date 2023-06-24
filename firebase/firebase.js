import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useContext } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyA_UVFm_d-KZJdiZr2aVF70J_fswB0wWnU",
    authDomain: "shopexpress-55548.firebaseapp.com",
    projectId: "shopexpress-55548",
    storageBucket: "shopexpress-55548.appspot.com",
    messagingSenderId: "933803831141",
    appId: "1:933803831141:web:d814d2b73e8355d095bb8c",
    measurementId: "G-HTN12VK9LH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = ({ children }) => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        }catch(error){
            console.log(error)
        }
    }

    return (
        <FirebaseContext.Provider value={{signInWithGoogle}}>
            {children}
        </FirebaseContext.Provider>
    )
}