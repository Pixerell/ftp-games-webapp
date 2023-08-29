import {act, renderHook} from '@testing-library/react';
import {useSelector, useDispatch} from 'react-redux';
import {DEFAULT_GAMES_NUMBER, setGamesPerPage} from '../redux/paginationSlice';
import useInterval from "./useErrorInterval";
import {RootState} from "../redux/store";
import {useFilterLogic} from "./useFilterLogic";
import {DEFAULT_PLATFORM, resetFilters, setGenreFilter, setPlatformFilter, setSortOption} from "../redux/filtersSlice";

jest.useFakeTimers();
jest.mock('react-redux');

jest.mock('../redux/api', () => ({
    api: {
        endpoints: {
            fetchSpecificGame: {
                useQuery: jest.fn(),
            },
        },
    },
}));
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe('useInterval', () => {
    it('Calling after delay', () => {
        const callback = jest.fn();
        // @ts-ignore
        const {result} = renderHook(() => useInterval(callback));

        act(() => {
            jest.advanceTimersByTime(1500);
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Calling after 3 intervals', () => {
        const callback = jest.fn();
        // @ts-ignore
        const {result} = renderHook(() => useInterval(callback));

        act(() => {
            jest.advanceTimersByTime(1500);
        });
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        expect(callback).toHaveBeenCalledTimes(3);
    });

    it('Clear Interval', () => {
        const callback = jest.fn();
        const {unmount} = renderHook(() => useInterval(callback));
        unmount();
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        expect(callback).not.toHaveBeenCalled();
    });
});

describe('useFilterLogic', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        useDispatchMock.mockReturnValue(dispatch);
        useSelectorMock.mockImplementation((selector) =>
            selector({
                filters: {
                    genre: 'action',
                    platform: 'pc',
                    sort: 'release_date',
                },
            } as RootState)
        );
    });

    it('Platform Dispatch', () => {
        const dispatch = jest.fn();
        useDispatchMock.mockReturnValue(dispatch);

        const {result} = renderHook(() => useFilterLogic());

        act(() => {
            result.current.applyPlatformFilter('a');
        });

        expect(dispatch).toHaveBeenCalledWith(setPlatformFilter('a'));
    });

    it('Sort Dispatch', () => {
        const {result} = renderHook(() => useFilterLogic());

        act(() => {
            result.current.applySortOption('popularity');
        });

        expect(dispatch).toHaveBeenCalledWith(setSortOption('popularity'));
    });

    it('Genre Dispatch', () => {
        const {result} = renderHook(() => useFilterLogic());

        act(() => {
            result.current.applyGenreFilter('mmo');
        });

        expect(dispatch).toHaveBeenCalledWith(setGenreFilter('mmo'));
    });


    it('Resetter', () => {
        const {result} = renderHook(() => useFilterLogic());

        act(() => {
            result.current.clearAllFilters();
        });

        expect(result.current.selectedPlatform).toEqual(DEFAULT_PLATFORM);
        expect(dispatch).toHaveBeenCalledWith(resetFilters());
        expect(dispatch).toHaveBeenCalledWith(setGamesPerPage(DEFAULT_GAMES_NUMBER));
    });
});

