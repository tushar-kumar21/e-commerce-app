import Image from "next/image"
import { offData } from "@/data"
export const Offs = () => {
    return (
        <div className="offs-container">
            <h2>Get Up To 70% Off</h2>
            <div className="off-deals">
            {
                offData &&
                offData.map((data, ind) => {
                    return (
                            <div className="off-deals-cards">
                                <div className="off-content" style={{backgroundColor:`${data.bgcolor}`}}>
                                    <h3>Save</h3>
                                    <div className="off-price">
                                        <span
                                            style={{ color: `${data.color}` }}>$</span>
                                        <span
                                            style={{ color: `${data.color}` }}>{data.price}</span>
                                    </div>
                                    <span>{data.desc}</span>
                                </div>
                                <Image src={data.img} alt="sdasd" height={100} width={100} />
                            </div>
                    )
                })
            }
            </div>
        </div>
    )
}