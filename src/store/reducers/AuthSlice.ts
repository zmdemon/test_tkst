import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import Cookies from 'js-cookie'
import {RootState} from "../store";
import {instance, pathname} from "./ActionCreators";

type AuthState = {
    login: string
    password: string
    loading: boolean
    loggedIn: boolean
}

const initialState: AuthState = {
    login: '',
    password: '',
    loading: false,
    loggedIn: false
}

export const getAuthentication = createAsyncThunk('get/auth',
    async (_, {getState, rejectWithValue}) => {
        const {auth} = getState() as RootState
        const {login, password} = auth
        try {
            const response: AxiosResponse = await instance.post(pathname + 'api/auth',
                {username: login, password}
            )
            return response.data
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message)
            }
        }
    }
)

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        logOut(state) {
            state.loggedIn = false
        },
        logIn(state) {
            state.loggedIn = true
        },
        setLogin(state, action) {
            state.login = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
    },
    extraReducers: {
        [getAuthentication.fulfilled.type]: (state, action) => {
            const {access} = action.payload
            Cookies.set('access', access)
            state.loading = false
            state.loggedIn = true
        },
        [getAuthentication.pending.type]: (state) => {
            state.loading = true
        },
        [getAuthentication.rejected.type]: (state) => {
            state.password = ""
            state.loading = false
        }
    }
});

export const {setLogin, setPassword, logOut, logIn} = authSlice.actions

export default authSlice.reducer;
