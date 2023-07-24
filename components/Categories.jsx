import { categoriesData } from "@/data"

//STYLES

const styles = {
    categoriesContainer: 'max-w-full py-0 px-8 pt-16 ',
    cards: 'max-w-full flex justify-between pt-5 category-cards-container',
    categoryCards: 'w-[180px] rounded-xl h-[210px] text-center pt-[1em] relative overflow-hidden cursor-pointer category-card transition ease-[cubic-bezier(0.19, 1, 0.22, 1)] duration-1000',
    cardImg: 'w-full min-h-full object-cover z-[-1] absolute top-0 left-0',
    cardTitle: 'text-2xl text-semibold text-white z-10 inline-block transition ease-[cubic-bezier(0.19, 1, 0.22, 1)] duration-500 category-title'
}

const categoryHandleMouseEnter=(val)=>{
    let card = document.querySelectorAll('.category-card');
    let title = document.querySelectorAll('.category-title');
    if (card[val]) {
        card[val].style.transform = `translateZ(50px) rotateY(360deg) scale(1.05)`;                
        card[val].style.zIndex = `5`;                
        title[val].style.transform=`translateZ(200px)`;
    }
}
const categoryHandleMouseLeave=(val)=>{
    let card = document.querySelectorAll('.category-card');
    let title = document.querySelectorAll('.category-title');
    if (card[val]) {
        card[val].style.transform = `translateZ(0px) rotateY(0deg) scale(1)`;
        card[val].style.zIndex = `0`;                
        title[val].style.transform=`translateZ(0px)`;
    }
}

export const Categories = () => {
    return (
        <div className={styles.categoriesContainer}>
            <h2 className="text-3xl">Shop Our Top Categories</h2>
            <div className={styles.cards}>
                {
                    categoriesData &&
                    categoriesData.map((data, ind) => {
                        return (
                            <div
                                className={styles.categoryCards}
                                key={ind}
                                onMouseEnter={()=>categoryHandleMouseEnter(ind)}
                                onMouseLeave={()=>categoryHandleMouseLeave(ind)}
                                >
                                <img
                                    src={data.img}
                                    alt=""
                                    className={styles.cardImg} />

                                <span
                                    className={styles.cardTitle}>{data.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}