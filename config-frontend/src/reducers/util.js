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
    getShipping,
}
