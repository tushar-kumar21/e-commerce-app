import React, { useEffect } from 'react'
import Image from 'next/image';
import { getAuth, signOut } from "firebase/auth";
import { useFirebase } from '@/firebase/firebase';
// MATERIAL ICONS
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

//STYLES

const styles = {    
    smallNavbar:'max-w-full flex justify-between items-center bg-main px-[2em] py-[.5em]',    
    callIcon:'h-[17px] w-[17px] text-white',
    navText:'text-[.8rem] text-white tracking-tight',
    downArrow:'h-[25] w-[25] text-white',
    mainNavbar:'flex items-center justify-between px-[1.5em] py-[.5em]',
    logoName:'text-main text-[1.6rem] tracking-wide font-bold',
    navMenu:'flex items-center gap-[1.5em] list-custom',    
    searchItem:'border border-borderGrey flex justify-between items-center h-[2.5em] w-[23%] px-[1em] py-[0] rounded-lg'
}

export const Navbar = () => {
    const auth = getAuth();
    const fb = useFirebase();
    const { signInWithGoogle } = fb;        

    return (
        <div className="max-w-full">
            <div className={styles.smallNavbar}>
                <div className="flex items-center gap-[.5em]">                    
                    <CallIcon className={styles.callIcon} />

                    <span className={styles.navText}>+001234567890</span>
                </div>

                <div className="flex items-center">
                    <span className={styles.navText}>Get 50% Off on Selected Items &nbsp; &nbsp;| &nbsp; &nbsp; Shop Now</span>
                </div>

                <div className="flex items-center">
                    <span className='text-white text-[.8rem]'>English</span>

                    <KeyboardArrowDownRoundedIcon className={styles.downArrow}/>

                    <span className='text-white text-[.8rem]'>Location</span>

                    <KeyboardArrowDownRoundedIcon className={styles.downArrow}/>

                </div>
            </div>
            <div className={styles.mainNavbar}>
                <div className="flex items-center">
                    <Image src={`/assets/shopexpress.jpg`} height={70} width={70} alt="dasd" />
                    <span className={styles.logoName}>ShopExpress</span>
                </div>
                <div className={styles.navMenu}>
                        <li className='relative mr-2'>
                            <span>Category</span>

                            <Image
                                src={`/assets/arrow-down.svg`}
                                height={20}
                                width={20}
                                className='absolute top-1 invert right-[-1.3em]'                                
                                alt="ddfsdf"
                            />                        
                        </li>
                        <li>
                            <span>Deals</span>
                        </li>
                        <li>
                            <span>What's New</span>
                        </li>
                        <li >
                            <span>Delivery</span>
                        </li>
                </div>
                <div className={styles.searchItem}>

                    <input type="text" placeholder='Search Product' className='bg-transparent outline-none tracking-wide placeholder:text-borderGrey placeholder:text-[.9rem] px-0 py-auto'/>
                    <SearchRoundedIcon/>

                </div>

                <div className="flex gap-[.8em] cursor-pointer" onClick={signInWithGoogle}>

                    {auth.currentUser ?
                        <>
                            <Image
                                src={`https://res.cloudinary.com/demo/image/fetch/${auth.currentUser.photoURL}`}
                                height={20}
                                width={20}
                                alt="asdasdas"                                
                                className='rounded-full scale-[1.8]'
                            />

                            <span className='text-[.9rem] text-black'>{auth.currentUser.displayName}</span>
                        </>
                        :
                        <>
                            <AccountCircleRoundedIcon/>

                            <span className='text-[.9rem] text-black'>Account</span>
                        </>
                    }
                </div>

                <div className="flex gap-[.1em]" onClick={()=>signOut(auth)}>
                <AddShoppingCartRoundedIcon/>
                    <span className='text-[.9rem]'>Cart</span>
                </div>
            </div>
        </div>
    )
}
