//action to fetch API based on payload parameter

import axios from 'axios'

const getProducts = (parameter) => async dispatch => {
    
    const response = await axios.get(`http://127.0.0.1:8000/api/products/?type=${parameter}`)
    
    dispatch ({
        type: 'FETCH',
        payload: response.data
    })

}

export { getProducts }