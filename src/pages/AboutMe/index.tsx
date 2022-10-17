import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { AboutMeContainer } from "./AboutMe.style";
import { AboutMeSection } from "./AboutMeSection";
import linkedinPhoto from "./assets/linkedinPhoto.png"
import { useSectionData } from "./hooks/useSectionData";

export const AboutMePage = () => {

    const {aboutMePage, setAboutMePage, setHomePage, setBotPosition, handleGetGithubProfile, githubProfile } = useBotFunctionsContext();

    const { linkedinDescription, linkedinName, linkedinUrl } = useSectionData()

    useEffect(() => {
        handleGetGithubProfile()
    }, [])

    const navigate = useNavigate();

    return (
        <AboutMeContainer>           
            { aboutMePage &&
            <div className="aboutme-page-main">
                <AboutMeSection
                 avatarUrl={githubProfile?.avatar_url}
                 profileBio={githubProfile?.bio}
                 profileName={githubProfile?.name}
                 title="GITHUB"
                 profileUrl={githubProfile?.url}
                 />
                <AboutMeSection
                 avatarUrl={linkedinPhoto}
                 profileBio={linkedinDescription}
                 profileName={linkedinName}
                 title="LINKEDIN"
                 profileUrl={linkedinUrl}
                 />
                <button onClick={() => {
                    setAboutMePage(false);
                    setHomePage(true)
                    setBotPosition("bot-showing-menu");
                    navigate("/")
                }} className="aboutme-return-button" type="button">Voltar</button>
            </div>
            }     
        </AboutMeContainer>
    );
}
