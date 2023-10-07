
const getBlurred = (state = false, action) => {

    switch(action.type) {
        case "BLUR":
            return !state
        default: 
            return state
    }
}

const getOrderDetails = (state = false, action) =>{
    switch(action.type) {
        case "DETAILS":
            return !state
        default: 
            return state
    }
}

export { getBlurred, getOrderDetails }