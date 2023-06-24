export const Trending=()=>{
    return(
        <div className="trending-container">
            <h1>Trending Products For You!</h1>
            <div className="trending-items">
                <div className="trending-product">
                    <img src="https://blog.americanfreight.com/wp-content/uploads/2020/02/Blog-Header-2_28-1120x506.jpg" alt="" />
                    <div className="trending-item-details">
                        <h2>Furniture Village</h2>
                        <span>Delivery with in 24 hours</span>
                        <button>Shop Now</button>
                    </div>
                </div>
                <div className="trending-product">
                    <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6037f3b456acf2024_Fashion%20world-min.png" alt="" />
                    <div className="trending-item-details">
                        <h2>Fashion World</h2>
                        <span>Delivery with in 24 hours</span>
                        <button>Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}