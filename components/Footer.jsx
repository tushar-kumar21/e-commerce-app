import { aboutusData, departmentData, helpData, payLogo, sectionData, servicesData } from "@/data";
import Image from "next/image";

//STYLES

const styles = {
    footerContainer: "max-w-full flex justify-center flex-wrap gap-4 py-0 px-9 mt-24",
    sections: "border-t-[1px] border-[#0000004d] flex flex-col gap-2 flex-grow flex-shrink basis-[fit-content] pt-12 pb-8",
    logoName: "text-main text-[1.6rem] tracking-wide font-bold",
    lastFooter: "w-full flex border-t-[1px] border-[#00000059] justify-between py-10 px-0 hidden",
    options: "flex justify-between flex-wrap w-64 gap-2",
}

export const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.sections}>
                <div className="flex items-center">
                    <Image src={`/assets/shopexpress.jpg`} height={70} width={70} alt="dasd" />
                    <h2 className={styles.logoName}>ShopExpress</h2>
                </div>
                <p className="text-[#5e5e5e] text-sm">ShopExpress is an ecommerce platform that provides a <br />seamless and efficient shopping experience to customers. <br />With its user-friendly interface and advanced features.</p>
                <div>
                    <h3 className="m-0 mb-6">Accepted Payments</h3>
                    <div className={styles.options}>
                        {payLogo && payLogo.map((img, ind) => {
                            return (
                                <img src={img} alt="dsmfbknds" className="border border-[#808080] p-2 rounded-lg" />
                            )
                        })}
                    </div>
                </div>
            </div>
            {sectionData && sectionData.map((data, ind) => {
                return (

                    <div className={styles.sections} key={ind}>
                        <h3 className="m-0 mb-6">{data}</h3>
                        {
                            departmentData &&
                            departmentData.map((data, ind) => {
                                return (
                                    <span className="text-[#5e5e5e] text-sm font-normal" key={ind}>{data}</span>
                                )
                            })
                        }
                    </div>
                )
            })}
            <div className={styles.lastFooter}>
                <div className="flex items-center gap-2">
                    <Image
                        src={`/assets/bag.svg`}
                        height={20}
                        width={20}
                    />
                    <span>Become Seller</span>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src={`/assets/gift.svg`}
                        height={25}
                        width={25}
                    />
                    <span>Gift Cards</span>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src={`/assets/question.svg`}
                        height={25}
                        width={25}
                    />
                    <span>Help Center</span>
                </div>

                <span className="text-sm">Terms of Service</span>
                <span className="text-sm">Privacy & Policy</span>
                <span className="text-sm">All Right reserved by Shopexpress | 2023</span>
            </div>
        </div>
    )
}