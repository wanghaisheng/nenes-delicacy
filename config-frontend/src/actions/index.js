
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

export { 
        Blur,
        Menu,
        shipping,
    }