import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { api } from "../../../services/axios";
import { ProjectDescription } from "../ProjectDescription";
import { ProjectCarouselContainer } from "./Carousel.style";

export interface IProjectsInfo {
    image_url: string;
    project_name: string;
    project_desc: string;
    frontend_url: string | undefined;
    backend_url: string | undefined;
    video_url: string | undefined;
}

export const ProjectCarousel = () => {
    const [index, setIndex] = useState<number>(0);
    const [showLink, setShowLink] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [newProject, setNewProject] = useState<boolean>(false);
    const [containerHeight, setContainerHeight] = useState<number>(45);
    const [containerPosition, setContainerPosition] = useState<number>(0);
    const [arrowPosition, setArrowPosition] = useState<string>("");
    const [projectsInfo, setProjectsInfo] = useState<IProjectsInfo[]>([]);
    const [projectsErrors, setProjectsErrors] = useState<string>("");

    const {
        setEarthPosition,
        isLoading,
        setIsLoading,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();

    const navigate = useNavigate();

    const handleGetProjects = useCallback(async () => {
        setIsLoading(true);
        setProjectsErrors("");

        try {
            const response = await api.get("/projects");
            setProjectsInfo(response.data);
        } catch (error: any) {
            setProjectsErrors(error.response?.data?.message || "Erro ao carregar projetos.");
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading]);

    useEffect(() => {
        handleGetProjects();
    }, [handleGetProjects]);

    const handlePreviousButton = () => {
        if (index === 0) {
            setIndex(projectsInfo.length - 1);
            return;
        }

        setIndex(index - 1);
    };

    const handleNextButton = () => {
        if (index === projectsInfo.length - 1) {
            setIndex(0);
            return;
        }

        setIndex(index + 1);
    };

    return (
        <ProjectCarouselContainer
            style={{
                height: `${containerHeight}rem`,
                transform: `translateY(-${containerPosition}rem)`,
            }}
        >
            <b
                className="portfolio-close-button"
                onClick={() => {
                    showHomeMenu();
                    navigate("/");
                }}
            >
                X
            </b>

            {!showDetails && projectsInfo.length > 0 && (
                <>
                    <button
                        className="portfolio-button previous"
                        onClick={() => {
                            setNewProject(!newProject);
                            handlePreviousButton();
                        }}
                    >
                        <b>V</b>
                    </button>
                    <button
                        className="portfolio-button next"
                        onClick={() => {
                            setNewProject(!newProject);
                            handleNextButton();
                        }}
                    >
                        <b>V</b>
                    </button>
                </>
            )}

            <div className={`image-and-name ${newProject ? "carousel-effect-1" : ""}`}>
                {isLoading && (
                    <div className="loading-container">
                        <b className="loading-text">Carregando...</b>
                        <div className="loading-track">
                            <div className="loading-bar" />
                        </div>
                    </div>
                )}

                {!isLoading && projectsInfo.length > 0 && (
                    <img src={projectsInfo[index].image_url} alt="Imagem do projeto" />
                )}

                <div
                    className={`project-image-filter ${
                        showLink && projectsInfo.length > 0 ? "project-image-filter-hover" : ""
                    }`}
                    onMouseEnter={() => setShowLink(true)}
                    onMouseLeave={() => setShowLink(false)}
                />

                {!isLoading && showLink && projectsInfo.length > 0 && (
                    <a
                        className="project-link"
                        href={projectsInfo[index].video_url}
                        onMouseEnter={() => setShowLink(true)}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {projectsInfo[index].video_url?.length
                            ? "Exibir video no Linkedin"
                            : "Sem video"}
                    </a>
                )}

                {!isLoading && projectsErrors.length > 0 && (
                    <b className="projects-list-empty-message">{projectsErrors}</b>
                )}

                {!isLoading && projectsInfo.length <= 0 && projectsErrors.length <= 0 && (
                    <b className="projects-list-empty-message">
                        Nao existem projetos no banco de dados
                    </b>
                )}
            </div>

            {projectsInfo.length > 0 && (
                <div className="project-description-button-container">
                    <b className={`button-description-arrow arrow1 ${arrowPosition}`}>v</b>
                    <button
                        className="portfolio-button"
                        onClick={() => {
                            if (!showDetails) {
                                setShowDetails(true);
                                setContainerHeight(90);
                                setContainerPosition(2);
                                setArrowPosition("arrowUp");
                                setEarthPosition("earth-hidden");
                                return;
                            }

                            setShowDetails(false);
                            setContainerHeight(45);
                            setContainerPosition(0);
                            setArrowPosition("");
                            setEarthPosition("");
                        }}
                    >
                        {!showDetails ? "Exibir detalhes" : "Ocultar detalhes"}
                    </button>
                    <b className={`button-description-arrow arrow2 ${arrowPosition}`}>v</b>
                </div>
            )}

            {showDetails && <ProjectDescription index={index} projectsInfo={projectsInfo} />}
        </ProjectCarouselContainer>
    );
};
