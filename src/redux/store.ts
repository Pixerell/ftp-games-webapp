import {configureStore } from '@reduxjs/toolkit';
import  {api} from "./api";
import filtersReducer from './filtersSlice';
import paginationReducer from './paginationSlice';
import savedgamesReducer from './savedgamesSlice'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filters: filtersReducer,
        pagination: paginationReducer,
        savedGames: savedgamesReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = {
    filters: ReturnType<typeof filtersReducer>;
    pagination: ReturnType<typeof paginationReducer>,
    savedGames: ReturnType<typeof savedgamesReducer>
    // ...other reducers
};

