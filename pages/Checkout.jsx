import React, { useEffect } from 'react'
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Button from '@mui/material/Button';
import { useFirebase } from '@/firebase/firebase';

//STYLES

const styles = {
    totalAmount: 'text-2xl font-semibold my-2 mt-10',
    itemSection: 'p-12 basis-1/2 grow shrink',
    paymentSection: 'w-1/2 flex flex-col basis-[33%] grow shrink p-12 shadow-[-3px_0px_10px_#80808061]',
    emailInput: 'outline-none border-[1.5px] border-[#808080] py-[7px] px-4 rounded-md text-base mb-6 placeholder:text-sm',
    cardInfo: 'flex gap-1 border-[1.5px] border-[#808080] rounded-md overflow-hidden px-4 justify-between items-center py-1',
    cardInput: 'outline-none border-none py-1 placeholder:text-sm',
    valid: 'flex gap-1 border-[1.5px] border-[#808080] rounded-md overflow-hidden justify-between items-center border-t-0 mb-6',
    monthInput: 'basis-[50%] grow shrink border-r-2 border-r-[#808080] px-4 py-[7px] outline-none placeholder:text-sm',
    cvcInput: 'basis-[50%] grow shrink px-4 py-[7px] outline-none placeholder:text-sm',
    nameInput: 'py-[7px] px-4 border-[1.5px] border-[#808080] rounded-md outline-none mb-6 placeholder:text-sm',
    terms: 'border-[1.5px] border-[#808080] rounded-md flex items-start p-3 mb-6',
    checkbox: 'border-[1.5px] border-[#808080] h-5 w-5 flex justify-center items-center rounded-[3px] cursor-pointer',
    shoppingBasket: 'rounded-full text-gray-600 shadow-[0px_2px_10px_0px_rgba(133,131,133,1)] p-[2px]'
}

const Checkout = () => {

    const fb = useFirebase()
    const { productsData, getProductsData, getCurrentUser, currentUser, totalPrice } = fb;

    useEffect(() => {
        getProductsData()
        getCurrentUser()
    }, [currentUser])

    return (
        <main className='flex justify-between'>
            <section className={styles.itemSection}>
                <div className='flex gap-2'>
                    <NorthRoundedIcon className='text-[#808080] rotate-[-90deg]' />
                    <ShoppingBasketRoundedIcon className={styles.shoppingBasket} />
                    <span className='text-black'>Place Your Orders</span>
                </div>
                <h3 className={styles.totalAmount}>Total Amount: {`${totalPrice}`}</h3>
                <aside className={styles.products}>
                    {
                        productsData && productsData.map(({ image, desc, id, stock, price }) => {
                            return (
                                <div className='flex gap-2 mb-4' key={id}>
                                    <img
                                        className='rounded-md'
                                        src={image}
                                        height={80}
                                        width={80}
                                        alt="fd"
                                    />
                                    <div className='flex flex-col'>
                                        <span className='text-gray-600 text-sm'>
                                            <span className='text-black text-sm'>Quantity: </span>
                                            {stock}
                                        </span>
                                        <span className='text-gray-600 text-sm'>
                                            <span className='text-black text-sm'>Description: </span>
                                            {desc}
                                        </span>
                                    </div>
                                    <span>{`$${price}`}</span>
                                </div>
                            )
                        })
                    }

                </aside>
                <span className='text-xs text-[#808080] inline-block my-4'>Powered by <span className='font-semibold text-gray-600'>ShopExpress</span>
                    |
                    <span className='text-[#808080] text-xs'>Terms</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className='text-[#808080] text-xs'>Privacy</span>
                </span>
            </section>

            <section className={styles.paymentSection}>
                <h3 className='my-3'>Pay with card</h3>
                <label htmlFor="" className='text-sm text-gray-700'>Email</label>
                <input
                    type="email"
                    className={styles.emailInput}
                    placeholder='Enter your email'
                />
                <label htmlFor="" className='text-sm text-gray-700'>Card information</label>
                <div className={styles.cardInfo}>
                    <input type="text" placeholder='1234 1234 1234 1234' className={styles.cardInput} />
                    <div className='flex gap-1'>
                        <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png" alt="" className='h-3' />
                        <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png" alt="" className='h-3' />
                        <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png" alt="" className='h-3' />
                        <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1f55dc68c5ee83d0cbf8_GooglePay.png" alt="" className='h-3' />
                    </div>
                </div>
                <div className={styles.valid}>
                    <input
                        type="text"
                        placeholder='MM/YY'
                        className={styles.monthInput}
                    />
                    <input
                        type="text"
                        placeholder='CVC'
                        className={styles.cvcInput}
                    />
                </div>
                <label htmlFor="" className='text-sm text-gray-700'>Name on card</label>
                <input
                    type="text"
                    placeholder='Firstname Lastname'
                    className={styles.nameInput}
                />
                <div className={styles.terms}>
                    <div className={styles.checkbox}>
                        <DoneRoundedIcon className='scale-[.9]'
                        />
                    </div>
                    <div>
                        <h3 className='m-0 p-0 text-base pl-2'>Securely save my information for 1-click checkout</h3>
                        <p className='text-sm text-gray-500 pl-2'>Pay faster with shopexpress you don't get any problem here related transactions</p>
                    </div>
                </div>
                <Button
                    variant="contained"
                    className='bg-blue-500 text-md py-[5px]'>pay</Button>
            </section>
        </main>
    )
}

export default Checkout;