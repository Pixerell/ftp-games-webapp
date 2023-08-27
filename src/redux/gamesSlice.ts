import {createSlice} from '@reduxjs/toolkit'


const gameSlice = createSlice({
    name: 'game',
    initialState: {
        loading: false,
        games: [],
        error: '',
    },
    reducers: {
        fetchGamesRequest: (state) => {
            state.loading = true;
        },
        fetchGamesSuccess: (state, action) => {
            state.loading = false;
            state.games = action.payload;
            state.error = '';
        },
        fetchGamesFailure: (state, action) => {
            state.loading = false;
            state.games = [];
            state.error = action.payload;
        },
    },
});



export default gameSlice.reducer;