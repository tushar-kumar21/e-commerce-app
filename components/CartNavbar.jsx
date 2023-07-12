import Image from "next/image"
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { useRouter } from "next/router"
import { useFirebase } from "@/firebase/firebase";
import { useEffect } from "react";

//STYLES
const styles = {
    logoName: 'text-main text-[1.1rem] tracking-wide font-bold',
    cartSize: "flex justify-center items-center border-[1.5px] border-white rounded-lg bg-red-500 text-white absolute left-[6px] top-[-12px] p-[.46em] text-xs h-[.5em]",
    cart: "flex items-center text-main gap-1 relative cursor-pointer",
    cartNavbar: "flex justify-center items-center gap-20 bg-white shadow-[0_0_6px_grey]",
    cartInput: "border-2 border-main rounded-[.3em] h-fit w-1/3 py-1 px-4 flex justify-between items-center"
}

export const CartNavbar = () => {

    const router = useRouter();
    const fb = useFirebase();
    const { cartSize, getCartSize, getCurrentUser, currentUser } = fb;

    useEffect(() => {
        getCurrentUser();
        getCartSize();
        console.log("yes")
    }, [currentUser])

    return (
        <div>
            <div className={styles.cartNavbar}>
                <div className="flex items-center gap-0">
                    <Image
                        src={`/assets/shopexpress.jpg`}
                        height={60}
                        width={60}
                        alt="dasd"
                    />
                    <span className={styles.logoName}>ShopExpress</span>
                </div>
                <div className={styles.cartInput}>
                    <input type="text" placeholder="Search for products, brands and more" className="h-6 w-[60%] border-0 outline-0 placeholder:text-[#808080] placeholder:text-xs" />
                    <Image
                        src={`/assets/search.svg`}
                        height={20}
                        width={20}
                        alt="sdasd"
                    />
                </div>
                <div className="text-main flex items-center gap-[.3em]">
                    <span>Sign in</span>
                    <Image src={`/assets/cart-account.svg`} height={23} width={23} alt="asa" />
                </div>
                <div className={styles.cart} onClick={() => router.push("/Cart")}>
                    <AddShoppingCartRoundedIcon sx={{ color: '#5b18ac' }} />
                    <span>Cart</span>
                    <span className={styles.cartSize}>{cartSize}</span>
                </div>
            </div>
        </div>
    )
}