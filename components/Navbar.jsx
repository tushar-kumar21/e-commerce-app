import React from 'react'
import Image from 'next/image';
import { getAuth } from "firebase/auth";
import { useFirebase } from '@/firebase/firebase';
// MATERIAL ICONS
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const auth = getAuth();

export const Navbar = () => {
    const fb = useFirebase();
    const { signInWithGoogle } = fb;

    return (
        <div className="navbar-container">
            <div className="small-navbar">
                <div className="phn">

                    {/* <Image
                        src={`/assets/phone.svg`}
                        height={17}
                        width={17}
                    /> */}
                    <CallIcon sx={{height:'17px', width:'17px', color:'#fff'}}/>

                    <span>+001234567890</span>
                </div>

                <div className="nav-discount">
                    <span>Get 50% Off on Selected Items &nbsp; &nbsp;| &nbsp; &nbsp; Shop Now</span>
                </div>

                <div className="loc-lang">
                    <span>English</span>

                    <KeyboardArrowDownRoundedIcon sx={{height:'25px', width:'25px', color:'#fff'}}/>

                    <span>Location</span>

                    <KeyboardArrowDownRoundedIcon sx={{height:'25px', width:'25px', color:'#fff'}}/>

                </div>
            </div>
            <div className="main-navbar">
                <div className="logo-name">
                    <Image src={`/assets/shopexpress.jpg`} height={70} width={70} alt="dasd" />
                    <span>ShopExpress</span>
                </div>
                <div className="nav-menu">
                    <li>
                        <span>Category</span>

                        <Image
                            src={`/assets/arrow-down.svg`}
                            height={20}
                            width={20}
                            style={{
                                filter: 'invert(1)',
                                position: 'relative',
                                top: '.35em'
                            }}
                            alt="ddfsdf"
                        />                        
                    </li>
                    <li>
                        <span>Deals</span>
                    </li>
                    <li>
                        <span>What's New</span>
                    </li>
                    <li>
                        <span>Delivery</span>
                    </li>
                </div>
                <div className="search-item">

                    <input type="text" placeholder='Search Product' />
                    <SearchRoundedIcon/>

                </div>

                <div className="account" onClick={signInWithGoogle}>

                    {auth.currentUser ?
                        <>
                            <Image
                                src={`https://res.cloudinary.com/demo/image/fetch/${auth.currentUser.photoURL}`}
                                height={20}
                                width={20}
                                alt="asdasdas"
                                style={{borderRadius:'50%',transform:'scale(1.8)'}}
                            />

                            <span>{auth.currentUser.displayName}</span>
                        </>
                        :
                        <>
                            <AccountCircleRoundedIcon/>

                            <span>Account</span>
                        </>
                    }
                </div>

                <div className="cart">

                <AddShoppingCartRoundedIcon/>
                    <span>Cart</span>
                </div>
            </div>
        </div>
    )
}
