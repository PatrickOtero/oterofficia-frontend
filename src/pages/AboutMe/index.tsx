import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";
import { AboutMeContainer } from "./AboutMe.style";
import { DirectMessageSection } from "./SocialNetworks";
import { EmailSection } from "./EmailSection";
import { ProfileSection } from "./ProfileSection";

export const AboutMePage = () => {
    const {
        aboutMePage,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();

    const navigate = useNavigate();

    return (
        <AboutMeContainer>
            {aboutMePage && (
                <div className="aboutme-page-main">
                    <b
                        className="aboutme-close-button"
                        onClick={() => {
                            showHomeMenu();
                            navigate("/");
                        }}
                    >
                        X
                    </b>
                    <ProfileSection />
                    <DirectMessageSection />
                    <EmailSection />
                </div>
            )}
        </AboutMeContainer>
    );
};
