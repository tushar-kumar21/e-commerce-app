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

export const Popular = () => {
    const [transform, setTransform] = useState(0);
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    const router = useRouter();
    const fb = useFirebase()
    const { addItemToCart } = fb;

    let c = 0;
    useEffect(() => {
        c++;
        if (c < 5) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?offset=20&skip=5&limit=20`, productsFetcher)

    const rightArrow = () => {
        setTransform(transform + 103)
        if (transform === -103) {
            document.querySelector('.lp').style.display = "none";
        } else {
            document.querySelector('.lp').style.display = "block";
        }
        document.querySelector('.rp').style.display = "block";
    }
    const leftArrow = () => {
        setTransform(transform - 103)
        if (transform === -515) {
            document.querySelector('.rp').style.display = "none";
        } else {
            document.querySelector('.rp').style.display = "block";
        }
        document.querySelector('.lp').style.display = "block";
    }

    return (
        <div className="deals-container" ref={carousel}>
            <ArrowBackIosNewRoundedIcon className="arrow left lp" onClick={rightArrow} />
            <ArrowForwardIosRoundedIcon className="arrow right rp" onClick={leftArrow} />
            <h2>Weekly Popular Products</h2>
            <div className="deals-cards" style={{ transform: `translateX(${transform}%)` }}>
                {
                    productsData &&
                    productsData.products.map((product, ind) => {
                        return (
                            <div className="product" key={product.id} style={{ padding: '0', border: 'none' }} onClick={() => router.push(`/Products/${product.id}`)}>
                                <img src={product.thumbnail} alt="" style={{ objectFit: 'cover' }} />
                                <Image src={`/assets/like.svg`} height={20} width={20} alt="asdasd" className="like-product" />
                                <div className="product-name">
                                    <span>{product.title}</span>
                                    <span>${product.price}</span>
                                </div>
                                <div className="product-details">
                                    <span>{product.category}</span>
                                    <div className="stars">
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                        <span>{product.rating}</span>
                                    </div>
                                    <button
                                        img={product.thumbnail}
                                        name={product.title}
                                        brand={product.brand}
                                        discount={product.discountPercentage}
                                        category={product.category}
                                        price={product.price}
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