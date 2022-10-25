import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { AboutMeContainer } from "./AboutMe.style";
import { DirectMessageSection } from "./SocialNetworks";
import { EmailSection } from "./EmailSection";
import { ProfileSection } from "./ProfileSection";

export const AboutMePage = () => {

    const {aboutMePage, setAboutMePage, setHomePage, setBotPosition, setEarthPosition, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState } = useBotFunctionsContext();

    const navigate = useNavigate();

    return (
        <AboutMeContainer>           
            { aboutMePage &&
            <div className="aboutme-page-main">
                <b className="aboutme-close-button" onClick={() => {
                    setBotPosition("")
                    setEarthPosition("")
                    setAboutMePage(false)
                    setHomePage(false)
                    setHologramActivated(false);
                    setIsShowingMenu(false);
                    setInfoTextHolo(false);
                    setVisorPosition("visor-to-top");
                    setEyeState("")
                    navigate("/")
                }}>X</b>
                 <ProfileSection/>
                 <DirectMessageSection/>
                 <EmailSection/>
            </div>
            }     
        </AboutMeContainer>
    );
}
