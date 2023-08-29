import { createSlice } from '@reduxjs/toolkit';
import {IGameDetails} from "../helpers/Interfaces";

interface IGameSlice {
    [id: number]: IGameDetails;
}

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

const savedGames = createSlice({
    name: 'games',
    initialState: {} as IGameSlice,
    reducers: {
        cacheGame: (state, action) => {
            const { gameData } = action.payload;
            const currentDate = new Date();
            gameData.dateOfGettingCached = currentDate.toISOString();
            state[gameData.id] = gameData;

            const currentTimestamp = currentDate.getTime();
            for (const gameId in state) {
                const cachedGame = state[gameId];
                if (cachedGame.dateOfGettingCached) {
                    const cachedTimestamp = new Date(cachedGame.dateOfGettingCached).getTime();
                    if (currentTimestamp - cachedTimestamp > CACHE_EXPIRATION_TIME) {
                        delete state[gameId];
                        console.log("Deleted cached game - " + gameId)
                    }
                }
            }
        },
    },
});

export const { cacheGame } = savedGames.actions;
export default savedGames.reducer;
