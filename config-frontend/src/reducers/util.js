import { placeHolder } from "../utils";
const initialState = true;

const getBlurred = (state = false, action) => {
    switch(action.type) {
        case "BLUR":
            return !state
        case "CART-RESET":
            return false
        default: 
            return state
    }
}


const getMenu = (state = false, action) => {
    switch(action.type) {
        case "MENU":
            return !state
        case "MENU-RESET":
            return false
        default: 
            return state
    }
}


const getOrderDetails = (state = initialState, action) =>{
    switch(action.type) {
        case "DETAILS":
            return !state
        case "RESET":
            return initialState
        default: 
            return state
    }
}

const getRouteProtection = (state = "", action) => {
    switch(action.type) {
        case "ROUTE":
            return action.payload
        default:
            return state
    }
}
 
const getPayment = (state = 0, action) => {
    switch(action.type) {
        case "PAYMENT":
            return action.payload
        default:
            return state
    }
}


const getShipping = (state = placeHolder, action) => {
    switch(action.type) {
        case "SHIPPING":
            return action.payload
        default:
            return state
    }
}


export { 
    getBlurred, 
    getMenu,
    getOrderDetails, 
    getRouteProtection, 
    getPayment,
    getShipping
}
