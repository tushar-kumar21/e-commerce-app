import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { CartNavbar } from "@/components/CartNavbar";
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import { useFirebase } from "@/firebase/firebase";
import { monthsData } from "@/data";
import { RemoveItem } from "@/components/RemoveItem";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

//STYLES

const styles={
   mainCart:"flex max-w-full gap-4 p-4 bg-[#8c8c8c18]",
   cartItemsContainer:"w-full flex flex-col overflow-y-scroll overflow-x-hidden h-[500px]",
   cartItemsCategory:"rounded-[.3em] py-4 px-0 flex justify-between bg-white",
   deliveryAddress:"flex rounded-[.3em] justify-between bg-white py-3 px-4 items-center my-3",
   pincode:"border border-[#00000023] rounded-[.3em] text-xs font-semibold tracking-wider py-3 px-6 text-main",
   cartItems:"max-w-full flex justify-between py-4 px-8 rounded-[.3em] bg-white",
   assuredLogoImg:'rounded-full border-[1.4px] border-main z-10 scale-[1.2]',
   assuredText: 'text-[.65rem] italic bg-main text-white py-0 px-[.9em] ml-[-7px] rounded-lg leading-snug',
   cartOrder:"flex items-center gap-6 font-semibold cursor-pointer py-0 px-6 pb-4 bg-white mb-4",
   plusBtn:"inline-flex items-center justify-center border border-[#00000039] h-7 w-4 p-[.35em] transition ease-in-out duration-500 rounded-[50%] py-[.35em] px-[.9em] active:scale-[1.2]",
   subBtn:"inline-flex items-center justify-center border border-[#00000039] h-7 w-7 p-[.35em] rounded-full transition ease-in-out duration-500 active:scale-[1.2]"
}

const Cart = () => {

  const [items, setItems] = useState(1);
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isRemoveBox, setIsRemoveBox] = useState(false);

  const fb = useFirebase();
  const { currentUser, productsData, getProductsData, getCurrentUser, getCartSize, cartSize, totalPrice, setTotalPrice, totalDiscount, setTotalDiscount } = fb;

const addItems = async (ind, e) => {   
  getProductsData()  
  let id = e.target.getAttribute('id');
  setTotalPrice( parseInt(e.target.getAttribute('price')) + totalPrice);
  setTotalDiscount( parseInt(e.target.getAttribute('price')) + totalDiscount);
  
  try{
    const docRef = doc(db, `${currentUser.uid}`, `${currentUser.displayName}_Details`);
    const productCollectionRef = collection(docRef, "products");
    const productDocs = doc(productCollectionRef, `product_Details${id}`)
    await updateDoc(productDocs,{
    quantity:productsData[ind].quantity + 1,
  })
}catch(error){
  console.log(error);
}    
}
  
  const removeItems = async (ind, e) => {
    getProductsData()    
    let id = e.target.getAttribute('id');
    setTotalPrice( parseInt(e.target.getAttribute('price')) + totalPrice);
    setTotalDiscount( parseInt(e.target.getAttribute('price')) + totalDiscount);
    
    try{
     const docRef = doc(db, `${currentUser.uid}`, `${currentUser.displayName}_Details`);
     const productCollectionRef = collection(docRef, "products");
     const productDocs = doc(productCollectionRef, `product_Details${id}`)
     await updateDoc(productDocs,{
      quantity:productsData[ind].quantity - 1,
     })
     const getData = onSnapshot(productDocs, async(snap)=>{
            const productsData = await snap.data();
            console.log(productsData)
     })
    }catch(error){
      console.log(error);
    }
        
  }
  useEffect(() => {
    getCurrentUser()
    getProductsData()
    getCartSize()
    if (date > 31) {
      date = 5
      month += 1;
    }
    setCurrentDate(date)
    setCurrentMonth(month)
  }, [currentUser])
  

  let date = new Date().getDate() + 3;
  let month = new Date().getMonth() + 1;


  return (
    <>
      <div className="max-w-full h-screen">
        <CartNavbar />
        <div className={styles.mainCart}>
          <div className={styles.cartItemsContainer}>
            <div className={styles.cartItemsCategory}>
              <span>ShopExpress<span>{`(${cartSize})`}</span></span>
              <span>Grocery</span>
            </div>
            <div className={styles.deliveryAddress}>
              <span className="text-sm tracking-wide">From Saved Address</span>
              <span className={styles.pincode}>Enter Delivery Pincode</span>
            </div>
            <div className="pb-16">
              {
                productsData && productsData.map((item, ind) => {
                  return (
                    <Fragment key={item.id}>
                      <div className={styles.cartItems} >
                        <Image src={`https://res.cloudinary.com/demo/image/fetch/${item.image}`} height={100} width={100} alt="" className="rounded-xl" />
                        <div className="flex flex-col">
                          <span className="text-base">{item.name}</span>
                          <span className="text-[#808080] text-xs mt-1">smartphones</span>
                          <span className="text-[#808080] text-xs mt-4 inline-flex items-center">Seller: <span>&nbsp;{item.brand}</span>
                            <span className="inline-flex items-center ml-[.6em]">
                              <Image
                                src={`/assets/shopexpress.jpg`}
                                height={15}
                                width={15}
                                alt="dasd"
                                className={styles.assuredLogoImg}
                              />
                              <span className={styles.assuredText}>Assured</span>
                            </span></span>
                          <span className="text-black font-black text-base tracking-widest mr-1 mt-4"><span>${item.price}</span>
                          <span className="text-green-500 text-xs">{` ${item.discount}% off`}</span>
                          </span>
                        </div>
                        <span className="text-sm">Delivery by {monthsData[currentMonth]} {currentDate} | <span
                           className="text-green-500 text-sm mr-1">Free</span>
                          <span className="line-through text-[#808080]">{item.discount} </span>
                        </span>
                      </div>
                      <div className={styles.cartOrder} >
                        <span className="inline-flex gap-3 items-center ml-3"> 
                          <span className={styles.subBtn} onClick={(e)=>removeItems(ind, e)} price={item.price} id={item.id}>-</span>
                          <span>{item.quantity}</span>
                          <span className={styles.plusBtn} onClick={(e)=>addItems(ind, e)} price={item.price} id={item.id}>+</span>
                        </span>
                        <span>SAVE FOR LATER</span>
                        <span onClick={() => setIsRemoveBox(true)}>REMOVE</span>
                      </div>
                    </Fragment>
                  )
                })
              }
            </div>
            <div className="place-order">
              <button>PLACE ORDER</button>
            </div>
          </div>
          <div className="cart-price-details">
            <h2>PRICE DETAILS</h2>
            <li><span>{`Price (${cartSize} items)`}</span> <span>{`$${totalPrice}`}</span></li>
            <li><span>Discount</span> <span style={{ color: 'green' }}>{`-$${totalDiscount}`}</span></li>
            <li><span>Delivery Charges</span> <span style={{ color: 'green', fontSize: '.9rem' }}>Free</span></li>
            <li><span>Secured Packaging Fee</span> <span>$5</span></li>
            <li><span>Total Amount</span> <span>${((totalPrice - totalDiscount)-5)}</span></li>
            <span>You will save <span>${totalDiscount}</span> on this order</span>
            <h3><SecurityTwoToneIcon sx={{ color: '#5b18ac' }} />Safe and Secure Payments.Easy Returns. 100% Authentic Products.</h3>
          </div>
        </div>
      </div>
      {isRemoveBox && <RemoveItem setIsRemoveBox={setIsRemoveBox} />}
    </>
  )
}
export default Cart;