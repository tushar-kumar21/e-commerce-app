import { productCategoriesData } from "@/data";
import { useState } from "react";
import Image from "next/image";

export const TodayDeals = () => {
    const [value, setValue] = useState(0);

    return (
        <div className="todays-deals-container">

            <h2>Todays Best Deals For You!</h2>

            <div className="products-categories">
                {
                    productCategoriesData &&
                    productCategoriesData.map((data, ind) => {
                        return (
                            <span className={ind === value ?
                                'products-categories-active' : undefined} onClick={() => setValue(ind)}>
                                {data}
                            </span>
                        )
                    })
                }
            </div>
            <div className="deals-container">
                <div className="deals-cards">
                    <div className="product">
                        <img src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" alt="" />
                        <Image src={`/assets/like.svg`} height={20} width={20} alt="asdasd" className="like-product" />
                        <div className="product-name">
                            <span>Shopping Bag</span>
                            <span>$239.00</span>
                        </div>
                        <div className="product-details">
                            <span>Canvas, full grain leather</span>
                            <div className="stars">
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <span>(121)</span>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="product">
                        <img src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" alt="" />
                        <Image src={`/assets/like.svg`} height={20} width={20} alt="asdasd" className="like-product" />
                        <div className="product-name">
                            <span>Shopping Bag</span>
                            <span>$239.00</span>
                        </div>
                        <div className="product-details">
                            <span>Canvas, full grain leather</span>
                            <div className="stars">
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <span>(121)</span>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="product">
                        <img src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" alt="" />
                        <Image src={`/assets/like.svg`} height={20} width={20} alt="asdasd" className="like-product" />
                        <div className="product-name">
                            <span>Shopping Bag</span>
                            <span>$239.00</span>
                        </div>
                        <div className="product-details">
                            <span>Canvas, full grain leather</span>
                            <div className="stars">
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds" />
                                <span>(121)</span>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                    </div>
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