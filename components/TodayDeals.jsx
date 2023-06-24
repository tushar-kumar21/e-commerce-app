import { productCategoriesData } from "@/data";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";

const productsFetcher=async(url)=>{
    try{
        const response  = await fetch(url)
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}

export const TodayDeals = () => {
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState("smartphones");
    
    const { data : productsData, error : productsError } = useSWR(`https://dummyjson.com/products/category/${category}`, productsFetcher);

    const { data : categoriesData, error : CategoriesError } = useSWR(`https://dummyjson.com/products/categories`, async(url)=>{
        try{
            const response = await fetch(url)
            const data = await response.json();
            return data; 
        }catch(error){
            console.log(error)
        }
    });    

    return (
        <div className="todays-deals-container">

            <h2>Todays Best Deals For You!</h2>

            <div className="products-categories">
                {
                    categoriesData &&
                    categoriesData.map((categories, ind) => {
                        return (
                            <span className={ind === value ?
                                'products-categories-active' : undefined} onClick={(e) =>{ 
                                setValue(ind)
                                setCategory(e.target.getAttribute('category'))
                                }} category={categories} >
                                {categories}
                            </span>
                        )
                    })
                }
            </div>
            <div className="categories-items-container">
                <div className="categories-deals-cards">
                    {
                        productsData &&
                        productsData.products.map((product,ind)=>{
                            return(
                                <div className="product" key={product.id}>                
                                <img src={product.thumbnail} alt="" />
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
                </div>
            </div>

            <div className="cashback-banner">
                <div>
                    <h1>Get 5% Cash Back</h1>
                    <h4>on ShopExpress.com</h4>
                    <button>Learn More</button>
                </div>
                <img src="assets/card.jpg" alt="dsdas"/>
            </div>
        </div>
    )
}