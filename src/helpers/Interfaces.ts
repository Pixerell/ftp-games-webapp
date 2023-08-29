export type ActionWithPayload = (payload: any) => { type: string; payload: any };

export interface IGame {
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

export interface IGameDetails {
    id: number;
    title: string;
    thumbnail: string;
    status: string;
    short_description: string;
    description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    screenshots: {
        id: number;
        image: string;
    }[];
    dateOfGettingCached?: string;
}

export interface IGameCardProps {
    game: IGame;
}

export interface IGameDescriptionProps {
    gameDesc: IGameDetails
}

export interface ISkeletonCardProps {
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
