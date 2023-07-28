import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { CartNavbar } from "@/components/CartNavbar";
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import { useFirebase } from "@/firebase/firebase";
import { monthsData } from "@/data";
import { RemoveItem } from "@/components/RemoveItem";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { ActionTypes } from "@/components/reducer";

//STYLES

const styles = {
  mainCart: "flex max-w-full gap-4 p-4 bg-[#8c8c8c18] md:flex-wrap",
  cartItemsContainer: "w-full flex flex-col overflow-y-scroll overflow-x-hidden h-[500px] search-scrollbar",
  cartItemsCategory: "rounded-[.3em] py-4 px-0 flex justify-around bg-white",
  deliveryAddress: "flex rounded-[.3em] justify-between bg-white py-3 px-4 items-center my-3",
  pincode: "border border-[#00000023] rounded-[.3em] text-xs font-semibold tracking-wider py-3 px-6 text-main",
  cartItems: "max-w-full flex justify-between py-4 px-8 rounded-[.3em] gap-4 bg-white md:flex-col relative",
  assuredLogoImg: 'rounded-full border-[1.4px] border-main z-10 scale-[1.2]',
  assuredText: 'text-[.65rem] italic bg-main text-white py-0 px-[.9em] ml-[-7px] rounded-lg leading-snug',
  cartOrder: "flex items-center gap-6 font-semibold cursor-pointer py-0 px-6 pb-4 bg-white mb-4",
  plusBtn: "inline-flex items-center justify-center border border-[#00000039] h-7 w-4 p-[.35em] transition ease-in-out duration-500 rounded-[50%] py-[.35em] px-[.9em] active:scale-[1.2]",
  subBtn: "inline-flex items-center justify-center border border-[#00000039] h-7 w-7 p-[.35em] rounded-full transition ease-in-out duration-500 active:scale-[1.2]",
  productBtn: "transition-ease duration-200 hover:mb-[.1em] hover:text-[#2874f0] md:text-sm",
  placeOrder: "!rounded-md !py-4 !px-0 w-[68%] !z-[999] !flex !flex-row-reverse !fixed !bottom-0 !ml-[-1em] !bg-white !shadow-[-2px_0px_8px rgba(128,128,128,0.379)] md:!w-full",
  placeBtn: "!border-2 !border-transparent !bg-main !text-white !text-sm !font-semibold !tracking-widest !py-4 !px-[4.5em] !my-0 !mx-4 !rounded sm:!py-2 sm:!px-4",
  priceDetails: "text-[#808080] text-base font-semibold py-4 px-0 m-0 border-b border-[#00000018]",
  discount: "flex items-center gap-3 text-[#808080] font-semibold tracking-wider text-xs",
  detailsLi: "list-none flex justify-between py-[.6em] px-0",
}


const Cart = () => {

  const [currentDate, setCurrentDate] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isRemoveBox, setIsRemoveBox] = useState(false);

  const fb = useFirebase();
  const auth = getAuth();
  const router = useRouter();
  const { 
    currentUser, 
    productsData, 
    getProductsData, 
    getCurrentUser, 
    getCartSize, 
    cartSize, 
    totalPrice, 
    totalDiscount, 
    dispatch 
  } = fb;

  const { 
    SET_ITEM_QUANTITY, 
    SET_TOTAL_PRICE, 
    SET_TOTAL_DISCOUNT 
  } = ActionTypes;

  const [counter, setCounter] = useState(0);


  const addItems = (id, e, ind) => {
    setCounter(counter + 1)        
    productsData[ind].quantity <= productsData[ind].stock && 
    dispatch({
      type:SET_TOTAL_PRICE, 
      payload:totalPrice + parseInt(e.target.getAttribute('price'))
    })

    productsData[ind].quantity <= productsData[ind].stock && 
    dispatch({
      type: SET_TOTAL_DISCOUNT, 
      payload:totalDiscount + parseInt(e.target.getAttribute('discount'))
    })
    
      dispatch({
        type: SET_ITEM_QUANTITY, payload:{
          id,
          quantity: productsData[ind].quantity <= productsData[ind].stock ? productsData[ind].quantity + 1 : productsData[ind].quantity,
        },
      });
  };


  const removeItems = (id, e, ind) => {
    if (counter > 0) {
      setCounter(counter - 1)
      
      dispatch({
        type:SET_TOTAL_PRICE, 
        payload: totalPrice - parseInt(e.target.getAttribute('price'))})

      dispatch({
        type:SET_TOTAL_DISCOUNT, 
        payload: totalDiscount - parseInt(e.target.getAttribute('discount'))
      })
    }    

    dispatch({
      type:SET_ITEM_QUANTITY, payload:{
        id,
        quantity: productsData[ind].quantity > 1 ? productsData[ind].quantity - 1 : productsData[ind].quantity
      }
    })  
  };

  let date = new Date().getDate() + 3;
  let month = new Date().getMonth() + 1;

  useEffect(() => {
    getCurrentUser()
    !currentUser && getCartSize()
    !currentUser && getProductsData()
    if (date > 31) {
      date = 5
      month += 1;
    }
    setCurrentDate(date)
    setCurrentMonth(month)
  }, [currentUser])




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
            <div className="pb-16 md:pb-6">
              {
                productsData && productsData.map((item, ind) => {
                  return (
                    <Fragment key={item.id}>
                      <div className={styles.cartItems} >
                        <img
                          src={item.image}
                          alt=""
                          className="rounded-xl h-24 w-24" />
                        <div className="flex flex-col md:absolute md:right-0 md:w-[58%] md:h-fit">
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
                            </span>
                          </span>
                          <span className="text-[#808080] text-xs mt-1">InStock - {item.stock}</span>
                          <span className="text-black font-black text-base tracking-widest mr-1 mt-4"><span>${item.price}</span>
                            <span className="text-green-500 text-xs">{` ${item.discount}% off`}</span>
                          </span>
                        </div>
                        <span className="text-sm md:mt-14">Delivery by {monthsData[currentMonth]} {currentDate} | <span
                          className="text-green-500 text-sm mr-1">Free</span>
                          <span className="line-through text-[#808080]">{item.discount} </span>
                        </span>
                      </div>
                      <div className={styles.cartOrder} >
                        <span className="inline-flex gap-3 items-center ml-3">
                          <span className={styles.subBtn}
                            onClick={(e) => removeItems(item.id, e, ind)}
                            price={item.price}
                            id={item.id}
                            discount={item.discount}>-</span>

                          <span>{item.quantity}</span>

                          <span className={styles.plusBtn}
                            onClick={(e) => addItems(item.id, e, ind)}
                            price={item.price}
                            id={item.id}
                            discount={item.discount}>+</span>
                        </span>
                        <span className={styles.productBtn}>SAVE FOR LATER</span>
                        <span onClick={() => setIsRemoveBox(true)} className={styles.productBtn}>REMOVE</span>
                      </div>
                    </Fragment>
                  )
                })
              }
            </div>
            <div className={styles.placeOrder} 
            onClick={() => router.push("/Checkout")}>
              <Button variant="contained" className={styles.placeBtn}>PLACE ORDER</Button>
            </div>
          </div>
          <div className="max-w-[30%] py-0 px-6 rounded-lg bg-white sticky md:max-w-full md:grow md:my-14 md:py-2 md:pb-6">

            <h2 className={styles.priceDetails}>PRICE DETAILS</h2>

            <li className={styles.detailsLi}>
              <span>{`Price (${cartSize} items)`}</span>
              <span>{totalPrice}</span>
            </li>
            <li className={styles.detailsLi}>
              <span>Discount</span>
              <span className="text-green-500">{`-$${totalDiscount}`}</span>
            </li>
            <li className={styles.detailsLi}>
              <span>Delivery Charges</span>
              <span className="text-green-500 text-sm">Free</span>
            </li>
            <li className={styles.detailsLi}>
              <span>Secured Packaging Fee</span>
              <span>$5</span>
            </li>
            <li className={styles.detailsLi}>
              <span>Total Amount</span>
              <span>${((totalPrice - totalDiscount) - 5)}</span>
            </li>
            <span className="text-green-500 text-sm font-bold">You will save <span>${totalDiscount}</span> on this order</span>
            <h3 className={styles.discount}>
              <SecurityTwoToneIcon className="!text-[#5b18ac]" />Safe and Secure Payments.Easy Returns. 100% Authentic Products.</h3>
          </div>
        </div>
      </div>
      {isRemoveBox && <RemoveItem setIsRemoveBox={setIsRemoveBox} />}
    </>
  )
}
export default Cart;