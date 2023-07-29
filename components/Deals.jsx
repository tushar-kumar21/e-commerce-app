import Image from "next/image"
import { motion } from "framer-motion";
import useSWR from "swr";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useMyContext } from "@/Context/context";
import { useFirebase } from "@/firebase/firebase";
import { Loader } from "./Loader";

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
    dealsCards: 'flex justify-between gap-8 pb-3 w-full h-fit pt-4 transition-cubic overflow-x-scroll overflow-y-hidden scrollbar card-container sm:gap-4',
    product: "relative min-w-[380px] h-[490px] cursor-grab flex flex-col justify-start rounded-xl card px-2 md:min-w-[300px] md:h-[400px] sm:min-w-[250px] sm:overflow-hidden xxs:min-w-[190px] xs:h-[430px]",
    productImg: "w-full h-[55%] object-contain rounded-xl pointer-events-none mb-10 likeimg z-10 ",
    likeImg: "m-4 w-9 h-9 absolute p-2 right-2 top-4 bg-likeBg rounded-full z-[9999] like",
    productName: "flex justify-between gap-4 mx-1 my-0 title",
    productContent: "text-[1rem] font-semibold tracking-wide sm:mt-[-3em]",
    productCategory: "text-[#757575] text-xs tracking-wide ml-1",
    cartBtn: "border-black border-[1.3px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide transition-all duration-300 hover:bg-black hover:text-white bg-white absolute bottom-0 sm:bottom-[-8px] mb-4 flex items-center cbtn",
    loader:"h-24 w-24 absolute z-[9999] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
}

export const Deals = () => {
    const [transform, setTransform] = useState(0);
    const [loader, setLoader] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [value, setValue] = useState();
    const router = useRouter();
    const fb = useFirebase();
    const { addItemToCart, currentUser } = fb;

    useEffect(() => {
        setBtnLoader(false)
        setLoader(false);
    }, [])

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=12`, productsFetcher)

    const handleMouseMove = (e, val) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.card')[val]) {
            document.querySelectorAll('.card')[val].style.transform = `rotateY(${xAxis * 2}deg) rotateX(${yAxis + 30}deg)`
            document.querySelectorAll('.card')[val].addEventListener("mousemove", handleMouseMove);
        }
        console.log(xAxis, yAxis)
    };

    const handleMouseLeave = (val) => {
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.likeimg');
        let details = document.querySelectorAll('.product-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all 1s ease-in-out";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            details[val].style.transform = "none";
            cbtn[val].style.transform = "translateY(0px)";
            cbtn[val].style.boxShadow = "none";
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
        }
    };

    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.likeimg');
        let details = document.querySelectorAll('.product-details');
        if (card) {
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
        <div className={styles.dealsContainer} id="deals">
              { loader && <img src="/assets/eliipsis.gif" alt="" className={styles.loader} />}
            <h2 className="text-3xl sm:text-2xl">Todays Best Deals For You!</h2>
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
                                onClick={() => {
                                    router.push(`/Products/${product.id}`)
                                    setLoader(true)
                                }}
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

                                <div className="product-details">
                                    <span className={styles.productCategory}>{product.category}</span>
                                    <div className="flex mt-2">
                                        <img src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <img src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <img src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <img src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <img src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <span className="text-[#3c3c3c] text-xs ml-1">{product.rating}</span>
                                    </div>
                                    {value === ind && btnLoader ?
                                        <button
                                            className={styles.cartBtn}>
                                            <img src="/assets/ring.gif" className="w-6 h-6 absolute left-[1px] invert" alt="" />
                                            Processing</button>
                                        :
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
                                            onClick={(e) => {
                                                currentUser && addItemToCart(e)
                                                setBtnLoader(true)
                                                setValue(ind)
                                            }}>
                                            Add to Cart</button>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}