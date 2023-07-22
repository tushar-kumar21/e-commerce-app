import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getFirestore, setDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";

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
export const db = getFirestore();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [cartSize, setCartSize] = useState(0);
  const [productsData, setProductsData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalDiscount, setTotalDiscount] = useState(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }

  const userCollection = async () => {
    if (currentUser) {
      try {
        const docRef = doc(db, `${currentUser.uid}`, `${currentUser.displayName}_Details`);
        await setDoc(docRef, {
          name: currentUser.displayName,
          email: currentUser.email,
        })
      } catch (error) {
        console.log(error)
      }
    };
  }

  const addItemToCart = async (e) => {
    const name = e.target.getAttribute('name');
    const price = e.target.getAttribute('price');
    const img = e.target.getAttribute('img');
    const discount = e.target.getAttribute('discount');
    const brand = e.target.getAttribute('brand');
    const category = e.target.getAttribute('category');
    const stock = e.target.getAttribute('stock');
    const id = e.target.getAttribute('id');
    const desc = e.target.getAttribute('desc')    

    if(stock && desc && category){
    try {
      const userCollectionRef = collection(db, `${currentUser.uid}`);
      const productDocRef = doc(userCollectionRef, `${currentUser.displayName}_Details`);
      const productCollectionRef = collection(productDocRef, 'products');      
      await setDoc(doc(productCollectionRef, `product_Details${id}`), {
        name: name,
        price: price,
        brand: brand,
        image: img,
        discount: discount,
        category: category,
        stock: stock,
        id:id && id,
        quantity:1,
        desc:desc
      })

      console.log("Data added successfully!");
    } catch (error) {
      console.log(error);
    }
    }
  };
  
  let priceSum = 0;
  let discountSum = 0;
  const getCartSize = async () => {
    if (currentUser) {
      const userCollectionRef = collection(db, `${currentUser.uid}`);
      const productDocRef = doc(userCollectionRef, `${currentUser.displayName}_Details`);
      const productCollectionRef = collection(productDocRef, 'products');
      const docSize = await getDocs(productCollectionRef)
      const size = docSize.size;

      setCartSize(size)            
      docSize.forEach((val)=>{
        priceSum += parseInt(val.data().price);                                
      })
      setTotalPrice(priceSum)      

      docSize.forEach((val)=>{
        discountSum += parseInt(val.data().discount)        
      })
      setTotalDiscount(discountSum)
      console.log("yes done!")
    }
  }

  const getProductsData = async () => {
    if (currentUser) {
      const userCollectionRef = collection(db, `${currentUser.uid}`);
      const productDocRef = doc(userCollectionRef, `${currentUser.displayName}_Details`);
      const productCollectionRef = collection(productDocRef, 'products');

      const data = [];

      onSnapshot(productCollectionRef, (snap)=>{
        data.length = 0;
        snap.forEach((docs)=>{
          data.push(docs.data());
        });
        setProductsData(data);
      });
    }
  }


  return (
    <FirebaseContext.Provider value={{ signInWithGoogle, getCurrentUser, userCollection, currentUser, addItemToCart, cartSize, getCartSize, productsData, getProductsData, totalPrice, setTotalPrice, setTotalDiscount, totalDiscount, setProductsData }}>
      {children}
    </FirebaseContext.Provider>
  )
}