import {useSelector, useDispatch} from 'react-redux';
import {ActionWithPayload} from './Interfaces';
import {RootState} from '../redux/store';
import {
    setGenreFilter,
    setPlatformFilter,
    setSortOption,
    resetFilters
} from '../redux/filtersSlice';
import {DEFAULT_PLATFORM} from "../redux/filtersSlice";
import {useState} from "react";
import {DEFAULT_GAMES_NUMBER, setGamesPerPage} from "../redux/paginationSlice";

export const useFilterLogic = () => {
    const dispatch = useDispatch();
    const genreFilter = useSelector((state: RootState) => state.filters.genre);
    const platformFilter = useSelector((state: RootState) => state.filters.platform);
    const activeSort = useSelector((state: RootState) => state.filters.sort);

    const [selectedPlatform, setSelectedPlatform] = useState(DEFAULT_PLATFORM);

    const applyFilter = (action: ActionWithPayload, payload: string) => {

        if (action === setPlatformFilter) {
            const newPlatform = platformFilter === payload ? DEFAULT_PLATFORM : payload;
            setSelectedPlatform(newPlatform);
            dispatch(action(newPlatform));
        } else {
            dispatch(action(payload));
        }
        dispatch(setGamesPerPage(DEFAULT_GAMES_NUMBER));
    };
    return {
        genreFilter,
        platformFilter,
        activeSort,
        selectedPlatform,
        applySortOption: (sort: string) => applyFilter(setSortOption, sort),
        applyGenreFilter: (genre: string) => applyFilter(setGenreFilter, genre),
        applyPlatformFilter: (platform: string) => applyFilter(setPlatformFilter, platform),
        clearAllFilters: () => {
            setSelectedPlatform(DEFAULT_PLATFORM);
            dispatch(resetFilters());
            dispatch(setGamesPerPage(DEFAULT_GAMES_NUMBER));
        },
    };
};

