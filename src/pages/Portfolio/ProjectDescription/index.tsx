import { useProjectsCarousel } from "../hooks/useProjectsCarousel";
import { ProjectDescriptionContainer } from "./ProjectDescription";

export const ProjectDescription = ({ index }: {index: number}) => {    
    const { projectsInfo } = useProjectsCarousel()
    return (
        <ProjectDescriptionContainer>
                <h1 className="project-description-title">{projectsInfo[index].name}</h1>
                <p className="project-description-content">{projectsInfo[index].description}</p>
                <div className="front-end-link-container">
                    <b>Repositório front-end:</b>
                    <a href={projectsInfo[index].frontendUrl}>Clique aqui</a>
                </div>
                <div className="back-end-link-container">
                    <b>Repositório back-end:</b>
                    <a href={projectsInfo[index].backendUrl}>Clique aqui</a>
                </div>

        </ProjectDescriptionContainer>
    );
}