import { aboutusData, departmentData, helpData, payLogo,servicesData } from "@/data";
import Image from "next/image";

//STYLES

const styles = {
    footerContainer: "max-w-full flex justify-center flex-wrap gap-4 py-0 px-9 mt-24",
    sections: "border-t-[1px] border-[#0000004d] flex flex-col gap-2 flex-grow flex-shrink basis-[fit-content] pt-12 pb-8 sm:pt-6",
    logoName: "text-main text-[1.6rem] tracking-wide font-bold",
    lastFooter: "w-full flex border-t-[1px] border-[#00000059] justify-between py-10 px-0 flex-wrap",
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
                                <img src={img} key={ind} alt="dsmfbknds" className="border border-[#808080] p-2 rounded-lg" />
                            )
                        })}
                    </div>
                </div>
            </div>       

                    <div className={styles.sections}>
                        <h3 className="m-0 mb-6 sm:mb-4">Department</h3>
                        {
                            departmentData &&
                            departmentData.map((data, ind) => {
                                return (
                                    <span className="text-[#5e5e5e] text-sm font-normal" key={ind}>{data}</span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.sections}>
                        <h3 className="m-0 mb-6 sm:mb-4">About Us</h3>
                        {
                            aboutusData &&
                            aboutusData.map((data, ind) => {
                                return (
                                    <span className="text-[#5e5e5e] text-sm font-normal" key={ind}>{data}</span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.sections} >
                        <h3 className="m-0 mb-6 sm:mb-4">Services</h3>
                        {
                            servicesData &&
                            servicesData.map((data, ind) => {
                                return (
                                    <span className="text-[#5e5e5e] text-sm font-normal" key={ind}>{data}</span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.sections}>
                        <h3 className="m-0 mb-6 sm:mb-4">Help</h3>
                        {
                            helpData &&
                            helpData.map((data, ind) => {
                                return (
                                    <span className="text-[#5e5e5e] text-sm font-normal" key={ind}>{data}</span>
                                )
                            })
                        }
                    </div>
               
            <div className={styles.lastFooter}>
                <div className="flex items-center gap-2">
                    <img
                        src={`/assets/bag.svg`}
                        height={20}
                        width={20}
                    />
                    <span className="sm:leading-10">Become Seller</span>
                </div>

                <div className="flex items-center gap-2">
                    <img
                        src={`/assets/gift.svg`}
                        height={25}
                        width={25}
                    />
                    <span className="sm:leading-10">Gift Cards</span>
                </div>

                <div className="flex items-center gap-2">
                    <img
                        src={`/assets/question.svg`}
                        height={25}
                        width={25}
                    />
                    <span className="sm:leading-10">Help Center</span>
                </div>
                <aside className="sm:flex sm:flex-wrap sm:gap-2">
                <span className="text-sm">Terms of Service</span>
                <span className="text-sm">Privacy & Policy</span>
                <span className="text-sm">All Right reserved by Shopexpress | 2023</span>
                </aside>
            </div>
        </div>
    )
}