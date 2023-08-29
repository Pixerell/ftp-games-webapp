import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {DEFAULT_GENRE, DEFAULT_PLATFORM, DEFAULT_SORT} from "./filtersSlice";

const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
const API_KEY = '43207bd04amsh63cfcd726b62687p19d5dcjsn234fc1d2f9d2';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${API_HOST}/api`,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', API_KEY);
            headers.set('X-RapidAPI-Host', API_HOST);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchGames: builder.query({
            query: (filters) => {
                const { category, platform, sort } = filters;

                if (category === DEFAULT_GENRE && platform === DEFAULT_PLATFORM && sort === DEFAULT_SORT) {
                    return { url: '/games' };
                }

                const params: { [key: string]: string } = {};

                if (sort !== DEFAULT_SORT) {
                    params['sort-by'] = sort;
                }

                if (category !== DEFAULT_GENRE) {
                    params['category'] = category;
                }

                if (platform !== DEFAULT_PLATFORM) {
                    params['platform'] = platform;
                }

                return { url: '/games', params };
            },
        }),

        fetchSpecificGame: builder.query({
            query: ({ gameId }) => {
                return { url: `/game`, params: { id: gameId } };
            }
        })

    }),
});

export const { useFetchGamesQuery } = api;