import { 
        getBlurred, 
        getOrderDetails, 
        getRouteProtection, 
        getPayment,
        getMenu,
        getShipping
        
    } from "./util"

import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    getBlurred,
    getOrderDetails,
    getRouteProtection,
    getPayment,
    getMenu,
    getShipping
})