import './GamePage.css'
import Floater from "../../components/floating-button/FloatingButton";
import LoadingBlock from "../../components/loading-block/LoadingBlock";
import GameDescription from "./GameDescription";
import {Carousel, Skeleton} from "antd";
import GameDescriptionAdditional from "./GameDescriptionAdditional";
import {useGamePageFetcher} from "../../helpers/useGamePageFetcher";
import ErrorBlock from "../../components/error-block/ErrorBlock";
import SkeletonCard from "../../components/game-card/SkeletonCard";


export default function GamePage() {

    const { gameData, isLoading, error } = useGamePageFetcher();

    return (
        <div className="gameBg">
            {isLoading &&
                <div>
                    <LoadingBlock/>
                    <div className="skeletonArea">
                        <div className="skeletonAreaTop">
                            <SkeletonCard cards={1}/>
                            <Skeleton paragraph={{ rows: 4 }} className="SkeletonBody skeleTop" active={true} />
                        </div>
                        <Skeleton paragraph={{ rows: 8 }} className="SkeletonBody skeleTop" active={true} />
                    </div>
                </div>
            }
            <div>
                {error ? (
                    <ErrorBlock error={error}/>
                ) : (
                    <>
                        {gameData && (
                            <>
                                <h1 className="gameTitle">{gameData.title}</h1>
                                <div className="gameheadBlock">
                                    <img alt="mockart" className="gamePoster" src={gameData.thumbnail} />
                                    <div className="gameDesc">
                                        <GameDescription gameDesc={gameData} />
                                    </div>
                                </div>
                                <div className="mobileDesc">
                                    <GameDescription gameDesc={gameData} />
                                </div>
                                <GameDescriptionAdditional gameDesc={gameData}/>
                                <div className="gameBodyBlock">
                                    <h1 className="gameTitle">Screenshots</h1>
                                    <div className="carouselWrapper">
                                        <Carousel
                                            autoplay
                                            dots={true}
                                            dotPosition={"bottom"}
                                            draggable
                                            className="screenCarausel"
                                        >
                                            {gameData.screenshots.length > 0 ? (
                                                gameData.screenshots.map((screenshot: { id: number; image: string }) => (
                                                    <div key={screenshot.id}>
                                                        <img
                                                            alt={"Screenshot"}
                                                            className="screenCarouselImg"
                                                            src={screenshot.image}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <h4 className="infoBlock">No screenshots available...</h4>
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            <Floater/>
        </div>
    )
}