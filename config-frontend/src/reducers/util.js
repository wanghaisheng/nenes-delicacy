import { placeHolder } from "../utils";

const getBlurred = (state = false, action) => {
    switch(action.type) {
        case "BLUR":
            return !state
        case "MENU":
            return false
        default: 
            return state
    }
}


const getMenu = (state = false, action) => {
    switch(action.type) {
        case "MENU":
            return !state
        case "BLUR":
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

const getPage = (state = 1, action) => {
    switch(action.type) {
        case "PAGE":
            return action.payload
        default:
            return state
    }
}

export { 
    getBlurred, 
    getMenu,
    getShipping,
    getPage
}
