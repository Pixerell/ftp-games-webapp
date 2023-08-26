import { createSlice } from '@reduxjs/toolkit'

const gamesSlice = createSlice({
    name: 'games',
    initialState: [],
    reducers: {
        setGames: (state, action) => {
            // Handle fetching and setting games from the API
            return action.payload;
        },
    },
});

export const { setGames } = gamesSlice.actions;
export default gamesSlice.reducer;