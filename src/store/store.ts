import {configureStore} from '@reduxjs/toolkit';
import {combineReducers, Store} from 'redux'
import authReducer from './reducers/AuthSlice'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import contactsReducer from "./reducers/ContactsSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactsReducer
})

const store: Store = configureStore({
    reducer: rootReducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export {store}