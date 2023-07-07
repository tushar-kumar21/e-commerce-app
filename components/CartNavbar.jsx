import Image from "next/image"
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { useRouter } from "next/router"
import { useFirebase } from "@/firebase/firebase";
import { useEffect } from "react";

export const CartNavbar=()=>{

    const router = useRouter();
    const fb = useFirebase();
    const { cartSize, getCartSize, getCurrentUser, currentUser } = fb;

    useEffect(()=>{
        getCurrentUser();
        getCartSize();
        console.log("yes")
    },[currentUser])

    return(
        <div className="product-container">
            <div className="cart-navbar">
                <div className="logo-name">
                    <Image src={`/assets/shopexpress.jpg`} height={60} width={60} alt="dasd" />
                    <span>ShopExpress</span>
                </div>
                <div className="cart-input">
                    <input type="text" placeholder="Search for products, brands and more" />
                    <Image src={`/assets/search.svg`} height={20} width={20} alt="sdasd" />
                </div>
                <div className="user">
                    <span>Sign in</span>
                    <Image src={`/assets/cart-account.svg`} height={23} width={23} alt="asa" />
                </div>
                <div className="cart" onClick={()=>router.push("/Cart")}>
                <AddShoppingCartRoundedIcon sx={{color:'#5b18ac'}}/>
                <span>Cart</span>                
                <span>{cartSize}</span>                
                </div>
            </div>
        </div>
    )
}