
//STYLES

const styles={
    coverContainer:'max-w-full h-[600px] flex justify-start items-center cover-bg',
    content:'w-1/2 flex flex-col gap-8 py-0 px-10',
    btn:'text-white bg-main border-[1.5px] border-transparent border-solid text-lg mt-2 w-fit tracking-wide px-8 py-3 rounded-[2rem] cursor-pointer transition duration-500 hover:bg-transparent hover:text-main hover:border-main'
}

export const Cover = () => {
    return (
        <div className={styles.coverContainer}>
            <div className={styles.content}>
                <h1 className="text-4xl text-main m-0">Shopping And
                    Department Store.</h1>
                <span className="text-xl text-main">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                </span>
                <button className={styles.btn}>Learn More</button>
            </div>
        </div>
    )
}