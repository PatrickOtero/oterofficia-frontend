import { IAboutMeSection } from "../../../@Types/components/aboutMe/aboutMeSection";
import { SectionContainer } from "./Section.style";

export const AboutMeSection = ({ title, avatarUrl, profileName, profileBio, profileUrl}: IAboutMeSection) => {

    return (
        <SectionContainer>
            <b className="section-title">Perfil {title}</b>
            <div className="section-info-main">
                <div className="img-container">
                    <a href={profileUrl} target="blank"><div className="img-filter">
                    </div></a>
                    <img src={avatarUrl} alt="section-image"/>
                </div>
                <div className="section-name-and-description">
                    <b className="section-profile-name">{profileName}</b>
                    <p className="section-description">{profileBio}</p>
                </div>
            </div>
        </SectionContainer>
    );
}
