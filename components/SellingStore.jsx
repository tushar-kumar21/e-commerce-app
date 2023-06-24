import { sellingStoreData } from "@/data"
import Image from "next/image"
export const SellingStore = () => {
    return (
        <div className="selling-store-container">
            <h2>Best Selling Store</h2>

            <div className="selling-cards">
                {
                    sellingStoreData &&
                    sellingStoreData.map((data, ind) => {
                        return (
                            <div className="selling-card">
                                <img
                                    src={data.img}
                                    alt=""
                                />
                                <img
                                    src={data.brand}
                                    alt=""
                                />
                                <div className="selling-card-details">
                                    <span>{data.name}</span>
                                    <div>
                                        <span>{data.item}</span>
                                        <span>~</span>
                                        <span>{data.secItem}</span>
                                    </div>
                                    <div>
                                        <Image
                                            src={`/assets/tag.svg`}
                                            height={17}
                                            width={17}
                                            alt="sdasda"
                                        />
                                        <span>Delivery with in 24 hours</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}