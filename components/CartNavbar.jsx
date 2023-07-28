import Image from "next/image"
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { useRouter } from "next/router"
import { useFirebase } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

//STYLES
const styles = {
    logoName: 'text-main text-[1.1rem] tracking-wide font-bold sm:hidden',
    cartSize: "flex justify-center items-center border-[1.5px] border-white rounded-lg bg-red-500 text-white absolute left-[6px] top-[-12px] p-[.46em] text-xs h-[.5em]",
    cart: "flex items-center text-main gap-1 relative cursor-pointer",
    cartNavbar: "flex justify-between items-center bg-white shadow-[0_0_6px_grey] px-16 md:px-6 sm:px-2",
    cartInput: "border-2 border-main rounded-[.3em] h-fit w-1/3 py-1 px-4 flex justify-between items-center relative md:w-2/4",
    cartInputSearch: "h-6 w-[60%] border-0 outline-0 placeholder:text-[#808080] placeholder:text-xs",
    searchBox: 'absolute top-[100%] w-full bg-white h-fit left-0 z-10 mt-2 rounded-lg max-h-[430px] overflow-auto search-scrollbar',
    searchProducts: 'list-none px-3 py-1 border-b-[1.5px] border-b-[#80808023] flex gap-5 items-center justify-start cursor-pointer hover:bg-gray-100',
}

export const CartNavbar = () => {
    const [products, getProducts] = useState(null)
    const router = useRouter();
    const fb = useFirebase();
    const { cartSize, getCartSize, getCurrentUser, currentUser, getProductsData, productsData } = fb;    

    const handleChange = (value) => {
        getProductsData()
        const results = productsData && productsData.filter((user) => {
            return (
                value &&
                user &&
                user.name &&
                user.name.toLowerCase().includes(value)
            )
        })
      getProducts(results)
    }

    useEffect(() => {
        getProductsData()
        getCurrentUser();
        getCartSize();
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
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className={styles.cartInputSearch}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <SearchRoundedIcon className="!w-5 !h-5"/>
                    <aside className={styles.searchBox}>
                        {
                          products && products.map((data) => {
                                return (
                                    <li
                                        className={styles.searchProducts}
                                        key={data.id}
                                        >
                                        <img
                                            src={data.image}
                                            alt="asCASDS"
                                            className='rounded-sm w-12 h-10'
                                        />
                                        <span className='text-[#808080] text-sm'>{data.name}</span>
                                    </li>
                                )
                            })
                        }
                    </aside>
                </div>
                {
                    currentUser ?
                        <div className="text-main flex items-center gap-[.3em]">
                            <span className="md:hidden">{currentUser.displayName}</span>
                            <img
                                src={currentUser.photoURL}
                                height={25}
                                width={25}
                                className="rounded-full scale-110 md:scale-150"
                                alt="asa"
                            />
                        </div>
                        :
                        <div className="text-main flex items-center gap-[.3em]">
                            <span className="md:hidden">Sign in</span>
                            <img
                                src={`/assets/cart-account.svg`}
                                height={23}
                                width={23}
                                className="scale-110 md:scale-150"
                                alt="asa"
                            />
                        </div>
                }
                <div className={styles.cart} 
                onClick={() => router.push("/Cart")}>
                    <AddShoppingCartRoundedIcon sx={{ color: '#5b18ac' }} />
                    <span>Cart</span>
                  { currentUser && <span className={styles.cartSize}>{cartSize}</span>}
                </div>
            </div>
        </div>
    )
}