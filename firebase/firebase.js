import { initializeApp } from "firebase/app";

import 
{
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup 
} from "firebase/auth";  

import 
{
  addDoc,
  collection,
  getFirestore,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc 
} from "firebase/firestore";

import 
{
  createContext,
  useContext,
  useReducer,
  useState 
} from "react";

import 
{
  ActionTypes,
  initialStates,
  reducer 
} from "@/components/reducer";

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
export const auth = getAuth();
export const db = getFirestore();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = ({ children }) => {

  const {
    SET_CURRENT_USER,
    SET_CART_SIZE,
    SET_ITEM_QUANTITY,
    SET_PRODUCTS_DATA,
    SET_TOTAL_PRICE,
    SET_TOTAL_DISCOUNT
  } = ActionTypes;

  const [state, dispatch] = useReducer(reducer, initialStates)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.log(error)
    }
  }
  const signInWithGithub = async () =>{
    const provider = new GithubAuthProvider();
    try{
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      console.log(user)
    } catch(error){
      console.log(error)
    }
  }

  const getCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: SET_CURRENT_USER, payload: user })
    })
  }

  const userCollection = async () => {
    if (state.currentUser) {
      try {
        const docRef = doc(db, `${state.currentUser.uid}`, `${state.currentUser.displayName}_Details`);
        await setDoc(docRef, {
          name: state.currentUser.displayName,
          email: state.currentUser.email,
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

    if (stock && desc && category) {
      try {
        const userCollectionRef = collection(db, `${state.currentUser.uid}`);
        const productDocRef = doc(userCollectionRef, `${state.currentUser.displayName}_Details`);
        const productCollectionRef = collection(productDocRef, 'products');
        await setDoc(doc(productCollectionRef, `product_Details${id}`), {
          name: name,
          price: price,
          brand: brand,
          image: img,
          discount: discount,
          category: category,
          stock: stock,
          id: id && id,
          quantity: 1,
          desc: desc
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
    if (state.currentUser) {
      const userCollectionRef = collection(db, `${state.currentUser.uid}`);
      const productDocRef = doc(userCollectionRef, `${state.currentUser.displayName}_Details`);
      const productCollectionRef = collection(productDocRef, 'products');
      const docSize = await getDocs(productCollectionRef)
      const size = docSize.size;

      dispatch({ type: SET_CART_SIZE, payload: size })
      docSize.forEach((val) => {
        priceSum += parseInt(val.data().price);
      })
      !state.totalPrice && dispatch({ type: SET_TOTAL_PRICE, payload: priceSum })

      docSize.forEach((val) => {
        discountSum += parseInt(val.data().discount)
      })
      !state.totalDiscount && dispatch({ type: SET_TOTAL_DISCOUNT, payload: discountSum })
      console.log("yes done!")
    }
  }

  const getProductsData = async () => {
    if (state.currentUser) {
      const userCollectionRef = collection(db, `${state.currentUser.uid}`);
      const productDocRef = doc(userCollectionRef, `${state.currentUser.displayName}_Details`);
      const productCollectionRef = collection(productDocRef, 'products');

      const data = [];

      onSnapshot(productCollectionRef, (snap) => {
        data.length = 0;
        snap.forEach((docs) => {
          data.push(docs.data());
        });
        dispatch({ type: SET_PRODUCTS_DATA, payload: data });
      });
    }
  }


  return (
    <FirebaseContext.Provider value={{
      signInWithGoogle,
      getCurrentUser,
      userCollection,
      addItemToCart,
      getCartSize,
      getProductsData,
      signInWithGithub,
      productsData: state.productsData,
      currentUser: state.currentUser,
      cartSize: state.cartSize,
      totalPrice: state.totalPrice,
      totalDiscount: state.totalDiscount,
      dispatch
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}