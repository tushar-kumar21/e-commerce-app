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

  let date = new Date().getDate() + 3;
  let month = new Date().getMonth() + 1;

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
  

  return (
    <>
      <div className="cart-container">
        <CartNavbar />
        <div className="main-cart">
          <div className="cart-items-container">
            <div className="cart-items-category">
              <span>ShopExpress<span>{`(${cartSize})`}</span></span>
              <span>Grocery</span>
            </div>
            <div className="delivery-address">
              <span>From Saved Address</span>
              <span>Enter Delivery Pincode</span>
            </div>
            <div className="cart-order-details">
              {
                productsData && productsData.map((item, ind) => {
                  return (
                    <Fragment key={item.id}>
                      <div className="cart-items" >
                        <Image src={`https://res.cloudinary.com/demo/image/fetch/${item.image}`} height={100} width={100} alt="" />
                        <div>
                          <span>{item.name}</span>
                          <span>smartphones</span>
                          <span>Seller: <span>&nbsp;{item.brand}</span>
                            <span>
                              <Image
                                src={`/assets/shopexpress.jpg`}
                                height={15}
                                width={15}
                                alt="dasd"
                              />
                              <span>Assured</span>
                            </span></span>
                          <span><span>${item.price}</span> <span
                            style={{
                              color: 'green',
                              fontSize: '.8rem'
                            }}>{` ${item.discount}% off`}</span></span>
                        </div>
                        <span>Delivery by {monthsData[currentMonth]} {currentDate} | <span
                          style={{ color: "green" }}>Free</span>
                          <span style={{
                            textDecoration: 'line-through',
                            color: '#808080'
                          }}>{item.discount} </span>
                        </span>
                      </div>
                      <div className="cart-order" >
                        <span>
                          <span onClick={(e)=>removeItems(ind, e)} price={item.price} id={item.id}>-</span>
                          <span>{item.quantity}</span>
                          <span onClick={(e)=>addItems(ind, e)} price={item.price} id={item.id}>+</span>
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