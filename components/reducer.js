export const ActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CART_SIZE: 'SET_CART_SIZE',
    SET_PRODUCTS_DATA: 'SET_PRODUCTS_DATA',
    SET_ITEM_QUANTITY: 'SET_ITEM_QUANTITY',
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
    SET_TOTAL_DISCOUNT: 'SET_TOTAL_DISCOUNT',   
    SET_SAVEFORLATER_PRODUCTS_DATA:'SET_SAVEFORLATER_PRODUCTS_DATA'
};

export const reducer = (state, action) => {
    const {
        SET_CURRENT_USER,
        SET_CART_SIZE,
        SET_ITEM_QUANTITY,
        SET_PRODUCTS_DATA,
        SET_TOTAL_PRICE,
        SET_TOTAL_DISCOUNT,        
        SET_SAVEFORLATER_PRODUCTS_DATA
    } = ActionTypes;

    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.payload }

        case SET_CART_SIZE:
            return { ...state, cartSize: action.payload }

        case SET_PRODUCTS_DATA:
            return { ...state, productsData: action.payload }

        case SET_ITEM_QUANTITY:
            const { id, quantity } = action.payload;
            return {
                ...state, productsData: state.productsData.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            }

        case SET_TOTAL_PRICE:
            return { ...state, totalPrice: action.payload }

        case SET_TOTAL_DISCOUNT:
            return { ...state, totalDiscount: action.payload }
       
        case SET_SAVEFORLATER_PRODUCTS_DATA:
            return{ ...state, saveForLater:action.payload }    

        default: throw new Error();
    }
}

export const initialStates = {
    currentUser:"",
    cartSize: 0,
    productsData: "",
    totalPrice: "",
    totalDiscount: 0,
    totalPrice: 0,
    saveForLater:"",
}