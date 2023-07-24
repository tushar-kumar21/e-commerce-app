
//STYLES

import { coverContent } from "@/data"

const styles = {
    coverContainer: 'max-w-full h-[600px] flex justify-start items-center cover-bg relative overflow-hidden',
    content: 'w-[400px] flex flex-col gap-8 my-0 mx-10 z-10',
    btn: 'text-white bg-main border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 btn-hover hover:text-main hover:border-main',
    contentContainer:"w-[40%] h-full z-10 flex items-center overflow-hidden",
    wrapper:"flex animation-wrapper"
}

export const Cover = () => {
    return (
        <div className={styles.coverContainer}>
            <div className="img-container">
                <img src="https://assets.wpdeveloper.com/2019/04/How-to-Design-Homepage-of-Your-eCommerce-Site-To-Boost-Sales.png" alt="" />
                <img src="https://www.techwyse.com/wp-content/uploads/2018/09/UX-Design-Tips-1.jpg" alt="" />
                <img src="https://uploads-ssl.webflow.com/5fbd61596e034630dd2b86af/62626dcb774f0974b0237f70_biggest%20ecommerce%20challenges%20this%20year-p-1600.jpeg" alt="" />
                <img src="https://www.searchenginejournal.com/wp-content/uploads/2020/05/how-ecommerce-businesses-can-do-more-with-less-shopping-ad-budget-5ecbc6a9ea9cc.png" alt="" />
                <img src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/05/15205240/Difference-Between-E-Commerce-and-E-Business.png" alt="" />
                <img src="https://dailybayonet.com/wp-content/uploads/2020/04/5-creative-ways-to-boost.jpg" alt="" />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.wrapper}>
                    {
                        coverContent && coverContent.map((data, ind) => {
                            return (
                                <div className={styles.content} key={ind}>
                                    <h1 className="text-4xl text-main m-0" style={{color:`${data.color}`}}>{data.h1}</h1>
                                    <span className="text-xl text-main" style={{color:`${data.color}`}}>{data.span}
                                    </span>
                                    <button className={styles.btn} style={{backgroundColor:`${data.color}`}}>Learn More</button>
                                </div>
                            )
                        })
                    }               
                </div>
            </div>
        </div>
    )
}