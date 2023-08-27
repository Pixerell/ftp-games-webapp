import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        genre: 'All Genres'
    },
    reducers: {
        setGenreFilter: (state, action) => {
            state.genre = action.payload;
            console.log("genre set - " + state.genre)
        }
    }
});

const platformsSlice = createSlice({
    name: 'platforms',
    initialState: {
        platform: 'All Platforms'
    },
    reducers: {
        setPlatformFilter: (state, action) => {
            state.platform = action.payload;
            console.log("platform set - " + state.platform)
        }
    }
});

const sortersSlice = createSlice({
    name: 'sorters',
    initialState: {
        sort: 'Relevance'
    },
    reducers: {
        setSortOption: (state, action) => {
            state.sort = action.payload;
            console.log("Sort - " + state.sort)
        }
    }
});



export const { setGenreFilter } = filtersSlice.actions;
export const { setPlatformFilter } = platformsSlice.actions;
export const { setSortOption } = sortersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
export const platformsReducer = platformsSlice.reducer;
export const sortersReducer = sortersSlice.reducer;

