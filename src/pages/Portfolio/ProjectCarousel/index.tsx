import { useProjectsCarousel } from "../hooks/useProjectsCarousel";
import { ProjectCarouselContainer } from "./Carousel.style";
import { useState } from "react"
import { ArrowDown } from "phosphor-react";
import { ProjectDescription } from "../ProjectDescription";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useNavigate } from "react-router-dom";

// interface IProjectInfo {
//     imageUrl: string;
//     name: string
// }


export const ProjectCarousel = () => {
    const [ index, setIndex ] = useState<number>(0)
    const [ showName, setShowName ] = useState<boolean>(false)
    const [ showDetails, setShowDetails ] = useState<boolean>(false)
    const [ newProject, setNewProject ] = useState<boolean>(false)
    const [ isShowingVideo, setIsShowingVideo ] = useState<boolean>(false)

    const [ containerHeight, setContainerHeight ] = useState<number>(45)
    const [ containerWidth, setContainerWidth ] = useState<number>(70)
    const [ containerPosition, setContainerPosition ] = useState<number>(0)
    const [ arrowPosition, setArrowPosition ] = useState<string>("")

    const { projectsInfo } = useProjectsCarousel()

    const { setEarthPosition, setBotPosition, setPortfolioPage, setHomePage, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState, setHoloPosition } = useBotFunctionsContext()

    const handlePreviousButton = () => {
        if (index === 0) {
            setIndex(projectsInfo.length-1);
        } else {
            setIndex(index -1)
        }
    }

    const handleNextButton = () => {
        if (index === projectsInfo.length-1) {
            setIndex(0);
        } else {
            setIndex(index +1)
        }
    }

    const navigate = useNavigate();
    
    return (
        <ProjectCarouselContainer style={{ height: `${containerHeight}rem`, width: `${containerWidth}rem` , marginTop: `-${containerPosition}rem`}}>
            <b onClick={() => {
                if (!isShowingVideo) {
                    setBotPosition("")
                    setEarthPosition("")
                    setPortfolioPage(false)
                    setHomePage(false)
                    setHologramActivated(false);
                    setIsShowingMenu(false);
                    setInfoTextHolo(false);
                    setVisorPosition("visor-to-top");
                    setEyeState("")
                    setHoloPosition("")
                    navigate("/")
                } else {
                    setBotPosition("bot-showing-portfolio")
                    setContainerHeight(45)
                    setContainerWidth(70)
                    setIsShowingVideo(false)
                }
            }} className="portfolio-close-button">X</b>
            {
             (!showDetails && !isShowingVideo) &&
             <>
              <button onClick={() =>
                {
                
                    setNewProject(!newProject)
                    handlePreviousButton()
                     
                }}className="portfolio-button previous"><b>V</b></button>
              <button onClick={() =>
                {
                    setNewProject(!newProject)
                    handleNextButton()    
                }}className="portfolio-button next"><b>V</b></button>
            </>
            }
            <div onClick={() =>
            {
                setContainerHeight(70)
                setContainerWidth(130)
                setBotPosition("bot-showing-portfolio-video")
                setIsShowingVideo(true)
            }} className={`image-and-name ${newProject ? "carousel-effect-1" : ""}`}>
                { !isShowingVideo &&
                    <img src={projectsInfo[index].imageUrl} alt="Imagem do projeto"/>
                }
                { isShowingVideo &&
                    <video controls src={projectsInfo[index].video}/>
                }
                <div onMouseEnter={() => setShowName(true)} onMouseLeave={() => setShowName(false)}className={`project-image-filter ${isShowingVideo ? "filter-hidden-for-video" : ""}`}>
                </div>
               { showName && <b className="project-name">Exibir Vídeo</b>}
            </div>
            {
                !isShowingVideo && 
            <div className="project-description-button-container">
                <b className={`button-description-arrow arrow1 ${arrowPosition}`}>v</b>
                <button
                 onClick={() => 
                    {
                        if (!showDetails) {
                            setShowDetails(!showDetails)
                            setContainerHeight(90)
                            setContainerPosition(2)
                            setArrowPosition("arrowUp")
                            setEarthPosition("earth-hidden")
                        } else {
                            setShowDetails(!showDetails)
                            setContainerHeight(45)
                            setContainerPosition(0)
                            setArrowPosition("")
                            setEarthPosition("")
                        }
                    }
                 } className="portfolio-button">{!showDetails ? "Exibir detalhes" : "Ocultar detalhes"}</button>
                <b className={`button-description-arrow arrow2 ${arrowPosition}`}>v</b>
            </div>
            }
            {showDetails &&
            <ProjectDescription index={index}/>
            }
        </ProjectCarouselContainer>
    );
}