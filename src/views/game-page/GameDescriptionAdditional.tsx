import {IGameDescriptionProps} from "../../helpers/Interfaces";
import "./GamePage.css"

const GameDescriptionAdditional: React.FC<IGameDescriptionProps> = ({gameDesc}) => (

    <div className="AdditionalDesc">
        <div className="infoBlock listFlex">
            <span className="sysTitle coloredText">System Requirements :</span>
            {gameDesc && gameDesc.minimum_system_requirements ? (
                <ul className="requirementsList">
                    {Object.entries(gameDesc.minimum_system_requirements).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            ) : (
                <h5>No system requirements available.</h5>
            )}
        </div>
        <div className="infoBlock">
            <section><span className="coloredText">Description</span>{gameDesc.description}</section>
        </div>
    </div>
);

export default GameDescriptionAdditional;