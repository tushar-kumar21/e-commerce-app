import { categoriesData } from "@/data"
export const Categories = () => {
    return (
        <div className="categories-container">
            <h2>Shop Our Top Categories</h2>
            <div className="cards">
                {
                    categoriesData &&
                    categoriesData.map((data, ind) => {
                        return (
                            <div className="category-cards" key={ind}>
                                <img src={data.img} alt="" />
                                <span>{data.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}