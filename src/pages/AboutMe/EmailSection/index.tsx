import { EmailContainer } from "./Email.style"


export const EmailSection = () => {
    return (
        <EmailContainer>
            <b className="email-section-title">Mensagem direta</b>
            <p>Se deseja me enviar uma mensagem por e-mail, poderá fazer isso direto pelos campos abaixo. Será um prazer ser contatado por você!</p>
            <div className="email-section-info-main">
                <div className="email-input-container">
                    <label>Insira seu e-mail</label>
                    <input type="email"/>
                </div>
                <div className="email-content-input-container">
                    <label>Insira o conteúdo da mensagem</label>
                    <textarea/>
                </div> 
            </div>            
        </EmailContainer>
    )
}