import { createContext, useContext, useState } from "react";
const Context = createContext(null);
export const useMyContext = () => useContext(Context);
export const ContextProvider=({children})=>{



    return(
   <Context.Provider value={{ }}>
    {children}
   </Context.Provider>
    )
}

