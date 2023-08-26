import './MainPage.css'
import {Checkbox, Col, Row, Select, Button, Space, FloatButton} from "antd";
import { UpOutlined, RedoOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import GameCard from "../../components/game-card/GameCard";

interface Game {
    id: number;
    name: string;
    genre: string;
    imageUrl: string;
}

export default function MainPage() {

    const { Option } = Select;


    const games: Game[] = [
        // Your game data from API
        { id: 1, name: 'Game 1', genre: 'Action', imageUrl: 'url-to-image' },
        { id: 2, name: 'Game 2', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 3, name: 'Game 3', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 4, name: 'Game 4', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 5, name: 'Game 5', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 6, name: 'Game 6', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 7, name: 'Game 7', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 8, name: 'Game 8', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 9, name: 'Game 9', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 10, name: 'Game 10', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 11, name: 'Game 11', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 12, name: 'Game 12', genre: 'Adventure', imageUrl: 'url-to-image' },
        { id: 13, name: 'Game 13', genre: 'Adventure', imageUrl: 'url-to-image' },
        // Add more game objects as needed
    ];


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
                                <Checkbox className="checkbox">PC</Checkbox>
                                <Checkbox className="checkbox">PlayStation</Checkbox>
                                <Checkbox className="checkbox">All Platforms</Checkbox>
                            </div>
                        </span>
                        <span className="genreSect">
                            <p className="filterTitle"> <strong>Genre</strong></p>
                            <div className="genres">
                                <Select defaultValue="all" style={{ width: 150 }}>
                                    <Option value="all">All Genres</Option>
                                    <Option value="action">Action</Option>
                                    <Option value="adventure">Adventure</Option>
                                    <Option value="rpg">Role-Playing</Option>
                                </Select>
                            </div>
                        </span>
                    </div>
                    <div className="sorters">
                        <span>
                            <p className="filterTitle"> <strong>Sorters</strong></p>
                            <Space size={12} className="buttonContainer">
                                <Button type="primary">Relevance</Button>
                                <Button>Release Date</Button>
                                <Button>Popularity</Button>
                                <Button>Alphabetically</Button>
                            </Space>
                        </span>
                    </div>
                    <div className="filterCleaner">
                            <p className="filterTitle"> <strong>Clear Filters</strong></p>
                            <RedoOutlined className="cleanerIcon" />
                    </div>
            </div>
            <div className="gamesBlock">
                <Row gutter={[30, 30]}>
                    {games.map((game) => (
                        <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
                            <RouterLink to={`/game/${game.id}`}>
                                <GameCard game={game} />
                            </RouterLink>
                        </Col>
                    ))}
                </Row>
            </div>
            <FloatButton
                shape="circle"
                type="primary"
                style={{ right: 94 }}
                icon={<UpOutlined />}
            />
        </div>
    )
}