
//STYLES

const styles = {
    servicesContainer: "max-w-full py-0 px-8 pt-16",
    servicesCards: "rounded-lg overflow-hidden flex-[1_1_380px] h-[450px] flex flex-col justify-between hover:scale-[1.03] group cursor-pointer transition-all duration-300",
    h2: "m-0 mb-4 text-2xl font-semibold tracking-wide",
    servicesCardsDetails: "p-8 h-full bg-[#f5f6f6]",
    span: "tracking-wide font-medium"

}

export const Service = () => {
    return (
        <div className={styles.servicesContainer} id="delivery">
            <h2 className="text-3xl sm:text-2xl">Services To Help You Shop</h2>
            <div className="flex gap-4 pt-4 flex-wrap shrink grow">
                <div className={styles.servicesCards}>
                    <div className={styles.servicesCardsDetails}>
                        <h2 className={styles.h2}>Frequently Asked Questions</h2>
                        <span className={styles.span}>Updates on safe Shopping in our Stores</span>
                    </div>

                    <img
                        src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55b939fea169c0292_faq-min.png"
                        alt=""
                        className="w-full transition-all duration-300 group-hover:scale-105"
                    />

                </div>
                <div className={styles.servicesCards}>
                    <div className={styles.servicesCardsDetails}>
                        <h2 className={styles.h2}>Online Payment Process</h2>
                        <span className={styles.span}>Updates on safe Shopping in our Stores</span>
                    </div>

                    <img
                        src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6707380718425e697_onlie%20payment-min.png"
                        alt=""
                        className="w-full transition-all duration-300 group-hover:scale-105"
                    />

                </div>
                <div className={styles.servicesCards}>
                    <div className={styles.servicesCardsDetails}>
                        <h2 className={styles.h2}>Home Delivery Options</h2>
                        <span className={styles.span}>Updates on safe Shopping in our Stores</span>
                    </div>

                    <img
                        src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e544663ba3d0fd2bb8_home%20delivery-min.png"
                        alt=""
                        className="w-full transition-all duration-300 group-hover:scale-105"
                    />
                    
                </div>
            </div>
        </div>
    )
}