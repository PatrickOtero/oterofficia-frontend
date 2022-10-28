import { ProjectCarouselContainer } from "./Carousel.style";
import { useEffect, useState } from "react"
import { ProjectDescription } from "../ProjectDescription";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/axios";

export interface IProjectsInfo {
    image_url: string;
    project_name: string;
    project_description: string;
    frontend_url: string | undefined;
    backend_url: string | undefined;
    video_url: string | undefined;
}

export const ProjectCarousel = () => {
    const [ index, setIndex ] = useState<number>(0)
    const [ showLink, setShowLink ] = useState<boolean>(false)
    const [ showDetails, setShowDetails ] = useState<boolean>(false)
    const [ newProject, setNewProject ] = useState<boolean>(false)

    const [ containerHeight, setContainerHeight ] = useState<number>(45)
    const [ containerWidth, setContainerWidth ] = useState<number>(70)
    const [ containerPosition, setContainerPosition ] = useState<number>(0)
    const [ arrowPosition, setArrowPosition ] = useState<string>("")

    const [ projectsInfo, setProjectsInfo ] = useState<IProjectsInfo[]>([]);
    const [ projectsErrors, setProjectsErrors ] = useState<string>("");

    const { setEarthPosition, setBotPosition, setPortfolioPage, setHomePage, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState, setHoloPosition, isLoading, setIsLoading } = useBotFunctionsContext()

    const handleGetProjects = async () => {
        setIsLoading(true)

        try {
            const response = await api.get("/projects");

            setProjectsInfo(response.data);
            setIsLoading(false)
        } catch ( error: any ) {
            setIsLoading(false)
            setProjectsErrors(error.response.data.message)
        }
    }

    useEffect(() => {
        const handleLoadGetProjects = async () => {
            await handleGetProjects()
        }
        handleLoadGetProjects()
    }, [])

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
             !showDetails && projectsInfo.length > 0 &&
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
            {isLoading &&
                <div className="loading-container">
                    <b className="loading-text">Carregando...</b>
                    <div className="loading-track">
                        <div className="loading-bar"></div>
                    </div>
                </div>}
                {!isLoading && projectsInfo.length > 0 &&
                    <img src={projectsInfo[index].image_url} alt="Imagem do projeto"/>
                }
                <div className={`project-image-filter ${showLink && projectsInfo.length > 0 ? "project-image-filter-hover" : ""}`} onMouseEnter={() => setShowLink(true)}
                     onMouseLeave={() => setShowLink(false)}>
                </div>
               {!isLoading && showLink && projectsInfo.length > 0 && <a onMouseEnter={() => setShowLink(true)} className="project-link" href={projectsInfo[index].video_url} target="blank">{`${projectsInfo[index].video_url?.length ? "Exibir vídeo no Linkedin" : "Sem vídeo"}`}</a>
               }
               {!isLoading && projectsInfo.length <= 0 && <b className="projects-list-empty-message">Não existem projetos no banco de dados</b>}
            </div>
            {
                projectsInfo.length > 0 && <div className="project-description-button-container">
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
            <ProjectDescription projectsInfo={projectsInfo} index={index}/>
            }
        </ProjectCarouselContainer>
    );
}