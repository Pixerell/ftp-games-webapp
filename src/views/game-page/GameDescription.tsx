import {IGameDescriptionProps} from "../../helpers/Interfaces";

const GameDescription: React.FC<IGameDescriptionProps> = ({gameDesc}) => (
    <div>
        <div className="infoBlock">
            <span className="coloredText">Release - </span>
            <p>{gameDesc.release_date}</p>
        </div>

        <div className="infoBlock">
            <span className="coloredText">Genre - </span>
            <p>{gameDesc.genre}</p>
        </div>

        <div className="infoBlock">
            <span className="coloredText">Publisher - </span>
            <p> {gameDesc.publisher}</p>
        </div>

        <div className="infoBlock">
            <span className="coloredText">Developer - </span>
            <p> {gameDesc.developer}</p>
        </div>

    </div>
);

export default GameDescription;