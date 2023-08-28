import filtersReducer from '../redux/filtersSlice';
import paginationReducer from "../redux/paginationSlice";

type RootState = {
    filters: ReturnType<typeof filtersReducer>;
    pagination: ReturnType<typeof paginationReducer>,
    // ...other reducers
};

export default RootState;

export type ActionWithPayload = (payload: any) => { type: string; payload: any };

export interface Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
}

export interface GameCardProps {
    game: Game;
}

export interface SkeletonCardProps {
    cards: number;
}

export const genres = [
    'Shooter',
    'MMO',
    'Strategy',
    'Fighting',
    'Action',
    'MOBA',
    'Sports',
    'Card',
    'Racing',
    'Fantasy',
    'Social'
];
