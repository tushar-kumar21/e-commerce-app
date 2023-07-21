import Image from "next/image"
import { motion } from "framer-motion"
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRouter } from "next/router";
import { useFirebase } from "@/firebase/firebase";

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
    dealsContainer: 'max-w-full pt-16 px-8 py-0 overflow-hidden relative group-hover:visible group-hover:pointer-events-auto deals-custom',
    dealsCards: 'flex justify-between gap-8 w-full h-fit pt-4 transition-cubic pb-3 overflow-x-scroll overflow-y-hidden scrollbar pcard-container',
    product: "relative min-w-[380px] h-[460px] cursor-grab flex flex-col justify-start rounded-xl pcard px-2",
    productImg: "w-full h-[55%] object-contain rounded-xl pointer-events-none mb-10 plikeimg",
    likeImg: "m-4 w-9 h-9 absolute p-2 right-0 bg-likeBg rounded-full plike",
    productName: "flex justify-between gap-4 mx-1 my-0 ptitle",
    productContent: "text-[1rem] font-semibold tracking-wide",
    productCategory: "text-[#757575] text-xs tracking-wide ml-1",
    cartBtn: "border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide bg-white absolute bottom-0 mb-4 transition-all duration-300 hover:bg-black hover:text-white pcbtn",
    leftArrow: "absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none right-0 right arrows",
    rightArrow: "absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none left-0 left arrows"
}

export const Popular = () => {
    const [transform, setTransform] = useState(0);
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    const router = useRouter();
    const fb = useFirebase()
    const { addItemToCart } = fb;

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?offset=20&skip=5&limit=20`, productsFetcher)

    const phandleMouseMove = (e, val) => {
        let pxAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let pyAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.pcard')[val]) {
            document.querySelectorAll('.pcard')[val].style.transform = `rotateY(${pxAxis*2}deg) rotateX(${pyAxis+95}deg)`
            document.querySelectorAll('.pcard')[val].addEventListener("mousemove", phandleMouseMove);
        }
        console.log(pxAxis,pyAxis)
    };

    const handleMouseLeave = (val) => { 
        let card = document.querySelectorAll('.pcard');
        let like = document.querySelectorAll('.plike');
        let title = document.querySelectorAll('.ptitle');
        let cbtn = document.querySelectorAll('.pcbtn');
        let img = document.querySelectorAll('.plikeimg');
        let details = document.querySelectorAll('.pproduct-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all .5s ease";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            details[val].style.transform="none";            
            cbtn[val].style.transform="translateY(0px)";
            cbtn[val].style.boxShadow="none"
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
        }
    };
    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.pcard');
        let like = document.querySelectorAll('.plike');
        let title = document.querySelectorAll('.ptitle');
        let cbtn = document.querySelectorAll('.pcbtn');
        let img = document.querySelectorAll('.plikeimg');
        let details = document.querySelectorAll('.pproduct-details');
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


    // const rightArrow = () => {
    //     setTransform(transform + 103)
    //     if (transform === -103) {
    //         document.querySelector('.lp').style.display = "none";
    //     } else {
    //         document.querySelector('.lp').style.display = "block";
    //     }
    //     document.querySelector('.rp').style.display = "block";
    // }
    // const leftArrow = () => {
    //     setTransform(transform - 103)
    //     if (transform === -515) {
    //         document.querySelector('.rp').style.display = "none";
    //     } else {
    //         document.querySelector('.rp').style.display = "block";
    //     }
    //     document.querySelector('.lp').style.display = "block";
    // }

    return (
        <div className={styles.dealsContainer}>
            {/* <ArrowBackIosNewRoundedIcon className="arrow left lp" onClick={rightArrow} />
            <ArrowForwardIosRoundedIcon className="arrow right rp" onClick={leftArrow} /> */}
            <h2 className="text-3xl">Weekly Popular Products</h2>
            <div className={styles.dealsCards} style={{ transform: `translateX(${transform}%)` }}>
                {
                    productsData &&
                    productsData.products.map((product, ind) => {
                        return (
                            <div className={styles.product}
                                key={product.id}
                                onMouseMove={(e)=>phandleMouseMove(e,ind)}     
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
                                <div className="pproduct-details">
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
                                        img={product.thumbnail}
                                        name={product.title}
                                        brand={product.brand}
                                        discount={product.discountPercentage}
                                        category={product.category}
                                        price={product.price}
                                        stock={product.stock}
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
    )
}