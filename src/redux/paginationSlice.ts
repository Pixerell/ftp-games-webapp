import {createSlice} from '@reduxjs/toolkit';

export const DEFAULT_GAMES_NUMBER = 20;

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        currentPage: 1,
        gamesPerPage: DEFAULT_GAMES_NUMBER,
    },
    reducers: {
        setGamesPerPage: (state, action) => {
            state.gamesPerPage = action.payload;
        },
    },
});

export const {setGamesPerPage} = paginationSlice.actions;
export default paginationSlice.reducer;