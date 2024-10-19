import { 
        getBlurred, 
        getMenu,
        getShipping,
        getPage  
    } from "./util"

import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    getBlurred,
    getMenu,
    getShipping,
    getPage
})