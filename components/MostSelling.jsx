import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useFirebase } from "@/firebase/firebase";
import { useMyContext } from "@/Context/context";

const productsFetcher = async (url) => {
    try {
        const response = await fetch(url);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//STYLES

const styles = {
    dealsContainer: 'max-w-full pt-16 px-8 py-0 relative group-hover:visible group-hover:pointer-events-auto deals-custom sm:px-4',
    dealsCards: 'flex justify-between gap-8 pb-3 w-full h-fit pt-4 transition-cubic overflow-x-scroll overflow-y-hidden scrollbar mcard-container sm:gap-4',
    product: "relative min-w-[380px] h-[490px] cursor-grab flex flex-col justify-start rounded-xl mcard px-2 md:min-w-[300px] md:h-[400px] sm:min-w-[250px] sm:overflow-hidden xxs:min-w-[190px]",
    productImg: "w-full h-[55%] object-contain rounded-xl pointer-events-none mb-10 mlikeimg",
    likeImg: "m-4 w-9 h-9 absolute p-2 right-2 top-4 bg-likeBg rounded-full z-[9999] mlike",
    productName: "flex justify-between gap-4 mx-1 my-0 mtitle",
    productContent: "text-[1rem] font-semibold tracking-wide sm:mt-[-2.5em]",
    productCategory: "text-[#757575] text-xs tracking-wide ml-1",
    cartBtn: "border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide transition-all duration-300 bg-white absolute bottom-0 mb-4 hover:bg-black hover:text-white sm:bottom-[-12px] mcbtn",
    // leftArrow: "absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none right-0 right arrows",
    // rightArrow: "absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none left-0 left arrows"
}

export const MostSelling = () => {
    const [transform, setTransform] = useState(0);
    const [width, setWidth] = useState(0);
    const fb = useFirebase()
    const { addItemToCart } = fb;
    const carousel = useRef();
    const router = useRouter();
    const context = useMyContext();    

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=8`, productsFetcher)

    const mhandleMouseMove = (e, val) => {
        let mxAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let myAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.mcard')[val]) {
            document.querySelectorAll('.mcard')[val].style.transform = `rotateY(${mxAxis*2}deg) rotateX(${myAxis+220}deg)`
            document.querySelectorAll('.mcard')[val].addEventListener("mousemove", mhandleMouseMove);
        }
        console.log(mxAxis,myAxis)
    };
    const handleMouseLeave = (val) => { 
        let card = document.querySelectorAll('.mcard');
        let like = document.querySelectorAll('.mlike');
        let title = document.querySelectorAll('.mtitle');
        let cbtn = document.querySelectorAll('.mcbtn');
        let img = document.querySelectorAll('.mlikeimg');
        let details = document.querySelectorAll('.mproduct-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all 1s ease-in-out";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            details[val].style.transform="none";            
            cbtn[val].style.boxShadow="none";
            cbtn[val].style.transform="translateY(0px)";
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
        }
    };
    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.mcard');
        let like = document.querySelectorAll('.mlike');
        let title = document.querySelectorAll('.mtitle');
        let cbtn = document.querySelectorAll('.mcbtn');
        let img = document.querySelectorAll('.mlikeimg');
        let details = document.querySelectorAll('.mproduct-details');
        if (card) {
            card[val].style.transition = "none";
            card[val].style.transform = "translateZ(100px)";
            like[val].style.transform = "translateZ(150px)";
            title[val].style.transform = "translateZ(130px)";
            cbtn[val].style.transform="translateY(70px)";
            cbtn[val].style.boxShadow="0px 5px 15px #80808094"
            details[val].style.transform="translateZ(130px)";            
            img[val].style.transform = "translateZ(100px) scale(.8)";
            card[val].style.boxShadow = "0px 0px 10px grey";
        }
    };    
    return (
        <div className={styles.dealsContainer} id="new">
            {/* <ArrowBackIosNewRoundedIcon className={styles.rightArrow} />
            <ArrowForwardIosRoundedIcon className={styles.leftArrow} /> */}
            <h2 className="text-3xl sm:text-2xl">Most Selling Product</h2>
            <div className={styles.dealsCards} style={{ transform: `translateX(${transform}%)` }}>
                {
                    productsData &&
                    productsData.products.map((product, ind) => {
                        return (
                            <div className={styles.product}
                                key={product.id}           
                                onMouseMove={(e)=>mhandleMouseMove(e,ind)}     
                                onMouseEnter={()=>handleMouseEnter(ind)}                
                                onMouseLeave={()=>handleMouseLeave(ind)}                
                                onClick={() => router.push(`/Products/${product.id}`)}
                                >
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
                                    <span className={styles.productContent}>{product.title}</span>
                                    <span className={styles.productContent}>${product.price}</span>
                                </div>
                                <div className="mproduct-details">
                                    <span className={styles.productCategory}>{product.category}</span>
                                    <div className="flex mt-2">
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <span className="text-[#3c3c3c] text-xs ml-1">{product.rating}</span>
                                    </div>
                                    <button
                                        className={styles.cartBtn}
                                        img={product.thumbnail}
                                        name={product.title}
                                        brand={product.brand}
                                        discount={product.discountPercentage}
                                        category={product.category}
                                        price={product.price}
                                        stock={product.stock}
                                        desc={product.description}
                                        id={product.id}
                                        onClick={addItemToCart}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}