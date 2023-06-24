import Image from "next/image"
import { motion } from "framer-motion";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";

const productsFetcher = async (url) => {
    try {
        const response = await fetch(url);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const Deals=()=>{

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    const { data : productsData, error : productsError } = useSWR(`https://dummyjson.com/products?limit=30&skip=12`, productsFetcher)
    
    let c = 0;
    useEffect(() => {
        c++;
        if(c < 5){
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    });

    return(
      <motion.div className="deals-container" ref={carousel}>
        <h2>Todays Best Deals For You!</h2>
        <motion.div drag="x" dragConstraints={{right:0, left: -width}} className="deals-cards" >            
        {
                productsData &&
                productsData.products.map((product, ind)=>{
                    return(
                        <div className="product" key={product.id} >                
                        <img src={product.thumbnail} alt=""/>
                        <Image src={`/assets/like.svg`} height={20} width={20} alt="asdasd" className="like-product" />
                        <div className="product-name">
                            <span>{product.title}</span>
                            <span>${product.price}</span>
                        </div>
                        <div className="product-details">
                            <span>{product.category}</span>
                            <div className="stars">
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                                <span>{product.rating}</span>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                        </div>
                    )
                })
            }
        </motion.div>
      </motion.div>
    )
}