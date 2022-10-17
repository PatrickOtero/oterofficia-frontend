import { useEffect } from "react";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { AboutMeContainer } from "./AboutMe.style";

export const AboutMePage = () => {

    const {handleGetGithubProfile, githubProfile, aboutMePage } = useBotFunctionsContext();

    useEffect(() => {
        handleGetGithubProfile()
    }, [])

    return (
        <AboutMeContainer>           
            { aboutMePage &&
            <div className="aboutme-page-main">
                <div className="github-info-container">
                    <b className="github-title">Perfil GITHUB</b>
                    <div className="github-info-main">
                        <div className="img-filter">
                        </div>
                        <img src={githubProfile.avatar_url} alt="github-image"/>
                        <div className="github-name-and-description">
                            <b className="github-profile-name">{githubProfile.name}</b>
                            <p className="github-description">{githubProfile.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            }     
        </AboutMeContainer>
    );
}
