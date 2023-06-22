import { brandsData } from "@/data"
export const Brands = () => {
    return (
        <div className="brands">            
        <h2>Choose By Brand</h2>
        <div className="brands-container">
            {
                brandsData.map((data,ind) => {
                    return (
                        <div className="brand" key={ind}>
                            <img src={data.img} alt="" />
                            <div>
                                <span>{data.brands}</span>
                                <span>Delivery with in 24 hours</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
            </div>
    )
}