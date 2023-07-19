import Image from "next/image"
import { motion } from "framer-motion";
import useSWR from "swr";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useMyContext } from "@/Context/context";
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
    dealsContainer: 'max-w-full pt-16 px-8 py-0 relative group-hover:visible group-hover:pointer-events-auto deals-custom ',
    dealsCards: 'flex justify-between gap-8 pb-3 w-full h-fit pt-4 transition-cubic overflow-x-scroll scrollbar card-container',
    product: "relative min-w-[380px] h-[490px] cursor-grab flex flex-col justify-start rounded-xl card",
    productImg: "w-full h-[55%] object-cover rounded-xl pointer-events-none mb-10 imgg",
    likeImg: "m-4 w-9 h-9 absolute p-2 right-0 bg-likeBg rounded-full z-[9999] like",
    productName: "flex justify-between gap-4 mx-1 my-0 title",
    productContent: "text-[1rem] font-semibold tracking-wide ",
    productCategory: "text-[#757575] text-xs tracking-wide ml-1",
    cartBtn: "border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide bg-white absolute bottom-0 mb-4 cbtn",
}

export const Deals = () => {
    const [transform, setTransform] = useState(0);
    const [counter, setCounter] = useState(0);
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    const router = useRouter();
    const fb = useFirebase();
    const { addItemToCart } = fb;

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=12`, productsFetcher)

    const handleMouseMove = (e, val) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.card')[val]) {
            document.querySelectorAll('.card')[val].style.transform = `rotateY(${xAxis*2}deg) rotateX(${yAxis+30}deg)`
            document.querySelectorAll('.card')[val].addEventListener("mousemove", handleMouseMove);
        }
        console.log(xAxis, yAxis)
    };

    const handleMouseLeave = (val) => { 
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.imgg');
        let container = document.querySelector('.card-container')
        let details = document.querySelectorAll('.product-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all .5s ease";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            // details[val].style.transform="translateZ(0px)";            
            cbtn[val].style.transform = "translateZ(0px)";
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
            container.style.overflowX="scroll"
            container.style.overflowY="hidden"
        }
    };

    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.imgg');
        let container = document.querySelector('.card-container')
        let details = document.querySelectorAll('.product-details');
        if (card) {
            card[val].style.transition = "none";
            card[val].style.transform = "translateZ(100px)";
            like[val].style.transform = "translateZ(150px)";
            title[val].style.transform = "translateZ(130px)";
            cbtn[val].style.transform = "translateZ(200px)";
            // details[val].style.transform="translateZ(100px)";            
            img[val].style.transform = "translateZ(100px) scale(.8)";
            // img[val].style.boxShadow="0px 0px 10px grey";
            card[val].style.boxShadow = "0px 0px 10px grey";
            container.style.overflowX="visible";
            container.style.overflowY="visible";
        }
    };


    useEffect(() => {
        //     let card = document.querySelectorAll('.card');
        //     let like = document.querySelectorAll('.like');
        //     let title = document.querySelectorAll('.title');
        //     let cbtn = document.querySelectorAll('.cbtn');
        //     let img = document.querySelectorAll('.imgg');
        //     let details = document.querySelectorAll('.product-details');

        //   console.log(cbtn,title,like,img,card)
        //     if(counter < 200) { 
        //     setCounter(counter+1)
        // }

        // console.log(counter)
        // if (card[0]) {
        //   const handleMouseMove = (e) => {
        //     let xAxis = (window.innerWidth /2 - e.pageX) / 25;
        //     let yAxis = (window.innerWidth /2 - e.pageY) / 25;
        //     card[0].style.transform = `rotateY(${xAxis-10}deg) rotateX(${yAxis+30}deg)`

        // };

        //   const handleMouseLeave = () => {
        //     card[0].style.transform = `rotateY(0deg) rotateX(0deg)`
        //     card[0].style.transition="all .5s ease";            
        //     card[0].style.transform="translateZ(0px)";
        //     title[0].style.transform="translateZ(0px)";
        //     // details[0].style.transform="translateZ(0px)";            
        //     cbtn[0].style.transform="translateZ(0px)";
        //     like[0].style.transform="translateZ(0px)";
        //     img[0].style.transform="translateZ(0px) scale(1)";
        //     card[0].style.boxShadow="none";
        // };          

        //   card[0].addEventListener("mousemove", handleMouseMove);
        //   card[0].addEventListener("mouseleave", handleMouseLeave);
        //   card[0].addEventListener("mouseenter",()=>{
        //     card[0].style.transition="none";
        //     card[0].style.transform="translateZ(100px)";
        //     like[0].style.transform="translateZ(200px)";            
        //     title[0].style.transform="translateZ(150px)";            
        //     cbtn[0].style.transform="translateZ(100px)";            
        //     // details[0].style.transform="translateZ(100px)";            
        //     img[0].style.transform="translateZ(100px) scale(.9)";
        //     // img[0].style.boxShadow="0px 0px 10px grey";
        //     card[0].style.boxShadow="0px 0px 10px grey";
        //   })

        //   return () => {
        //     card[0].removeEventListener("mousemove", handleMouseMove);
        //     card[0].removeEventListener("mouseleave", handleMouseLeave);
        //   };
        // }
    }, [counter]);


    return (
        <div className={styles.dealsContainer}>        
            <h2 className="text-3xl">Todays Best Deals For You!</h2>
            <div className={styles.dealsCards} style={{ transform: `translateX(${transform}%)` }}>
                {
                    productsData &&
                    productsData.products.map((product, ind) => {

                        return (
                            <div className={styles.product}
                                key={product.id}
                                onMouseMove={(e) => handleMouseMove(e, ind)}
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
                                    <span className={styles.productContent}>{product.title}</span>
                                    <span className={styles.productContent}>${product.price}</span>
                                </div>

                                <div className="product-details">
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
                                        price={product.price}
                                        category={product.category}
                                        stock={product.stock}
                                        desc={product.description}
                                        id={product.id}
                                        onClick={addItemToCart}>
                                        Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}