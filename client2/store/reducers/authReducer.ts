import {InferActionsType, RootState} from "../index";
import {ThunkAction} from "redux-thunk";
import {authApi} from "../../api/authApi";
import {IUserDetail} from "../../types/user";

const initialState = {
    user: {
        name: null as string | null,
        id: null as string | null
    },
    isAuth: false,
    isLoading: false,
}


const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case AuthActionsEnum.SET_USER:
            return {...state, user: action.payload }
        case AuthActionsEnum.CLEAR_USER:
            return {...state, user: {} as IUserDetail}
        case AuthActionsEnum.SET_IS_AUTH:
            return {...state, isAuth: action.payload}
        case AuthActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}

export const authActions = {
    setUser: (payload: IUserDetail) => ({
        type: AuthActionsEnum.SET_USER,
        payload
    } as const),
    clearUser: () => ({
        type: AuthActionsEnum.CLEAR_USER
    } as const),
    setIsAuth: (payload: boolean) => ({
        type: AuthActionsEnum.SET_IS_AUTH,
        payload
    } as const),
    setIsLoading: (payload: boolean) => ({
        type: AuthActionsEnum.SET_IS_LOADING,
        payload
    } as const),
}


export const login = (email: string, password: string): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try {
            const user = await authApi.login(email, password)
            dispatch(authActions.setUser(user))
            dispatch(authActions.setIsAuth(true))
        }
        catch (e) {
            console.log(e, "Произошла ошибка при авторизации")
        }
    }

export const logout = (user: IUserDetail): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try {
            await authApi.logout(user)
            dispatch(authActions.clearUser())
            dispatch(authActions.setIsAuth(false))
        }
        catch (e) {
            console.log(e, "Произошла ошибка при выходе из профиля")
        }
    }

export const me = (): ThunkAction<void, RootState, unknown, AuthActionsType> =>
    async (dispatch) => {
        try {
            dispatch(authActions.setIsLoading(true))
            const user = await authApi.me()
            console.table(user)
            if (user?.name) {
                dispatch(authActions.setUser(user))
                dispatch(authActions.setIsAuth(true))
            }
        }
        catch (e) {
            console.log(e, "Произошла ошибка при авторизации")
        }
        finally {
            dispatch(authActions.setIsLoading(false))
        }
    }


export default authReducer;

export type AuthStateType = typeof initialState

enum AuthActionsEnum {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER',
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

export type AuthActionsType = InferActionsType<typeof authActions>