import './MainPage.css'
import {Checkbox, Col, Row, Select, Button, Spin} from "antd";
import {RedoOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import GameCard from "../../components/game-card/GameCard";
import Floater from "../../components/floating-button/FloatingButton";
import {useFetchGamesQuery} from "../../redux/api";
import RootState, {Game, genres} from "../../components/Interfaces";
import SkeletonCard from "../../components/game-card/SkeletonCard";
import {useDispatch, useSelector} from "react-redux";
import {setGenreFilter, setPlatformFilter, setSortOption} from "../../redux/filtersSlice";
import {useState} from "react";

export default function MainPage() {

    const { Option } = Select;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const genreFilter = useSelector((state: RootState) => state.filters.genre);
    const platformFilter = useSelector((state: RootState) => state.platforms.platform);
    const activeSort = useSelector((state: RootState) => state.sorters.sort);

    const { data: games, error, isLoading } = useFetchGamesQuery({
        category: genreFilter,
        platform: platformFilter,
    });

    const [selectedPlatform, setSelectedPlatform] = useState('all'); // Default value

    const handlePlatformChange = (platform:string) => {
        if (selectedPlatform === platform) {
            setSelectedPlatform('all'); // Disable the selected platform
            dispatch(setPlatformFilter('all')); // Dispatch action with default value
        } else {
            setSelectedPlatform(platform); // Enable the selected platform
            dispatch(setPlatformFilter(platform)); // Dispatch action with selected platform
        }
    };

    const handleClearFilters = () => {
        setSelectedPlatform('all'); // Disable the selected platform

        dispatch(setGenreFilter('all')); // Reset genre filter
        dispatch(setPlatformFilter('all')); // Reset platform filter
        dispatch(setSortOption('relevance')); // Reset sort option
    };



    const dispatch = useDispatch();


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
                                      onChange={() => handlePlatformChange('pc')}
                                      className="checkbox">PC</Checkbox>
                            <Checkbox checked={selectedPlatform === 'browser'}
                                      onChange={() => handlePlatformChange('browser')}
                                      className="checkbox">Browser</Checkbox>
                        </div>
                    </span>
                        <span className="genreSect">
                        <p className="filterTitle"> <strong>Genre</strong></p>
                        <div className="genres">
                            <Select onSelect={(genre) => dispatch(setGenreFilter(genre))}
                                    defaultValue="All Genres" style={{width: 150}}>
                                <Option value="All Genres">All Genres</Option>
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
                                        type={activeSort === 'relevance' ? 'primary' : 'default'}
                                        onClick={() => dispatch(setSortOption('relevance'))}
                                        className="aligned-col"
                                    >
                                        Relevance
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} className="aligned-col">
                                    <Button
                                        type={activeSort === 'release-date' ? 'primary' : 'default'}
                                        onClick={() => dispatch(setSortOption('release-date'))}
                                        className="aligned-col"
                                    >
                                        Release Date
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} className="aligned-col">
                                    <Button
                                        type={activeSort === 'alphabetical' ? 'primary' : 'default'}
                                        onClick={() => dispatch(setSortOption('alphabetical'))}
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
                        <RedoOutlined onClick={handleClearFilters} className="cleanerIcon"/>
                    </div>
                </div>
                <div className="gamesBlock">
                    <Row gutter={[30, 30]}>

                        {error ? (
                            <p className="titles">Error fetching games ;(</p>
                        ) : (
                            games?.map((game: Game) => (
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