import {configureStore } from '@reduxjs/toolkit';
import  {api} from "./api";
import filtersReducer from './filtersSlice';
import paginationReducer from './paginationSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filters: filtersReducer,
        pagination: paginationReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
