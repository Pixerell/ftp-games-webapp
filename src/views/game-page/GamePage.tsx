import './GamePage.css'
import mockGame from '../../mockGame.png';
import mockGame2 from '../../mockGame2.png';
import {Carousel} from "antd";
import Floater from "../../components/floating-button/FloatingButton";
import GameDescription from "./GameDescription";

export default function GamePage() {
    return (
        <div className="gameBg">
            <h1 className="gameTitle">Hollow knight</h1>
            <div className="gameheadBlock">
                <img alt="mockart" className="gamePoster" src={mockGame}/>
                <div className="gameDesc">
                    <GameDescription/>
                </div>
            </div>
            <div className="mobileDesc">
                <GameDescription/>
            </div>
            <div className="gameBodyBlock">
                <h1 className="gameTitle">Screenshots</h1>
                <div className="carouselWrapper">
                    <Carousel autoplay dots={true} dotPosition={"bottom"} draggable
                              className="screenCarausel">
                        <div>
                            <img alt="mockart" className="screenCarauselImg" src={mockGame}/>
                        </div>
                        <div>
                            <img alt="mockart" className="screenCarauselImg" src={mockGame2}/>
                        </div>
                    </Carousel>
                </div>
            </div>
            <Floater/>
        </div>
    )
}