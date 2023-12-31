import React, { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image';
import { useFirebase } from '@/firebase/firebase';
import useSWR from "swr";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader } from './Loader';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';

// MATERIAL ICONS
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { signOut } from 'firebase/auth';

//STYLES

const styles = {
    smallNavbar: 'max-w-full flex justify-between items-center bg-main px-[2em] py-[.5em]',
    callIcon: 'h-[17px] w-[17px] text-white',
    navText: 'text-[.8rem] text-white tracking-tight',
    downArrow: 'h-[25] w-[25] text-white',
    mainNavbar: 'flex items-center justify-between px-[1.5em] py-[.5em] md:gap-2 md:px-4',
    cartSize: "flex justify-center items-center border-[1.5px] border-white rounded-lg bg-red-500 text-white absolute left-[6px] top-[-12px] p-[.46em] text-xs h-[.5em]",
    cart: "flex items-center text-black gap-1 relative cursor-pointer md:hidden",
    logoName: 'text-main text-[1.6rem] tracking-wide font-bold sm:hidden',
    navMenu: 'flex items-center gap-[1.5em] list-custom xl:hidden',
    searchItem: 'border border-borderGrey flex justify-between items-center h-[2.5em] w-[23%] px-[1em] py-[0] rounded-lg relative md:grow ',
    searchInput: 'bg-transparent outline-none tracking-wide placeholder:text-borderGrey placeholder:text-[.9rem] px-0 py-auto searchInput',
    searchProducts: 'list-none px-3 py-1 border-b-[1.5px] border-b-[#80808023] flex gap-5 items-center justify-start cursor-pointer hover:bg-gray-100',
    searchBox: 'absolute top-[100%] w-full bg-white h-fit z-[9999999] left-0 mt-2 rounded-lg max-h-[430px] overflow-auto search-scrollbar ',  
    logout:'absolute top-6 right-[-3.5em] flex items-center gap-2 shadow-[0px_0px_8px_lightgrey] px-4 py-1 z-50 rounded-md bg-white'
}

const productFetcher = async (url) => {
    try {
        const data = axios.get(url)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const Navbar = () => {

    const [query, setQuery] = useState(null);
    const [input, setInput] = useState("");
    const [loader, setLoader] = useState(false);    
    const [logoutPopUP, setLogoutPopUP] = useState(false);
    const fb = useFirebase();
    const { signInWithGoogle, getCartSize, cartSize, currentUser, getCurrentUser } = fb;
    const router = useRouter();

    const { data: queryData, error: errorData } = useSWR(`https://dummyjson.com/products/search?q=${query}`, productFetcher)

    useLayoutEffect(() => {
        setLoader(false)
    }, [])

    useEffect(() => {
        let input = document.querySelector('.searchInput')
        getCurrentUser();
        setInput(input);
        getCartSize()
    }, [])

    return (
        <div className="max-w-full relative">
            <div className={styles.smallNavbar}>
    
                <div className="flex items-center gap-[.5em]">
                    <CallIcon className={styles.callIcon} />
                    <span className={styles.navText}>+001234567890</span>
                </div>

                <div className="flex items-center">
                    <span className={`${styles.navText} sm:hidden`}>Get 50% Off on Selected Items &nbsp; &nbsp;| &nbsp; &nbsp; Shop Now</span>
                </div>

                <div className="flex items-center">
                    <span className='text-white text-[.8rem]'>English</span>

                    <KeyboardArrowDownRoundedIcon className={styles.downArrow} />

                    <span className='text-white text-[.8rem]'>Location</span>

                    <KeyboardArrowDownRoundedIcon className={styles.downArrow} />

                </div>
            </div>
            <div className={styles.mainNavbar}>
                <div className="flex items-center">
                    <Image
                        src={`/assets/shopexpress.jpg`}
                        height={70}
                        width={70}
                        alt="dasd"
                    />
                    <span className={styles.logoName}>ShopExpress</span>
                </div>
                <div className={styles.navMenu}>
                    <li className='relative mr-2'>
                        <Link
                            href="#category"
                            scroll={true}>
                            <span>Category</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="#deals"
                            scroll={true}>
                            <span>Deals</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="#new"
                            scroll={true}>
                            <span>What's New</span>
                        </Link>
                    </li>

                    <li >
                        <Link
                            href="#delivery"
                            scroll={true}>
                            <span>Delivery</span>
                        </Link>
                    </li>
                </div>
                <div className={styles.searchItem}>
                    <input
                        type="text"
                        placeholder='Search Product'
                        className={styles.searchInput}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    />
                    <SearchRoundedIcon className="absolute right-2" />

                    <aside className={styles.searchBox}>
                        {
                            input.value !== "" && queryData && queryData.data.products.map((product) => {
                                return (
                                    <li
                                        key={product.id}
                                        className={styles.searchProducts}
                                        onClick={() => {
                                            setLoader(true)
                                            router.push(`/Products/${product.id}`)
                                        }}
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt="asCASDS"
                                            className='rounded-sm w-12 h-10'
                                        />
                                        <span className='text-[#808080] text-sm'>{product.title}</span>
                                    </li>
                                )
                            })
                        }
                    </aside>

                </div>

                <div className="flex gap-4 cursor-pointer max-[1130px]:ml-4 relative md:mx-2" onClick={()=>!currentUser && router.push("/Login")}>

                    {currentUser ?
                        <>
                            <img
                                src={currentUser.photoURL}
                                height={20}
                                width={20}
                                alt="asdasdas"
                                className='rounded-full scale-[1.8]'                                
                            />

                            <span className='text-[.9rem] text-black ml-[-3px] md:hidden'
                            onMouseEnter={()=>setLogoutPopUP(true)}
                            >{currentUser.displayName}</span>
                            <KeyboardArrowDownRoundedIcon className='!absolute !right-[-1em] md:!hidden' />
                        </>
                        :
                        <>
                            <AccountCircleRoundedIcon 
                            onClick={()=>router.push("/")} 
                            className='!scale-[1.5] md:!scale-[1.8]' />
                            <span className='text-[.9rem] text-black md:hidden'>Account</span>                            
                        </>
                    }
                 { logoutPopUP && 
                 <span className={styles.logout}
                    onClick={()=>{
                        signOut(auth)
                        setLogoutPopUP(false)                        
                    }}
                    onMouseLeave={()=>setLogoutPopUP(false)}
                    ><LogoutRoundedIcon className="!text-[1.1rem]" />Logout</span>}
                </div>

                <div className={styles.cart} 
                onClick={() => router.push("/Cart")}>
                    <AddShoppingCartRoundedIcon />
                    <span className='!text-base'>Cart</span>
                  {currentUser && <span className={styles.cartSize}>{cartSize}</span>}
                </div>                
            </div>
            {loader && <Loader />}
        </div>
    )
}
