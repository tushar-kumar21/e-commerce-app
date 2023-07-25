import { brandsData } from "@/data"

//STYLES1

const styles = {
    brandsCards: "border border-[#f5f6f6] flex w-fit gap-5 py-4 px-5 rounded-xl bg-[#f5f6f6] hover:scale-110 transition-all hover:shadow-[0px_0px_5px_lightgray] cursor-pointer grow shrink basis-[fit-content]",
}

export const Brands = () => {
    return (
        <div className="max-w-full py-0 px-8 pt-16">
            <h2 className="text-3xl py-5 sm:text-2xl">Choose By Brand</h2>
            <div className="flex flex-wrap justify-between gap-4">
                {
                    brandsData.map((data, ind) => {
                        return (
                            <div className={styles.brandsCards} key={ind}>
                                <img src={data.img} alt="" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-[1.1rem] font-semibold tracking-wide ">{data.brands}</span>
                                    <span className="text-[.8rem]">Delivery with in 24 hours</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}