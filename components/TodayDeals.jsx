import { productCategoriesData } from "@/data";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFirebase } from "@/firebase/firebase";

const productsFetcher = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

//STYLES

const styles = {
    productCategories: "flex max-w-full flex-wrap gap-4 py-0 px-8",
    categoriesItemContainer: "max-w-full pt-16 py-0 px-8 overflow-hidden",
    categoryDealCards: "flex flex-wrap justify-start gap-6 w-full h-fit",
    categoriesName:"border border-[#00000079] py-3 px-4 text-sm rounded-[2em] tracking-wide cursor-pointer select-none hover:bg-main hover:text-white transition-cubic",
    categoryActive:"text-white bg-main",
    product: "relative basis-[23.5%] cursor-grab h-[480px] flex flex-col justify-start rounded-xl",
    productImg: "w-full h-[55%] object-cover rounded-xl pointer-events-none mb-10",
    likeImg: "m-4 w-5 h-5 absolute right-0 p-2 bg-[#ffffffb1] rounded-full",
    cartBtn: "border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide bg-white absolute bottom-0",
    productName: "flex justify-between gap-4 my-1 mx-0",
    btn: 'text-white bg-main border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 hover:bg-transparent hover:text-main hover:border-main',

}

export const TodayDeals = () => {
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState("smartphones");
    const fb = useFirebase()
    const { addItemToCart } = fb;
    const router = useRouter();

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products/category/${category}`, productsFetcher);

    const { data: categoriesData, error: CategoriesError } = useSWR(`https://dummyjson.com/products/categories`, async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    });

    return (
        <div className="max-w-full pt-16">

            <h2 className="text-3xl py-0 px-4 pb-8">Todays Best Deals For You!</h2>

            <div className={styles.productCategories}>
                {
                    categoriesData &&
                    categoriesData.map((categories, ind) => {
                        return (
                            <span className={ind === value ? 
                                `${styles.categoriesName} + ${styles.categoryActive}`
                                : 
                                styles.categoriesName} 
                                
                                onClick={(e) => {
                                    setValue(ind)
                                    setCategory(e.target.getAttribute('category'))
                                }}
                                category={categories} >
                                {categories}
                            </span>
                        )
                    })
                }
            </div>
            <div className={styles.categoriesItemContainer}>
                <div className={styles.categoryDealCards}>
                    {
                        productsData &&
                        productsData.products.map((product, ind) => {
                            return (
                                <div className={styles.product}
                                    key={product.id}
                                    onClick={() => router.push(`/Products/${product.id}`)}>

                                    <img
                                        src={product.thumbnail}
                                        alt=""
                                        className={styles.productImg}
                                    />

                                    <Image
                                        src={`/assets/like.svg`}
                                        height={20}
                                        width={20}
                                        alt="asdasd"
                                        className={styles.likeImg}
                                    />

                                    <div className={styles.productName}>                                        
                                        <span className="text-[1rem] font-semibold tracking-wide">{product.title}</span>
                                        <span className="text-[1rem] font-semibold tracking-wide">${product.price}</span>
                                    </div>

                                    <div className="product-details">
                                        <span className="text-[#757575] text-xs tracking-wide">{product.category}</span>
                                        <div className="flex mt-2">
                                            <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                            <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                            <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                            <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                            <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                            <span className="text-[#3c3c3c] text-xs ml-1">{product.rating}</span>
                                        </div>
                                        <button
                                            img={product.thumbnail}
                                            name={product.title}
                                            brand={product.brand}
                                            discount={product.discountPercentage}
                                            price={product.price}
                                            category={product.category}
                                            stock={product.stock}
                                            desc={product.description}
                                            id={product.id}
                                            className={styles.cartBtn}
                                            onClick={addItemToCart}>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="max-w-full flex justify-around items-center bg-[#ffe6cc] mt-24">
                <div>
                    <h1 className="text-5xl leading-10">Get 5% Cash Back</h1>
                    <h4 className="text-xl leading-10">on ShopExpress.com</h4>
                    <button className={styles.btn}>Learn More</button>
                </div>
                <img src="assets/card.jpg" alt="dsdas" className="w-[40%] rounded-full scale-90" />
            </div>
        </div>
    )
}