import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContainer } from "./Email.style"
import emailjs from '@emailjs/browser';

interface IEmailSection {
    setAboutMePage: Dispatch<SetStateAction<boolean>>;
    setHomePage: Dispatch<SetStateAction<boolean>>;
    setBotPosition:Dispatch<SetStateAction<string>>;
    setEarthPosition:Dispatch<SetStateAction<string>>;
}

export const EmailSection = ({ setAboutMePage, setHomePage, setBotPosition, setEarthPosition }: IEmailSection) => {
    const [ emailSentMessage, setEmailSentMessage] = useState<string>("");

    useEffect(() => {
        setEmailSentMessage("")
    }, [])

    const navigate = useNavigate()

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: any) => {
      e.preventDefault();

      const currentForm = form.current;

      if (!currentForm) {
        setEmailSentMessage("Todos os campos são obrigatórios")
        return
      }
  
      emailjs.sendForm('service_g9nw9r3', 'template_2o86kex', currentForm, '4HGW9llpcLzGGPI3q')
        .then((result) => {
            console.log(result.text);
            setEmailSentMessage("Muito obrigado por entrar em contato!")
            e.target.reset()
        }, (error) => {
            console.log(error.text);
            setEmailSentMessage("Algo deu errado, tente novamente!")
        });
    };

    return (
        <EmailContainer>
            <b className="email-section-title">Mensagem direta</b>
            <p>Se deseja me enviar uma mensagem por e-mail, poderá fazer isso direto pelos campos abaixo. Será um prazer ser contatado por você!</p>
            <div className="email-section-info-main">
                <form ref={form} onSubmit={sendEmail}>
                <div className="name-input-container">
                        <label>Insira seu nome</label>
                        <input type="text" name="from_name"/>
                    </div>
                    <div className="email-input-container">
                        <label>Insira seu e-mail</label>
                        <input type="email" name="from_email"/>
                    </div>
                    <div className="email-content-input-container">
                        <label>Insira o conteúdo da mensagem</label>
                        <textarea name="message"/>
                    </div>
                    { emailSentMessage && <b className="email-section-messages">{emailSentMessage}</b>}
                    <div className="email-buttons-container">
                        <button className="email-send-button" type="submit">Enviar</button>

                        <button onClick={() => {
                            setAboutMePage(false);
                            setHomePage(true)
                            setBotPosition("bot-showing-menu");
                            setEarthPosition("")
                            navigate("/")
                        }} className="email-return-button" type="button">Voltar</button>
                    </div> 
                </form>
            </div>            
        </EmailContainer>
    )
}