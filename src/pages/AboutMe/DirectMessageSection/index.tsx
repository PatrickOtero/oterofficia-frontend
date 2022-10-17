import { DirectMessageContainer } from "./DirectMessage.style"
import telegramImage from "../assets/telegramImage.png"
import whatsappImage from "../assets/whatsappImage.png"

export const DirectMessageSection = () => {
    return (
        <DirectMessageContainer>
            <b className="section-title">Mensagem direta</b>
            <div className="section-info-main">
                <div className="img-container">
                        <a href="https://telegram.me/PatrickOtero" target="blank"><div className="img-filter">
                        </div></a>
                        <img src={telegramImage} alt="section-image"/>
                    </div>
                    <div className="img-container">
                        <a href="https://wa.me/21983036378" target="blank"><div className="img-filter">
                        </div></a>
                        <img src={whatsappImage} alt="section-image"/>
                    </div>                  
            </div>            
        </DirectMessageContainer>
    )
}