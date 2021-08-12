import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cityReducer } from "./cityReducer";
import { itineraryReducer } from "./itineraryReducer";

export const rootReducer = combineReducers({ authReducer, cityReducer, itineraryReducer })