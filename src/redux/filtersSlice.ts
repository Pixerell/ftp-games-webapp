import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_GENRE = 'All Genres';
export const DEFAULT_PLATFORM = 'All Platforms';
export const DEFAULT_SORT = 'relevance';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        genre: DEFAULT_GENRE,
        platform: DEFAULT_PLATFORM,
        sort: DEFAULT_SORT
    },
    reducers: {
        setGenreFilter: (state, action) => {
            state.genre = action.payload;
        },
        setPlatformFilter: (state, action) => {
            state.platform = action.payload;
        },
        setSortOption: (state, action) => {
            state.sort = action.payload;
        },
        resetFilters: (state) => {
            state.genre = DEFAULT_GENRE;
            state.platform = DEFAULT_PLATFORM;
            state.sort = DEFAULT_SORT;
        }
    }
});

export const {
    setGenreFilter,
    setPlatformFilter,
    setSortOption,
    resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer

