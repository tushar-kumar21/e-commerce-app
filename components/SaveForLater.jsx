import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { CartNavbar } from "@/components/CartNavbar";
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import { useFirebase } from "@/firebase/firebase";
import { monthsData } from "@/data";
import { RemoveItem } from "@/components/RemoveItem";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { ActionTypes } from "@/components/reducer";

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
    productBtn: "transition-ease duration-200 hover:mb-[.1em] hover:text-[#2874f0] md:text-sm ml-[20%]",
    placeOrder: "!rounded-md !py-4 !px-0 w-[68%] !z-[999] !flex !flex-row-reverse !fixed !bottom-0 !ml-[-1em] !bg-white !shadow-[-2px_0px_8px rgba(128,128,128,0.379)] md:!w-full",
    placeBtn: "!border-2 !border-transparent !bg-main !text-white !text-sm !font-semibold !tracking-widest !py-4 !px-[4.5em] !my-0 !mx-4 !rounded sm:!py-2 sm:!px-4",
    priceDetails: "text-[#808080] text-base font-semibold py-4 px-0 m-0 border-b border-[#00000018]",
    discount: "flex items-center gap-3 text-[#808080] font-semibold tracking-wider text-xs",
    detailsLi: "list-none flex justify-between py-[.6em] px-0",
}

export const SaveForLater = () => {

    const [currentDate, setCurrentDate] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(0);

    const fb = useFirebase()
    const {
        currentUser,
        productsData,
        getSaveForLaterData,
        getCurrentUser,
        getCartSize,
        deleteSaveForLaterProduct,
        saveForLater,
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

    let date = new Date().getDate() + 3;
    let month = new Date().getMonth() + 1;
    useEffect(() => {           
        getCurrentUser()
        getSaveForLaterData()   
        !currentUser && getCartSize()
        if (date > 31) {
            date = 5
            month += 1;
        }
        setCurrentDate(date)
        setCurrentMonth(month)        
    }, [currentUser, !saveForLater])   

    return (
        <section>
            <div className="pb-16 md:pb-6 pt-8">
                <h3 className="text-xl font-semibold my-1">SAVE FOR LATER</h3>
                {
                    saveForLater && saveForLater.map((item, ind) => {
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
                              
                                    <span onClick={()=>deleteSaveForLaterProduct(item.id)} className={styles.productBtn}>REMOVE</span>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </div>
        </section>
    )
}