import { getBlurred, cartLength } from "./util"
import { combineReducers } from 'redux';

export const allReducers = combineReducers({
    getBlurred,
    cartLength
})