import { getBlurred, getOrderDetails } from "./util"
import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    getBlurred,
    getOrderDetails
})