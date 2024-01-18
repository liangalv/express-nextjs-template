import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import { userApi } from './services/userService';
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';


export const store  = configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;