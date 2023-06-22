import Image from "next/image"
export const Deals=()=>{
    return(
      <div className="deals-container">
        <h2>Todays Best Deals For You!</h2>
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
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
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
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
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
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <Image src={`/assets/stars.svg`} height={15} width={15} alt="rsnds"/>
                    <span>(121)</span>
                </div>
                <button>Add to Cart</button>
            </div>
            </div>
        </div>
      </div>
    )
}