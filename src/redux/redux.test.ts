import savedGamesReducer, { cacheGame } from './savedgamesSlice';
import { IGameDetails } from '../helpers/Interfaces';

describe('savedGamesSlice', () => {
    it('Cache and Remove expired cache', () => {
        const initialState = {
            1: {
                id: 1,
                title: 'Game 1',
                dateOfGettingCached: '2023-08-29T00:00:00.000Z', // An expired cached game
            },
            2: {
                id: 2,
                title: 'Game 2',
            },
        };

        const currentDate = new Date();
        const actionPayload: { gameData: IGameDetails } = {
            // @ts-ignore
            gameData: {
                id: 3,
                title: 'Game 3',
                dateOfGettingCached: currentDate.toISOString(),
            },
        };
        // @ts-ignore
        const nextState = savedGamesReducer(initialState, cacheGame(actionPayload));
        const expectedNextState = {
            2: {
                id: 2,
                title: 'Game 2',
            },
            3: {
                id: 3,
                title: 'Game 3',
                dateOfGettingCached: currentDate.toISOString(),
            },
        };
        expect(nextState).toEqual(expectedNextState);
    });
});
