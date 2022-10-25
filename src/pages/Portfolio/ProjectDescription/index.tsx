import { useProjectsCarousel } from "../hooks/useProjectsCarousel";
import { ProjectDescriptionContainer } from "./ProjectDescription";

export const ProjectDescription = ({ index }: {index: number}) => {    
    const { projectsInfo } = useProjectsCarousel()
    return (
        <ProjectDescriptionContainer>
                <h1 className="project-description-title">{projectsInfo[index].name}</h1>
                <p className="project-description-content">{projectsInfo[index].description}</p>
        </ProjectDescriptionContainer>
    );
}