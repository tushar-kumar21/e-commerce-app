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
const Product = ({ id }) => {
    const [value, setValue] = useState(0);
    const router = useRouter();
    const fb = useFirebase();
    const { addItemToCart } = fb;

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products/${id}`, productsFetcher);


    return (
        <>
            <CartNavbar />
            <div className="products-container">
                {productsData &&
                    <>
                        <div className="product-view">
                            <div className="product-images">
                                {productsData.images.map((val, ind) => {
                                    return (
                                        <Image src={`https://res.cloudinary.com/demo/image/fetch/${val}`} height={80} width={80} alt="fasf" className={ind === value ? 'activeimg' : undefined} onClick={() => setValue(ind)} />
                                        
                                    )
                                })
                                }
                            </div>
                            <div className="main-product">
                                <div className="main-product-img">
                                    <img src={productsData.images[value]} alt="" />
                                </div>
                                <div className="btns">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#5b18ac',
                                            p: '.8em',
                                            px: '3em',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                        }}
                                        img={productsData.thumbnail}
                                        price={productsData.price} 
                                        name={productsData.title}
                                        brand={productsData.brand}
                                        discount={productsData.discountPercentage}
                                        id={productsData.id}
                                        onClick={(e)=>{
                                            addItemToCart(e)
                                            router.push("/Cart") 
                                        }}
                                    >
                                        <AddShoppingCartRoundedIcon sx={{ marginRight: '0.5em' }} />
                                        ADD TO CART
                                    </Button>

                                    <Button variant="contained" sx={{
                                        backgroundColor: 'orangered',
                                        p: '.8em',
                                        px: '3em',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}> <BoltIcon sx={{ marginRight: '.5em' }} /> BUY NOW</Button>
                                </div>
                            </div>
                        </div>
                        <div className="product-desc">
                            <span>{productsData.title}</span>
                            <span style={{ display: 'flex', color: '#808080', fontSize: '.9rem' }}>

                                <span className='star-rating'>{productsData.rating}<StarRoundedIcon
                                    sx={{
                                        color: '#fff',
                                        fontSize: '.85rem'
                                    }} />
                                </span>
                                <span> 27,888 Ratings & 2,238 Reviews </span>
                                <span className='assured-logo'>
                                    <Image
                                        src={`/assets/shopexpress.jpg`}
                                        height={15}
                                        width={15}
                                        alt="dasd"
                                    />
                                    <span>Assured</span>
                                </span>
                            </span>
                            <span style={{ color: 'green', fontSize: '.85rem' }}>Extra $50 off</span>

                            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>${productsData.price}<span></span>

                                <span style={{ color: 'green', fontSize: '.9rem', fontWeight: '600!important', marginLeft: '.5em' }}>${productsData.discountPercentage} off</span></span>

                            <span style={{ fontSize: '.9rem', fontWeight: '600' }}><span>In Stock</span> -<span style={{ marginLeft: '.5em' }}>{productsData.stock}</span></span>

                            <h3> Coupons for you</h3>

                            <span style={{ fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: '.8em' }}>

                                <CalendarViewDayRoundedIcon sx={{
                                    color: 'green',
                                    fontSize: '.9rem'
                                }} />
                                <span style={{ fontWeight: '600' }}>No cost EMI $20/month</span>. Standard EMI also available </span>

                            <h3>Available offers</h3>

                            <span style={{ fontSize: '.87rem', display: 'flex', alignItems: 'center', gap: '.8em' }}>
                                <SellRoundedIcon sx={{
                                    color: 'green',
                                    fontSize: '1.1rem'
                                }} />
                                <span style={{ color: '#000', fontWeight: '600' }}>Bank Offer</span> 5% Cashback on Flipkart Axis

                                Bank Card <span style={{ color: '#137be1', fontWeight: '600' }}>T&C</span></span>

                            <span style={{ fontSize: '.87rem', display: 'flex', alignItems: 'center', gap: '.8em' }}>

                                <SellRoundedIcon sx={{
                                    color: 'green',
                                    fontSize: '1.1rem'
                                }} />

                                <span style={{ color: '#000', fontWeight: '600' }}>Special Price </span>Get extra {productsData && productsData.discountPercentage}% off (price inclusive of cashback/coupon) <span style={{
                                    color: '#137be1',
                                    fontWeight: '600',
                                }}>T&C</span></span>

                            <span style={{
                                fontSize: '.87rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '.87rem'
                            }}>
                                <SellRoundedIcon sx={{
                                    color: 'green',
                                    fontSize: '1.1rem',
                                    marginRight: '-.2em'
                                }} />Get extra {productsData && productsData.discountPercentage}% off (price inclusive of cashback/coupon)

                                <span style={{ color: '#137be1', fontWeight: '600' }}>T&C</span></span>

                            <span style={{ display: 'flex', gap: '.5em', width: 'fit-content', justifyContent: 'space-between' }}>

                                <span className='offer-details'>Seller</span>

                                <span style={{ marginLeft: '5.5em', color: "#137be1" }}>{productsData.brand}</span>

                                <span className='blue-star-rating'>{productsData.rating}<StarRoundedIcon
                                    sx={{
                                        color: '#fff',
                                        fontSize: '.85rem'
                                    }} />
                                </span></span>
                            <span className='offer-heading'>

                                <span className='offer-details'>Description</span>

                                <span style={{ fontSize: '.87rem', marginLeft: '4em' }}>{productsData.description}</span>

                            </span>
                            <span className='offer-heading'>

                                <span className='offer-details'>Category</span>

                                <span style={{ fontSize: '.87rem', marginLeft: '5.2em' }}>{productsData.category}</span>
                            </span>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Product;