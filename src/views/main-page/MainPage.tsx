import './MainPage.css'
import {Checkbox, Col, Row, Select, Button} from "antd";
import {RedoOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import GameCard from "../../components/game-card/GameCard";
import Floater from "../../components/floating-button/FloatingButton";
import {useFetchGamesQuery} from "../../redux/api";
import {IGame, genres} from "../../helpers/Interfaces";
import {RootState} from '../../redux/store';
import SkeletonCard from "../../components/game-card/SkeletonCard";
import {useFilterLogic} from "../../helpers/useFilterLogic";
import {DEFAULT_GENRE, DEFAULT_SORT} from "../../redux/filtersSlice";
import {useSelector} from "react-redux";
import InfiniteObserver from "../../helpers/InfiniteObserver";
import useInterval from "../../helpers/useErrorInterval";
import LoadingBlock from "../../components/loading-block/LoadingBlock";
import ErrorBlock from "../../components/error-block/ErrorBlock";


export default function MainPage() {

    const { Option } = Select;

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

    const { data: games, isLoading, error,  refetch  } = useFetchGamesQuery({
        category: genreFilter,
        platform: platformFilter,
        sort: activeSort
    }, {refetchOnMountOrArgChange: false});

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const gamesPerPage = useSelector((state: RootState) => state.pagination.gamesPerPage);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);


    useInterval(() => {
        if (error) {
            console.log("Something went wrong with a Main Page API call!")
            console.log(refetch)
            refetch();
        }
    });


    return (
            <div className="mainPage">
                <div className="mainBlock">
                    <h1 className="titles">FtPG UI</h1>
                    <div className="titlesDescription">This is a UI for Free-To-Play Games.com</div>
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

                    <Row className="mainRow" gutter={[30, 30]}>
                        {isLoading && (
                            <LoadingBlock/>
                        )}
                        {isLoading && (
                            <SkeletonCard cards={8}/>
                        )}
                        {error ? (
                            <ErrorBlock error={error}/>
                        ) : (
                            currentGames?.map((game: IGame) => (
                                    <Col key={game.id} xs={24} sm={12} md={8} lg={6}>

                                        <RouterLink to={`/game/${game.id}`}>
                                            <GameCard game={game} />
                                        </RouterLink>
                                    </Col>
                            ))
                        )}
                        {!isLoading && <InfiniteObserver />}
                    </Row>
                </div>
            <Floater/>
        </div>
    )
}