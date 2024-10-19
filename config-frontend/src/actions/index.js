
const Blur = () => {
    return {
        type: 'BLUR',
    }
}


const Menu = () => {
    return {
        type: "MENU"
    }
}


const shipping = (shippingInfo) => {
    return {
        type: "SHIPPING",
        payload: shippingInfo
    }
}

const page = (page) => {
    return {
        type: "PAGE",
        payload: page
    }
}

export { 
        Blur,
        Menu,
        shipping,
        page
    }