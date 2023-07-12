import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import useSWR from "swr";
import BoltIcon from '@mui/icons-material/Bolt';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { CartNavbar } from '@/components/CartNavbar';
import { useRouter } from 'next/router';
import { useFirebase } from '@/firebase/firebase';


const productsFetcher = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

//STYLES

const styles = {
    productView: "py-0 px-3 min-h-[500px] flex w-[45%]",
    productImages: "w-fit flex flex-col gap-2 p-1 m-auto mr-1 border border-[#0000001f] cursor-pointer",
    mainProduct: "w-full border border-[#0000001f] my-4 mx-0",
    mainProductImg: "flex items-center justify-center h-[460px] w-full overflow-hidden",
    productImg: 'border-[1.5px] border-transparent rounded-[.3em] object-cover',
    activeImg: 'border-[1.5px] border-black rounded-[.3em] object-cover',
    btns: "flex gap-2 m-auto mb-0",
    productDesc: "flex flex-col gap-2 p-4 w-[51%]",
    assuredLogo: 'inline-flex items-center ml-6 ',
    assuredLogoImg:'rounded-full border-[1.4px] border-main z-10 scale-[1.2]',
    assuredText: 'text-[.65rem] italic bg-main text-white py-0 px-[.9em] ml-[-7px] rounded-lg leading-snug',
    starRating: 'text-white bg-green-500 text-xs flex items-center w-fit py-1 px-2 rounded-md gap-[.1em] m-2',
    blueStarRating: 'text-white bg-[#137be1] text-xs flex items-center w-fit py-1 px-2 rounded-xl gap-[.1em]',
}

const Product = ({ id }) => {
    const [value, setValue] = useState(0);
    const router = useRouter();
    const fb = useFirebase();
    const { addItemToCart } = fb;

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products/${id}`, productsFetcher);


    return (
        <>
            <CartNavbar />
            <div className="max-w-full flex">
                {productsData &&
                    <>
                        <div className={styles.productView}>
                            <div className={styles.productImages}>
                                {productsData.images.map((val, ind) => {
                                    return (
                                        <img
                                            src={`${val}`}
                                            height={80}
                                            width={80}
                                            alt="fasf"
                                            className={ind === value ?
                                                styles.activeImg
                                                :
                                                styles.productImg}
                                            onClick={() => setValue(ind)}
                                        />

                                    )
                                })
                                }
                            </div>
                            <div className={styles.mainProduct}>
                                <div className={styles.mainProductImg}>
                                    <img className="rounded-lg w-[90%] h-[90%] object-contain" src={productsData.images[value]} alt="" />
                                </div>
                                <div className={styles.btns}>
                                    <Button
                                        variant="contained"
                                        className="p-3 bg-[#5b18ac] px-12 text-base font-semibold mb-4"
                                        img={productsData.thumbnail}
                                        price={productsData.price}
                                        name={productsData.title}
                                        brand={productsData.brand}
                                        discount={productsData.discountPercentage}
                                        id={productsData.id}
                                        onClick={(e) => {
                                            addItemToCart(e)
                                            router.push("/Cart")
                                        }}
                                    >
                                        <AddShoppingCartRoundedIcon className='mr-2 mb-4' />
                                        ADD TO CART
                                    </Button>

                                    <Button variant="contained"
                                        className="bg-[orangered] p-3 px-12 text-base font-semibold mb-4"> <BoltIcon className="mr-2" /> BUY NOW</Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.productDesc}>
                            <span>{productsData.title}</span>
                            <span className='flex text-[#808080] text-sm items-center'>

                                <span className={styles.starRating}>{productsData.rating}<StarRoundedIcon
                                    className='text-white text-sm'
                                />
                                </span>
                                <span> 27,888 Ratings & 2,238 Reviews </span>
                                <span className={styles.assuredLogo}>
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
                            <span className='text-green-500 text-sm'>Extra $50 off</span>

                            <span className='text-[1.5rem] font-semibold'>${productsData.price}<span></span>

                                <span className='text-green-500 text-sm font-semibold ml-2'>${productsData.discountPercentage} off</span></span>

                            <span className='text-sm font-semibold'><span>In Stock</span> -<span className='ml-2'>{productsData.stock}</span></span>

                            <h3> Coupons for you</h3>

                            <span className='text-sm flex items-center gap-3' >

                                <CalendarViewDayRoundedIcon className='text-green-500 text-sm' />
                                <span className='font-semibold'>No cost EMI $20/month</span>. Standard EMI also available </span>

                            <h3>Available offers</h3>

                            <span className='text-sm flex items-center gap-3'>
                                <SellRoundedIcon className='text-green-500 text-lg' />
                                <span className='text-black font-semibold' >Bank Offer</span> 5% Cashback on Flipkart Axis

                                Bank Card <span className='text-[#137be1] font-semibold' >T&C</span></span>

                            <span className='text-sm flex items-center gap-3'>

                                <SellRoundedIcon className='text-green-500 text-lg' />

                                <span className='text-black font-semibold'>Special Price </span>Get extra {productsData && productsData.discountPercentage}% off (price inclusive of cashback/coupon) <span className='text-[#137be1] font-semibold'>T&C</span></span>

                            <span className='text-sm flex items-center gap-[.875]'>
                                <SellRoundedIcon className='text-green-500 text-lg mr-[.7em] '
                                />Get extra {productsData && productsData.discountPercentage}% off (price inclusive of cashback/coupon)

                                <span className='text-[#137be1] font-semibold'>T&C</span></span>

                            <span className="flex gap-2 w-fit justify-between">

                                <span className='offer-details'>Seller</span>

                                <span className='ml-[5.5em] text-[#137be1]'>{productsData.brand}</span>

                                <span className={styles.blueStarRating}>{productsData.rating}<StarRoundedIcon
                                    className="text-white text-sm"
                                />
                                </span></span>
                            <span className='flex justify-center w-fit'>

                                <span className='text-[#808080] text-sm font-semibold'>Description</span>

                                <span className='text-sm ml-16'>{productsData.description}</span>

                            </span>
                            <span className='flex justify-center w-fit'>

                                <span className='text-[#808080] text-sm font-semibold'>Category</span>

                                <span className='text-sm ml-20'>{productsData.category}</span>
                            </span>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Product;