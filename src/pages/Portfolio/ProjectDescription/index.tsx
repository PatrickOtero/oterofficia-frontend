import { IProjectsInfo } from "../ProjectCarousel";
import { ProjectDescriptionContainer } from "./ProjectDescription";

export interface IProjectDescription {
    projectsInfo: IProjectsInfo[];
    index: number;
}

export const ProjectDescription = ({ projectsInfo, index }: IProjectDescription) => {

        const projectHasFrontEnd = projectsInfo[index].frontend_url?.length

        const projectHasBackEnd = projectsInfo[index].backend_url?.length

    return (
        <ProjectDescriptionContainer>
                <h1 className="project-description-title">{projectsInfo[index].project_name}</h1>
                {projectsInfo[index].project_description.split("\n").map((paragraph: string, index: number) => {
                    return <p key={index * Math.random()} className="project-description-content">{paragraph}</p>
                })}
                <div className="front-end-link-container">
                { projectHasFrontEnd !== undefined && projectHasFrontEnd > 0 &&
                     <>
                        <b>Repositório front-end:</b>
                        <a href={projectsInfo[index].frontend_url}>Clique aqui</a>
                     </>}
                    { !projectHasFrontEnd && <b>Projeto sem front-end</b>}
                </div>
                <div className="back-end-link-container">
                { projectHasBackEnd !== undefined && projectHasBackEnd > 0 &&
                    <>
                    <b>Repositório back-end:</b>
                    <a href={projectsInfo[index].backend_url}>Clique aqui</a>
                    </> }
                    { !projectHasBackEnd && <b>Projeto sem back-end</b>}
                </div>

        </ProjectDescriptionContainer>
    );
}