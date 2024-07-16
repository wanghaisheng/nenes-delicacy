import { 
        getBlurred, 
        getMenu,
        getShipping,  
    } from "./util"

import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    getBlurred,
    getMenu,
    getShipping
})