import { aboutusData, departmentData, helpData, servicesData } from "@/data";
import Image from "next/image";
export const Footer = () => {
    return (
        <div className="footer-container">
            <div className="sections">
                <div className="logo-name">
                    <Image src={`/assets/shopexpress.jpg`} height={70} width={70} alt="dasd" />
                    <h2>ShopExpress</h2>
                </div>
                <p>ShopExpress is an ecommerce platform that provides a <br/>seamless and efficient shopping experience to customers. <br/>With its user-friendly interface and advanced features.</p>
                <div className="payment-options">
                    <h3>Accepted Payments</h3>
                    <div className="options">
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce8816711ebecac46d8_stripe.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e48b497e6ce846b7ff_Amazon.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1f054e419e42aca4a9a2_Klarna.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e4707380264b25e680_ApplePay.png" alt="dasd" />
                        <img src="https://res.cloudinary.com/demo/image/fetch/https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1f55dc68c5ee83d0cbf8_GooglePay.png" alt="dasd" />
                    </div>
                </div>
            </div>
            <div className="sections">
                <h3>Department</h3>
                {
                    departmentData &&
                    departmentData.map((data, ind)=>{
                        return(
                            <span key={ind}>{data}</span>
                        )
                    })
                }
            </div>
            <div className="sections">
                <h3>About Us</h3>
                {
                    aboutusData && 
                    aboutusData.map((data, ind)=>{
                        return(
                            <span key={ind}>{data}</span>
                        )
                    })
                }
            </div>
            <div className="sections">
                <h3>Services</h3>
                {
                    servicesData && 
                    servicesData.map((data, ind)=>{
                        return(
                            <span key={ind}>{data}</span>
                        )
                    })
                }
            </div>
            <div className="sections">
                <h3>Help</h3>
                {
                    helpData && 
                    helpData.map((data, ind)=>{
                        return(
                            <span key={ind}>{data}</span>
                        )
                    })
                }
            </div>
            <div className="last-footer">
                <div className="footer-items"><Image src={`/assets/bag.svg`} height={20} width={20}/><span>Become Seller</span></div>
                <div className="footer-items"><Image src={`/assets/gift.svg`} height={25} width={25}/><span>Gift Cards</span></div>
                <div className="footer-items"><Image src={`/assets/question.svg`} height={25} width={25}/><span>Help Center</span></div>
                <span>Terms of Service</span>
                <span>Privacy & Policy</span>
                <span>All Right reserved by Shopexpress | 2023</span>
            </div>
        </div>
    )
}