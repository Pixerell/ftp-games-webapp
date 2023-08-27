import {configureStore } from '@reduxjs/toolkit';
import  {api} from "./api";
import {filtersReducer, platformsReducer, sortersReducer} from './filtersSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filters: filtersReducer,
        platforms: platformsReducer,
        sorters: sortersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
