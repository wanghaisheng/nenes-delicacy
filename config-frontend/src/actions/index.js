
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

const cartReset = () => {
    return {
        type: "CART-RESET",
    }
}


const menuReset = () => {
    return {
        type: "MENU-RESET",
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
        cartReset,
        menuReset,
        Menu,
        shipping,
    }