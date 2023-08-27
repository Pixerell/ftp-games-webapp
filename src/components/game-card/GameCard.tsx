import React from 'react';
import { Card } from 'antd';
import './GameCard.css'
import {GameCardProps} from "../Interfaces";

const { Meta } = Card;

const GameCard: React.FC<GameCardProps> = (game) => {
    return (
        <Card className="gameCard"
            hoverable
            cover={<img alt={game.game.title} src={game.game.thumbnail} style={{ maxHeight: '200px' }} />}>
            <div className="underImgCard">
                <Meta className="metaCard"
                      title={<h3 className="cardTitle">{game.game.title}</h3>}
                      description={<span className="cardDesc">{game.game.genre}</span>}></Meta>
                <Meta className="metaCard rightMeta"
                      title={<h4 className="cardTitle">{game.game.platform}</h4>}
                      description={<span className="cardDesc">{game.game.release_date}</span>}></Meta>
            </div>
        </Card>
    );
};

export default GameCard;
