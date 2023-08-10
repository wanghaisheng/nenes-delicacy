
const Blur= () => {

    return {
        type: 'BLUR',
    }
}

const cartLength = (length) => {
    return {
        type: "LENGTH",
        payload: length
    }
}
export { Blur, cartLength}