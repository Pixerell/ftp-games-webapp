import { render, screen, waitFor } from '@testing-library/react';
import GamePage from './game-page/GamePage';
import '@testing-library/jest-dom'
import {MemoryRouter} from "react-router-dom";


jest.mock('../helpers/useGamePageFetcher', () => ({
    useGamePageFetcher: jest.fn()
}));


jest.mock('../components/loading-block/LoadingBlock', () => () => <div>LoadingBlock</div>);
jest.mock('../components/error-block/ErrorBlock', () => () => <div>ErrorBlock</div>);


describe('Pages Loader', () => {

    it('Check Loading State', () => {
        require('../helpers/useGamePageFetcher').useGamePageFetcher.mockReturnValue({
            isLoading: true,
            error: null,
            gameData: null
        });

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );
        expect(screen.getByText('LoadingBlock')).toBeInTheDocument();
    });

    it('Check Error State', () => {
        require('../helpers/useGamePageFetcher').useGamePageFetcher.mockReturnValue({
            isLoading: false,
            error: 'Some error',
            gameData: null
        });

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );
        expect(screen.getByText('ErrorBlock')).toBeInTheDocument();
    });

    it('Check Gamedata', async () => {
        const fakeGameData = {
            title: 'Some Game',
            thumbnail: 'some/path.jpg',
            screenshots: [
                { id: 1, image: 'some/image1.jpg' },
                { id: 2, image: 'some/image2.jpg' }
            ],
        };

        require('../helpers/useGamePageFetcher').useGamePageFetcher.mockReturnValue({
            isLoading: false,
            error: null,
            gameData: fakeGameData
        });

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Some Game')).toBeInTheDocument();
            expect(screen.getByAltText('mockart')).toBeInTheDocument();
        });
    });

});