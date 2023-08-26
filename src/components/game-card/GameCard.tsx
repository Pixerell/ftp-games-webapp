import React from 'react';
import { Card } from 'antd';
import './GameCard.css'
import mockGame from '../../mockGame.png';

const { Meta } = Card;

interface Game {
    id: number;
    name: string;
    genre: string;
    imageUrl: string;
}

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    return (
        <Card className="gameCard"
            hoverable
            cover={<img alt={game.name} src={mockGame} style={{ maxHeight: '200px' }} />}>
            <div className="underImgCard">
                <Meta className="metaCard"
                      title={<h3 className="cardTitle">{game.name}</h3>}
                      description={<span className="cardDesc">{game.genre}</span>}></Meta>
                <Meta className="metaCard rightMeta"
                      title={<h4 className="cardTitle">Publisher</h4>}
                      description={<span className="cardDesc">releasedate</span>}></Meta>
            </div>
        </Card>
    );
};

export default GameCard;
