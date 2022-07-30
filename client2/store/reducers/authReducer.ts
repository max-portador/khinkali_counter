import {InferActionsType, RootState} from "../index";
import {ThunkAction} from "redux-thunk";
import {authApi} from "../../api/authApi";

const initialState = {
    name: null as string | null,
    isAuth: false,
}

const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case AuthActionsEnum.SET_USER:
            return {...state, name: action.payload, isAuth: true}
        case AuthActionsEnum.CLEAR_USER:
            return {...state, name: null, isAuth: false}
        default:
            return state
    }
}

export const authActions = {
    setUser: (payload: string) => ({
        type: AuthActionsEnum.SET_USER,
        payload
    } as const),
    clearUser: () => ({
        type: AuthActionsEnum.CLEAR_USER
    } as const)
}


export const login = (email: string, password: string): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try {
            const name = await authApi.login(email, password)
            dispatch(authActions.setUser(name))
        }
        catch (e) {
            console.log(e, "Произошла ошибка при авторизации")
        }
    }

export const logout = (): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try {
            localStorage.removeItem('token');
            dispatch(authActions.clearUser())
        }
        catch (e) {
            console.log(e, "Произошла ошибка при выходе из профиля")
        }
    }

export const auth = (): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try{
            const name = await authApi.auth();
            if (name) {
                dispatch(authActions.setUser(name))
            }
        }
        catch (e) {
            console.log(e, "неавторизован")
        }
    }


export default authReducer;

export type AuthStateType = typeof initialState

enum AuthActionsEnum {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER'
}

export type AuthActionsType = InferActionsType<typeof authActions>