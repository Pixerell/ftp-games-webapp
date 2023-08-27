import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
                const { category, platform } = filters;
                console.log(category, platform)
                if (category === 'All Genres' && platform === 'All Platforms') {
                    return { url: '/games' };
                } else if (category === 'All Genres') {
                    return { url: '/games', params: { platform } };
                } else if (platform === 'All Platforms') {
                    return { url: '/games', params: { category } };
                }
                console.log("got to the end")
                return { url: '/games', params: { category, platform } };
            },
        }),
    }),
});

export const { useFetchGamesQuery } = api;