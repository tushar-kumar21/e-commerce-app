import React from 'react'
import Image from 'next/image';
export const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="small-navbar">
                <div className="phn">

                    <Image
                        src={`/assets/phone.svg`}
                        height={17}
                        width={17}
                    />

                    <span>+001234567890</span>
                </div>

                <div className="nav-discount">
                    <span>Get 50% Off on Selected Items &nbsp; &nbsp;| &nbsp; &nbsp; Shop Now</span>
                </div>

                <div className="loc-lang">
                    <span>English</span>

                    <Image
                        src={`/assets/arrow-down.svg`}
                        height={18}
                        width={18}
                    />

                    <span>Location</span>

                    <Image
                        src={`/assets/arrow-down.svg`}
                        height={18}
                        width={18}
                    />

                </div>
            </div>
            <div className="main-navbar">
                <div className="logo-name">
                    <Image src={`/assets/shopexpress.jpg`} height={70} width={70} alt="dasd"/>
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

                    <input type="text" placeholder='Search Product'/>

                    <Image
                        src={`/assets/search.svg`}
                        height={20}
                        width={20}
                        alt="adsadas"
                    />

                </div>-
                <div className="account">

                    <Image
                        src={`/assets/account.svg`}
                        height={20}
                        width={20}
                        alt="asdasdas"
                    />

                    <span>Account</span>
                </div>
                
                <div className="cart">

                    <Image
                        src={`/assets/cart.svg`}
                        height={20}
                        width={20}
                        alt="dasdsa"
                    />
                    <span>Cart</span>
                </div>
            </div>
        </div>
    )
}
