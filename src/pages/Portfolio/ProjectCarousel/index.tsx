import { useProjectsCarousel } from "../hooks/useProjectsCarousel";
import { ProjectCarouselContainer } from "./Carousel.style";
import { useState } from "react"
import { ProjectDescription } from "../ProjectDescription";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useNavigate } from "react-router-dom";

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
            <b className="portfolio-close-button" onClick={() => {
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
            }}>X</b>
            {
             !showDetails &&
             <>
              <button className="portfolio-button previous"
               onClick={() =>
                {
                
                    setNewProject(!newProject)
                    handlePreviousButton()
                     
                }}><b>V</b></button>
              <button className="portfolio-button next"
               onClick={() =>
                {
                    setNewProject(!newProject)
                    handleNextButton()    
                }}><b>V</b></button>
            </>
            }
            <div className={`image-and-name ${newProject ? "carousel-effect-1" : ""}`}>
                    <img src={projectsInfo[index].imageUrl} alt="Imagem do projeto"/>
                <div className={`${isShowingVideo ? "project-video-filter" : "project-image-filter"}`} onMouseEnter={() => setShowName(true)}
                     onMouseLeave={() => setShowName(false)}>
                </div>
               { showName && <a onMouseEnter={() => setShowName(true)} className="project-name" href={projectsInfo[index].videoUrl} target="blank">{`${projectsInfo[index].videoUrl.length ? "Exibir vídeo no Linkedin" : "Sem vídeo"}`}</a>
               }
            </div>
            {
                !isShowingVideo && 
            <div className="project-description-button-container">
                <b className={`button-description-arrow arrow1 ${arrowPosition}`}>v</b>
                <button className="portfolio-button"
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
                 }>{!showDetails ? "Exibir detalhes" : "Ocultar detalhes"}</button>
                <b className={`button-description-arrow arrow2 ${arrowPosition}`}>v</b>
            </div>
            }
            {showDetails &&
            <ProjectDescription index={index}/>
            }
        </ProjectCarouselContainer>
    );
}