import {
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { combineReducers, Store } from 'redux'
import authReducer from './reducers/AuthSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import contactsReducer from './reducers/ContactsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
})

const store: Store = configureStore({
  reducer: rootReducer,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type ReduxState = ReturnType<typeof rootReducer>

export type TypedDispatch = ThunkDispatch<ReduxState, never, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export type RootState = ReturnType<typeof rootReducer>
export { store }
