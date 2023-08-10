const getBlurred = (state = false, action) => {

    switch(action.type) {
        case "BLUR":
            return !state
        default: 
            return state
    }
}

const cartLength = (state = 0, action) =>{
    switch(action.type) {
        case "LENGTH":
            return action.payload
        default: 
            return state
    }
}

export { getBlurred, cartLength }