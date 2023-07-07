import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
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

export const MostSelling = () => {
    const [transform, setTransform] = useState(0);
    const [width, setWidth] = useState(0);
    const fb = useFirebase()
    const { addItemToCart } = fb;
    const carousel = useRef();
    const router = useRouter();    

    let c = 0;
    useEffect(() => {
        c++;
        if (c < 5) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    });

    const { data: productsData, error: productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=8`, productsFetcher)

    const rightArrow = () => {
        setTransform(transform + 103)
        if (transform === -103) {
            document.querySelector('.ls').style.display = "none";
        } else {
            document.querySelector('.ls').style.display = "block";
        }
        document.querySelector('.rs').style.display = "block";
    }
    const leftArrow = () => {
        setTransform(transform - 103)
        if (transform === -515) {
            document.querySelector('.rs').style.display = "none";
        } else {
            document.querySelector('.rs').style.display = "block";
        }
        document.querySelector('.ls').style.display = "block";
    }

    return (
        <div className="deals-container" ref={carousel}>
            <ArrowBackIosNewRoundedIcon className="arrow left ls" onClick={rightArrow} />
            <ArrowForwardIosRoundedIcon className="arrow right rs" onClick={leftArrow} />
            <h2>Most Selling Product</h2>
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