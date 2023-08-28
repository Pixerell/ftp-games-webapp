import './MainPage.css'
import {Checkbox, Col, Row, Select, Button, Spin} from "antd";
import {RedoOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import GameCard from "../../components/game-card/GameCard";
import Floater from "../../components/floating-button/FloatingButton";
import {useFetchGamesQuery} from "../../redux/api";
import RootState, {Game, genres} from "../../components/Interfaces";
import SkeletonCard from "../../components/game-card/SkeletonCard";
import {useFilterLogic} from "./useFilterLogic";
import {DEFAULT_GENRE, DEFAULT_SORT} from "../../redux/filtersSlice";
import {useSelector} from "react-redux";
import InfiniteObserver from "./InfiniteObserver";
import useInterval from "../../components/useErrorInterval";


export default function MainPage() {

    const {
        genreFilter,
        platformFilter,
        activeSort,
        selectedPlatform,
        applySortOption,
        applyGenreFilter,
        applyPlatformFilter,
        clearAllFilters
    } = useFilterLogic();

    const { data: games, isLoading, error, refetch  } = useFetchGamesQuery({
        category: genreFilter,
        platform: platformFilter,
        sort: activeSort
    });

    useInterval(() => {
        if (error) {
            console.log("Something went wrong with an API call!")
            refetch();
        }
    });

    const { Option } = Select;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    let gamesPerPage = useSelector((state: RootState) => state.pagination.gamesPerPage);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);

    return (
            <div className="mainPage">
                <div className="mainBlock">
                    <h1 className="titles">FtPG UI</h1>
                    <div className="titlesDescription">some big description abot sex</div>
                </div>
                <div className="filtersBlock">
                    <div className="filters">
                    <span className="platformsSect">
                        <p className="filterTitle"><strong>Platform</strong></p>
                        <div className="platforms">
                            <Checkbox checked={selectedPlatform === 'pc'}
                                      onChange={() => applyPlatformFilter('pc')}
                                      className="checkbox">PC</Checkbox>
                            <Checkbox checked={selectedPlatform === 'browser'}
                                      onChange={() => applyPlatformFilter('browser')}
                                      className="checkbox">Browser</Checkbox>
                        </div>
                    </span>
                        <span className="genreSect">
                        <p className="filterTitle"> <strong>Genre</strong></p>
                        <div className="genres">
                            <Select onSelect={(genre) => applyGenreFilter(genre)}
                                    defaultValue={DEFAULT_GENRE} style={{width: 150}}>
                                <Option value={DEFAULT_GENRE}>All Genres</Option>
                                {genres.map((genre) => (
                                    <Option key={genre} value={genre}>
                                        {genre}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </span>
                    </div>
                    <div className="sorters">
                    <span>
                        <p className="filterTitle"> <strong>Sorters</strong></p>
                            <Row gutter={[12, 12]} className="buttonContainer">
                                <Col xs={24} sm={12} md={8} lg={8} className="aligned-col">
                                    <Button
                                        type={activeSort === DEFAULT_SORT ? 'primary' : 'default'}
                                        onClick={() => applySortOption(DEFAULT_SORT)}
                                        className="aligned-col"
                                    >
                                        Relevance
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} className="aligned-col">
                                    <Button
                                        type={activeSort === 'release-date' ? 'primary' : 'default'}
                                        onClick={() => applySortOption('release-date')}
                                        className="aligned-col"
                                    >
                                        Release Date
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} className="aligned-col">
                                    <Button
                                        type={activeSort === 'alphabetical' ? 'primary' : 'default'}
                                        onClick={() => applySortOption('alphabetical')}
                                        className="aligned-col"
                                    >
                                        Alphabetically
                                    </Button>
                                </Col>
                            </Row>

                    </span>
                    </div>
                    <div className="filterCleaner">
                        <p className="filterTitle"><strong>Clear Filters</strong></p>
                        <RedoOutlined onClick={clearAllFilters} className="cleanerIcon"/>
                    </div>
                </div>
                <div className="gamesBlock">
                    <Row gutter={[30, 30]}>

                        {error ? (
                            <div>
                                <p className="titles">Error fetching games ;(</p>
                                <p className="titles">Fetching 3 times in 15 seconds...</p>
                            </div>
                        ) : (
                            currentGames?.map((game: Game) => (
                                    <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
                                        <RouterLink to={`/game/${game.id}`}>
                                            <GameCard game={game} />
                                        </RouterLink>
                                    </Col>
                            ))
                        )}
                        {isLoading && (
                                <Col xs={24} sm={12} md={8} lg={6}>
                                    <SkeletonCard cards={1}/>
                                </Col>
                        )}
                        {!isLoading && <InfiniteObserver />}
                    </Row>
                </div>
                {isLoading && (
                    <div className="loadingBlock">
                        <p className="gameTitle">Loading games...</p>
                        <Spin className="spinner" indicator={antIcon} />
                    </div>
                    )}
            <Floater/>
        </div>
    )
}