import { categoriesData } from "@/data"

//STYLES

const styles = {
    categoriesContainer: 'max-w-full py-0 px-8 pt-16',
    cards: 'max-w-full flex justify-between pt-5',
    categoryCards: 'w-[180px] rounded-xl h-[210px] text-center pt-[1em] relative overflow-hidden',
    cardImg: 'w-full min-h-full object-cover z-[-1] absolute top-0 left-0',
    cardTitle: 'text-2xl text-semibold text-white z-10'
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
                                key={ind}>
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