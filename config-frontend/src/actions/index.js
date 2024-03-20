
const Blur = () => {
    return {
        type: 'BLUR',
    }
}


const Details = () => {
    return {
        type: "DETAILS",
    }
}


const Menu = () => {
    return {
        type: "MENU"
    }
}


const Reset = () => {
    return {
        type: "RESET",
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


const routeProtection = (price) => {
    return {
        type: "ROUTE",
        payload: price
    }
}


const payment = (paymentPrice) => {
    return {
        type: "PAYMENT",
        payload: paymentPrice
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
        Details, 
        routeProtection, 
        Reset, 
        payment, 
        cartReset,
        menuReset,
        Menu,
        shipping
    }