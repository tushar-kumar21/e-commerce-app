import Image from "next/image"
import { offData } from "@/data"

//STYLES

const styles = {
    offDealCards: "rounded-lg w-[280px] h-[400px] flex flex-col justify-between bg-[#f2e4d9] overflow-hidden cursor-pointer hover:scale-105 transiition-all duration-300 group ",
    img:"w-full h-[48%] group-hover:scale-110 transition-all duration-300",
    offContent: "p-8 h-full flex flex-col justify-between"

}

export const Offs = () => {
    return (
        <div className="max-w-full py-0 px-8 pt-16">
            <h2 className="text-3xl py-5">Get Up To 70% Off</h2>
            <div className="max-w-full flex justify-between">
                {
                    offData &&
                    offData.map((data, ind) => {
                        return (
                            <div className={styles.offDealCards}>
                                <div className={styles.offContent} style={{ backgroundColor: `${data.bgcolor}` }}>
                                    <h3 className="text-2xl m-0 ">Save</h3>
                                    <div className="off-price">
                                        <span className="text-3xl"
                                            style={{ color: `${data.color}` }}>$</span>
                                        <span className="text-5xl"
                                            style={{ color: `${data.color}` }}>{data.price}</span>
                                    </div>
                                    <span className="tracking-wide leading-6 mt-2">{data.desc}</span>
                                </div>
                                <Image
                                    src={data.img}
                                    alt="sdasd"
                                    height={100}
                                    width={100}
                                    className={styles.img}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}