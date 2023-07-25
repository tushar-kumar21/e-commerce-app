//STYLES

const styles={
    banner:"max-w-full h-[600px] relative flex justify-end mt-28 md:h-[500px]",
    bannerImg:"w-full h-full absolute object-cover  ",
    cashBackDetails:"max-w-[500px] relative z-10 py-16 px-12 bg-main mx-10 my-auto md:w-fit md:h-fit md:mx-4 md:py-10",
    btn:'text-white bg-main border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 my-5 mb-0 border-white hover:bg-white hover:text-main hover:border-white',
    h4:"text-white tracking-wide font-medium text-[1.2rem] mt-2 mb-4 md:text-base",
}

export const CashBack=()=>{

    return(
        <div className={styles.banner}>
            <img src="https://images.pexels.com/photos/6312016/pexels-photo-6312016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className={styles.bannerImg} />
            <div className={styles.cashBackDetails}>
                <h1 className="text-white text-5xl m-0 mb-4 font-semibold tracking-wide leading-[3.5rem] md:text-3xl">Get 5% Cash Back On $200</h1>
                <h4 className={styles.h4}>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</h4>
                <button className={styles.btn}>Learn More</button>
            </div>
        </div>
    )
}