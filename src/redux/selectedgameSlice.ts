import { createSlice } from '@reduxjs/toolkit';

const selectedGameSlice = createSlice({
    name: 'selectedGame',
    initialState: null,
    reducers: {
        setSelectedGame: (state, action) => {
            // Handle fetching and setting selected game details
            return action.payload;
        },
    },
});

export const { setSelectedGame } = selectedGameSlice.actions;
export default selectedGameSlice.reducer;