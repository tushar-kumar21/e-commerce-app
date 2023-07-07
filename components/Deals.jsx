import Image from "next/image"
import { motion } from "framer-motion";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
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
    dealsContainer: 'max-w-full pt-16 px-8 py-0 overflow-hidden relative group-hover:visible group-hover:pointer-events-auto deals-custom',
    dealsCards: 'flex justify-between gap-8 w-full h-fit pt-4 transition-cubic',
    product: "relative min-w-[380px] h-[460px] cursor-grab flex flex-col justify-start rounded-xl",
    productImg: "w-full h-[55%] object-cover rounded-xl pointer-events-none mb-10",
    likeImg: "m-4 w-9 h-9 absolute p-2 right-0 bg-likeBg rounded-full",
    productName:"flex justify-between gap-4 mx-1 my-0",
    productContent:"text-[1rem] font-semibold tracking-wide",
    productCategory:"text-[#757575] text-xs tracking-wide ml-1",
    // cartBtn:
}

export const Deals = () => {
    const [transform, setTransform] = useState(0);
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    const router = useRouter();
    const fb = useFirebase();
    const { addItemToCart } = fb;

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=12`, productsFetcher)

    let c = 0;
    useEffect(() => {
        c++;
        if (c < 5) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    const rightArrow = () => {
        setTransform(transform + 103)
        if (transform === -103) {
            document.querySelector('.left').style.display = "none";
        } else {
            document.querySelector('.left').style.display = "block";
        }
        document.querySelector('.right').style.display = "block";
    }
    const leftArrow = () => {
        setTransform(transform - 103)
        if (transform === -824) {
            document.querySelector('.right').style.display = "none";
        } else {
            document.querySelector('.right').style.display = "block";
        }
        document.querySelector('.left').style.display = "block";
    }

    return (
        <div className={styles.dealsContainer} ref={carousel}>
            <ArrowBackIosNewRoundedIcon className="absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none left-0 left arrows" onClick={rightArrow} />
            <ArrowForwardIosRoundedIcon className="absolute bottom-[45%] scale-[2] my-0 mx-4 z-10 cursor-pointer border border-[#00000042] px-[.1em] bg-white rounded-md invisible pointer-events-none right-0 right arrows" onClick={leftArrow} />
            <h2 className="text-3xl">Todays Best Deals For You!</h2>
            <div className={styles.dealsCards} style={{ transform: `translateX(${transform}%)` }}>
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
                                    <span className={styles.productContent}>{product.title}</span>
                                    <span className={styles.productContent}>${product.price}</span>
                                </div>

                                <div className="product-details">
                                    <span className={styles.productCategory}>{product.category}</span>
                                    <div className="flex mt-2">

                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" className="w"/>
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <span className="text-[#3c3c3c] text-xs ml-1">{product.rating}</span>
                                    </div>
                                    <button
                                        className="border-black border-[1.4px] text-black font-semibold text-xs w-fit py-3 px-6 rounded-[2rem] tracking-wide bg-white absolute bottom-0"
                                        img={product.thumbnail}
                                        name={product.title}
                                        brand={product.brand}
                                        discount={product.discountPercentage}
                                        price={product.price}
                                        category={product.category}
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