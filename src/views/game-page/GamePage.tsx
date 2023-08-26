import './GamePage.css'
import mockGame from '../../mockGame.png';
import {Carousel} from "antd";

export default function GamePage() {
    return (
        <div className="gameBg">
            <h1 className="gameTitle">Hollow knight</h1>
            <div className="gameheadBlock">
                <img alt="mockart" className="gamePoster" src={mockGame}/>
                <div className="gameDesc">

                    <div className="infoBlock">
                        <span>Release - </span>
                        <p> Sample text about release</p>
                    </div>

                    <div className="infoBlock">
                        <span>Genre - </span>
                        <p> Sample text about genre</p>
                    </div>

                    <div className="infoBlock">
                        <span>Publisher - </span>
                        <p> Sample text about publisher</p>
                    </div>

                    <div className="infoBlock">
                        <span>Developer - </span>
                        <p> Sample text about developer</p>
                    </div>

                    <span className="sysTitle">System Requirements :</span>
                    <ul className="requirementsList">
                        <li>OS: Windows 10</li>
                        <li>Processor: Intel Core i5</li>
                        <li>Memory: 8 GB RAM</li>
                        <li>Graphics: NVIDIA GeForce GTX 1060</li>
                        <li>Storage: 50 GB available space</li>
                    </ul>

                    <div className="infoBlock">
                        <section className="bigDesc"> SLorem ipsumabitur vell posuere dictum, nisi purus luctus risus, eget viverra mi eros vel justo. Curabitur vel ante id justo blandit ante id justo blandit semper. Fusce interdum aliquet malesuada. Nullam at convallis odio. Etiam semper libero nisl, non auctor dolor condimentum eget. Pellentesque hendrerit dolor sit amet, consectetur adipiscing elit. Ut vehicula accumsan sem, a mattis est scelerisque in. Vivamus suscipit suscipit justo a faucibus. Nulla facilisi. Nulla auctor, sapien vel posuere dictum, nisi purus luctus risus, eget viverra mi eros vel justo. Curabitur vel ante id justo blandit semper. Fusce interdum aliquet malesuada. Nullam at convallis odio. Etiam semper libero nisl, non auctor dolor condimentum eget. Pellentesque hendrerit augue nec ipsum blandit lacinia. Nam vestibulum, libero sed venenatis efficitur, neque risus dictum nulla, in varius ante neque nec velit. Morbi laoreet ipsum vitae urna vulputate, sit amet malesuada justo bibendum. In vel odio in ligula tincidunt tristique. Nam volutpat tellus et tristique posuere. Integer feugiat purus vitae diam consectetur, quis feugiat elit aliquet</section>
                    </div>

                </div>
            </div>

            <div className="gameBodyBlock">
                <div className="carouselWrapper">

                    <Carousel autoplay dots={true} dotPosition={"bottom"} draggable
                              className="screenCarausel">
                        <div>
                            <h1 style={{color:'white', lineHeight: '200px'}}>1</h1>
                        </div>                        <div>
                            <h1 style={{color:'white', lineHeight: '200px'}}>2</h1>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}