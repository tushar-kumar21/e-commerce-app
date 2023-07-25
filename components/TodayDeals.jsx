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
    productCategories:"flex max-w-full flex-wrap gap-4 py-0 px-8 md:hidden",
    categoriesItemContainer:"max-w-full pt-16 py-0 px-8",
    categoryDealCards:"flex flex-wrap justify-start gap-6 w-full h-fit tcard-container",
    categoriesName:"border border-[#00000079] py-3 px-4 text-sm rounded-[2em] tracking-wide cursor-pointer select-none hover:bg-main hover:text-white transition-cubic",
    categoryActive: "text-white bg-main",
    product:"relative basis-[23.5%] cursor-grab h-[480px] flex flex-col justify-start rounded-xl tcard p-2",
    productImg:"w-full h-[55%] object-contain rounded-xl pointer-events-none mb-10 tlikeimg",
    likeImg:"m-4 w-8 h-8 absolute p-2 right-2 top-4 bg-likeBg rounded-full z-[9999]  tlike",
    cartBtn:"border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide bg-white absolute bottom-0 transition-all duration-300 hover:bg-black hover:text-white tcbtn",
    productName:"flex justify-between gap-4 my-1 mx-0 ttitle",
    btn:'text-white bg-main border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 hover:bg-transparent hover:text-main hover:border-main',
    cashback:"max-w-full flex justify-around items-center bg-[#ffe6cc] mt-24",
    selectBox:"hidden md:block border-2 border-slate-600 rounded-md mx-4 px-2 py-1 focus:border-main focus:border-[3px]"
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


    const thandleMouseMove = (e, val) => {
        let txAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let tyAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.tcard')[val]) {
            document.querySelectorAll('.tcard')[val].style.transform = `rotateY(${txAxis}deg) rotateX(${tyAxis + 150}deg)`
            document.querySelectorAll('.tcard')[val].addEventListener("mousemove", thandleMouseMove);
        }
        console.log(txAxis, tyAxis)
    };
    const handleMouseLeave = (val) => {
        let card = document.querySelectorAll('.tcard');
        let like = document.querySelectorAll('.tlike');
        let title = document.querySelectorAll('.ttitle');
        let cbtn = document.querySelectorAll('.tcbtn');
        let img = document.querySelectorAll('.tlikeimg');
        let details = document.querySelectorAll('.tproduct-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all 1s ease-in-out";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            details[val].style.transform = "none";
            cbtn[val].style.transform = "translateY(0px)";
            cbtn[val].style.boxShadow="none";
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
        }
    };
    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.tcard');
        let like = document.querySelectorAll('.tlike');
        let title = document.querySelectorAll('.ttitle');
        let cbtn = document.querySelectorAll('.tcbtn');
        let img = document.querySelectorAll('.tlikeimg');
        let details = document.querySelectorAll('.tproduct-details');
        if (card ) {
            card[val].style.transition = "none";
            card[val].style.transform = "translateZ(100px)";
            like[val].style.transform = "translateZ(150px)";
            title[val].style.transform = "translateZ(130px)";
            cbtn[val].style.transform = "translateY(70px)";
            cbtn[val].style.boxShadow = "0px 5px 15px #80808094";
            details[val].style.transform = "translateZ(130px)";
            img[val].style.transform = "translateZ(100px) scale(.8)";
            card[val].style.boxShadow = "0px 0px 10px grey";            
        }
    };


    return (
        <div className="max-w-full pt-16">

            <h2 className="text-3xl py-0 px-4 pb-8 sm:pb-6 sm:text-2xl">Todays Best Deals For You!</h2>
            <select className={styles.selectBox}  
            onChange={(e)=>setCategory(e.target.value)}>                
                {
                    categoriesData &&
                    categoriesData.map((categories,ind)=>{
                        return(
                            <option>{categories}</option>
                        )                    
                    })
                }
            </select>

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
                                    onMouseMove={(e) => thandleMouseMove(e, ind)}
                                    onMouseEnter={() => handleMouseEnter(ind)}
                                    onMouseLeave={() => handleMouseLeave(ind)}
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

                                    <div className="tproduct-details">
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

            <div className={styles.cashback}>
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