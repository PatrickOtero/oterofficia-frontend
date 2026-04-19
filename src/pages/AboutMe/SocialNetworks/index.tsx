import { DirectMessageContainer } from "./SocialNetworks.style"
import telegramImage from "../assets/telegramImage.png"
import whatsappImage from "../assets/whatsappImage.png"
import linkedinIcon from "../assets/linkedinIcon.png"
import githubIcon from "../assets/githubIcon.png"

export const DirectMessageSection = () => {
    return (
        <DirectMessageContainer>
            <b className="section-title">Redes sociais</b>
            <div className="section-info-main">
                <div className="img-container">
                        <a href="https://telegram.me/PatrickOtero" target="_blank" rel="noreferrer"><div className="img-filter">
                        </div></a>
                        <img src={telegramImage} alt="Telegram"/>
                    </div>
                    <div className="img-container">
                        <a href="https://wa.me/5521983036378" target="_blank" rel="noreferrer"><div className="img-filter">
                        </div></a>
                        <img src={whatsappImage} alt="WhatsApp"/>
                    </div>
                    <div className="img-container">
                        <a href="https://www.linkedin.com/in/patrick-da-rocha-otero/" target="_blank" rel="noreferrer"><div className="img-filter">
                        </div></a>
                        <img src={linkedinIcon} alt="LinkedIn"/>
                    </div>
                    <div className="img-container">
                        <a href="https://github.com/PatrickOtero" target="_blank" rel="noreferrer"><div className="img-filter">
                        </div></a>
                        <img src={githubIcon} alt="GitHub"/>
                    </div>                 
            </div>            
        </DirectMessageContainer>
    )
}
