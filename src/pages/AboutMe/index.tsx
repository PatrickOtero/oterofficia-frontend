import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { AboutMeContainer } from "./AboutMe.style";
import profilePhoto from "./assets/profilePhoto.png"
import { DirectMessageSection } from "./SocialNetworks";
import { useSectionData } from "./hooks/useSectionData";
import { EmailSection } from "./EmailSection";

export const AboutMePage = () => {

    const {aboutMePage, setAboutMePage, setHomePage, setBotPosition, setEarthPosition, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState } = useBotFunctionsContext();

    const { profileDescription, profileDescription2, profileDescription3, profileDescription4, profileDescription5, profileDescription6, profileDescription7, profileDescription8, profileDescription9, profileDescription10, profileDescription11, profileDescription12 } = useSectionData()

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
                <div className="aboutme-section-info">
                    <img className="profile-photo" src={profilePhoto} alt="Minha foto deveria estar aqui"/>
                    <h1 className="aboutme-name">Patrick da Rocha Otero</h1>
                </div>
                <h1 className="aboutme-titles">Sobre mim</h1>
                <p className="profile-description">{profileDescription}</p>
                <p className="profile-description">{profileDescription2}</p>
                <p className="profile-description">{profileDescription3}</p>
                <p className="profile-description">{profileDescription4}</p>
                <p className="profile-description">{profileDescription5}</p>
                <p className="profile-description">{profileDescription6}</p>
                <p className="profile-description">{profileDescription7}</p>
                <p className="profile-description">{profileDescription8}</p>
                <p className="profile-description">{profileDescription9}</p>
                <p className="profile-description">{profileDescription10}</p>
                <p className="profile-description">{profileDescription11}</p>
                <p className="profile-description">{profileDescription12}</p>
                <ul>
                    <h1 className="aboutme-titles">Quais tecnologias tenho conhecimento?</h1>
                    <h2>Node (Javascript/Typescript)</h2>
                    <li>Express.js</li>
                    <li>Node-posgres</li>
                    <li>Knex.js</li>
                    <li>Jest</li>
                    <li>Secure-password</li>
                    <li>Bcrypt</li>
                    <li>Yup</li>
                    <li>Nodemailer</li>
                    <li>Swagger</li>
                    <li>Date-fns</li>
                    <h2>React (Javascript/Typescript)</h2>
                    <li>React-router-dom</li>
                    <li>React-use</li>
                    <li>Context-api</li>
                    <li>Jest</li>
                    <h2>SQL</h2>
                    <li>MySql</li>
                    <li>PostgreSQL</li>
                    <h2>Ferramentas</h2>
                    <li>Docker</li>
                </ul>
                 <DirectMessageSection/>
                 <EmailSection
                  setAboutMePage={setAboutMePage} setBotPosition={setBotPosition} setEarthPosition={setEarthPosition} setHomePage={setHomePage}/>
            </div>
            }     
        </AboutMeContainer>
    );
}
