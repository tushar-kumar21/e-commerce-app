import { createContext, useContext, useState } from "react";
const Context = createContext(null);
export const useMyContext = () => useContext(Context);
export const ContextProvider=({children})=>{

    const handleMouseMove = (e, val) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
        if (document.querySelectorAll('.card')[val]) {
            document.querySelectorAll('.card')[val].style.transform = `rotateY(${xAxis*2}deg) rotateX(${yAxis+30}deg)`
            document.querySelectorAll('.card')[val].addEventListener("mousemove", handleMouseMove);
        }
        console.log(xAxis,yAxis)
    };

    const handleMouseLeave = (val) => { 
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.likeimg');
        let details = document.querySelectorAll('.product-details');
        if (card) {
            card[val].style.transform = `rotateY(0deg) rotateX(0deg)`
            card[val].style.transition = "all .5s ease";
            card[val].style.transform = "translateZ(0px)";
            title[val].style.transform = "translateZ(0px)";
            details[val].style.transform="none";            
            cbtn[val].style.transform="translateY(0px)";
            like[val].style.transform = "translateZ(0px)";
            img[val].style.transform = "translateZ(0px) scale(1)";
            card[val].style.boxShadow = "none";
        }
    };

    const handleMouseEnter = (val) => {
        let card = document.querySelectorAll('.card');
        let like = document.querySelectorAll('.like');
        let title = document.querySelectorAll('.title');
        let cbtn = document.querySelectorAll('.cbtn');
        let img = document.querySelectorAll('.likeimg');
        let details = document.querySelectorAll('.product-details');
        if (card) {
            card[val].style.transition = "none";
            card[val].style.transform = "translateZ(100px)";
            like[val].style.transform = "translateZ(150px)";
            title[val].style.transform = "translateZ(130px)";
            cbtn[val].style.transform="translateY(70px)";
            details[val].style.transform="translateZ(130px)";            
            img[val].style.transform = "translateZ(100px) scale(.8)";
            card[val].style.boxShadow = "0px 0px 10px grey";
        }
    };    

    return(
   <Context.Provider value={{ handleMouseEnter, handleMouseLeave, handleMouseMove }}>
    {children}
   </Context.Provider>
    )
}

