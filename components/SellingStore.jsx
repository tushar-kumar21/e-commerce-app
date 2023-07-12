import { sellingStoreData } from "@/data";
import Image from "next/image";

export const SellingStore = () => {
    return (
        <div className="max-w-full py-0 px-4 pt-16">
            <h2 className="text-3xl pb-4">Best Selling Store</h2>
            <div className="flex justify-center flex-wrap gap-6">
                {
                    sellingStoreData &&
                    sellingStoreData.map((data, ind) => {
                        return (
                            <div className="relative basis-72">
                                <img 
                                    className="w-full rounded-xl"
                                    src={data.img}
                                    alt=""
                                />
                                <img
                                    className="absolute bottom-20 left-5"
                                    src={data.brand}
                                    alt=""
                                />                                
                                <div className="mt-10 flex flex-col gap-2">
                                    <span className="text-xl tracking-wide font-semibold">{data.name}</span>
                                    <div className="flex gap-1">
                                        <span className="text-xs text-[#808080] font-medium tracking-wide">{data.item}</span>
                                        <span className="font-black">~</span>
                                        <span className="text-xs text-[#808080] font-medium tracking-wide">{data.secItem}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Image
                                            src={`/assets/tag.svg`}
                                            height={17}
                                            width={17}
                                            alt="sdasda"
                                            className="w-4 h-4"
                                        />
                                        <span className="text-[#d1008f]  text-xs font-normal">Delivery with in 24 hours</span>
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