import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {api} from "../redux/api";
import {RootState} from "../redux/store";
import {IGameDetails} from "./Interfaces";
import {cacheGame} from "../redux/savedgamesSlice";
import useInterval from "./useErrorInterval";

export function useGamePageFetcher() {

    const {id} = useParams();
    const gameDataFromRedux = useSelector((state: RootState) => state.savedGames[Number(id)]) as IGameDetails | undefined;
    const shouldSkipQuery = !!gameDataFromRedux;
    let gameData = gameDataFromRedux;

    const {data: gameDataQuery, isLoading, error, refetch} = api.endpoints.fetchSpecificGame.useQuery(
        {gameId: id!},
        {skip: shouldSkipQuery, refetchOnMountOrArgChange: false},
    );

    const dispatch = useDispatch();

    // prevention of updating while rendering
    useEffect(() => {
        if (!shouldSkipQuery && gameDataQuery) {
            const currentDate = new Date();
            const modifiedGameData = {...gameDataQuery, dateOfGettingCached: currentDate.toISOString()};
            gameData = gameDataQuery;
            console.log("Caching game  - " + gameDataQuery.id);
            dispatch(cacheGame({gameData: modifiedGameData}));
        }
    }, [shouldSkipQuery, gameDataQuery, dispatch]);

    useInterval(() => {
        if (error) {
            console.log("Something went wrong with a Game Page API call!");
            refetch();
        }
    });

    return {
        gameData,
        isLoading,
        error,
    };
}
