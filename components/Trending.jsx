
//STYLES

const styles = {
    trendingItems: "max-w-full flex gap-6 pt-4 flex-wrap",
    trendingProducts: "flex grow shrink basis-[500px] flex-col h-fit rounded-lg bg-[#f5f6f6] cursor-pointer overflow-hidden group",
    trendingItemsDetails: "py-4 px-8 flex flex-col",
    h2: "text-[1.35rem] m-0 mb-2",
    productImg: "w-full min-h-[300px] object-cover transition-all duration-300 group-hover:scale-105",
    btn: 'text-white bg-[#000000e1] border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 hover:bg-transparent hover:text-main hover:border-main',
}

export const Trending = () => {
    return (
        <div className="py-0 px-8 pt-16">
            <h1 className="text-3xl">Trending Products For You!</h1>
            <div className={styles.trendingItems}>
                <div className={styles.trendingProducts}>

                    <img
                        src="https://blog.americanfreight.com/wp-content/uploads/2020/02/Blog-Header-2_28-1120x506.jpg"
                        alt=""
                        className={styles.productImg}
                    />
                    <div className={styles.trendingItemsDetails}>
                        <h2 className={styles.h2}>Furniture Village</h2>
                        <span className="mb-5 text-sm">Delivery with in 24 hours</span>
                        <button className={styles.btn}>Shop Now</button>
                    </div>
                </div>
                <div className={styles.trendingProducts}>
                    <img
                        src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6037f3b456acf2024_Fashion%20world-min.png"
                        alt=""
                        className={styles.productImg}
                    />
                    <div className={styles.trendingItemsDetails}>
                        <h2 className={styles.h2}>Fashion World</h2>
                        <span className="mb-5 text-sm">Delivery with in 24 hours</span>
                        <button className={styles.btn}>Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}