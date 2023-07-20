import { categoriesData } from "@/data"

//STYLES

const styles = {
    categoriesContainer: 'max-w-full py-0 px-8 pt-16',
    cards: 'max-w-full flex justify-between pt-5 category-cards-container',
    categoryCards: 'w-[180px] rounded-xl h-[210px] text-center pt-[1em] relative overflow-hidden cursor-pointer category-card transition ease-[cubic-bezier(0.19, 1, 0.22, 1)] duration-1000',
    cardImg: 'w-full min-h-full object-cover z-[-1] absolute top-0 left-0',
    cardTitle: 'text-2xl text-semibold text-white z-10 category-title'
}

// const categoryHandleMouseMove=(e,val)=>{    
//         let categoryZaxis = (window.innerWidth / 2 - e.pageX) / 25;
//         let categoryYaxis = (window.innerWidth / 2 - e.pageY) / 25;
//         if (document.querySelectorAll('.category-card')[val]) {
//             document.querySelectorAll('.category-card')[val].style.transform = `rotateY(${pxAxis*2}deg) rotateX(${pyAxis+95}deg)`
//             document.querySelectorAll('.category-card')[val].addEventListener("mousemove", categoryHandleMouseMove);
//         }
//         console.log(pxAxis,pyAxis)
// }

const categoryHandleMouseEnter=(val)=>{
    if (document.querySelectorAll('.category-card')[val]) {
        document.querySelectorAll('.category-card')[val].style.transform = `rotateY(360deg)`;        
        document.querySelectorAll('.category-title')[val].style.transform = `scale(1.2)`;       
        console.log(document.querySelectorAll('.category-title')[val])
    }
}
const categoryHandleMouseLeave=(val)=>{
    if (document.querySelectorAll('.category-card')[val]) {
        document.querySelectorAll('.category-card')[val].style.transform = `rotateY(0deg)`;
        // document.querySelectorAll('.category-title')[val].style.transform = `translateZ(0px)`;                  
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