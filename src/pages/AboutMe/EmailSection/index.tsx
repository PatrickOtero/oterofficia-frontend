import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContainer } from "./Email.style";
import { api } from "../../../services/axios";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";

export const EmailSection = () => {
    const { showHomeMenu } = useBotSceneActions();

    const [emailSentMessage, setEmailSentMessage] = useState<string>("");
    const [visitorName, setVisitorName] = useState<string>("");
    const [visitorEmail, setVisitorEmail] = useState<string>("");
    const [visitorSubject, setVisitorSubject] = useState<string>("");
    const [visitorEmailContent, setVisitorEmailContent] = useState<string>("");

    const handleReceiveEmail = async () => {
        setEmailSentMessage("");

        if (!visitorName.length) {
            setEmailSentMessage("Por favor, informe seu nome.");
            return;
        }

        if (!visitorEmail.length) {
            setEmailSentMessage("Por favor, informe seu e-mail.");
            return;
        }

        if (!visitorSubject.length) {
            setEmailSentMessage("Por favor, informe qual e o assunto do seu e-mail.");
            return;
        }

        if (!visitorEmailContent.length) {
            setEmailSentMessage("Por favor, insira um conteudo na sua mensagem.");
            return;
        }

        const body = {
            name: visitorName,
            email: visitorEmail,
            subject: visitorSubject,
            emailContent: visitorEmailContent,
        };

        try {
            const response = await api.post("/receiveEmail", body);

            setEmailSentMessage(response.data.message);
            setVisitorName("");
            setVisitorEmail("");
            setVisitorSubject("");
            setVisitorEmailContent("");
        } catch (error: any) {
            setEmailSentMessage(error.response.data.message);
        }
    };

    const navigate = useNavigate();

    return (
        <EmailContainer>
            <b className="email-section-title">Mensagem direta</b>
            <p>
                Se deseja me enviar uma mensagem por e-mail, podera fazer isso direto pelos
                campos abaixo. Sera um prazer ser contatado por voce!
            </p>
            <div className="email-section-info-main">
                <div className="name-input-container">
                    <label>Insira seu nome</label>
                    <input
                        type="text"
                        onChange={(e) => setVisitorName(e.target.value)}
                        value={visitorName}
                    />
                </div>
                <div className="email-input-container">
                    <label>Insira seu e-mail</label>
                    <input
                        type="email"
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        value={visitorEmail}
                    />
                </div>
                <div className="subject-input-container">
                    <label>Informe seu assunto</label>
                    <input
                        type="text"
                        onChange={(e) => setVisitorSubject(e.target.value)}
                        value={visitorSubject}
                    />
                </div>
                <div className="email-content-input-container">
                    <label>Insira o conteudo da mensagem</label>
                    <textarea
                        onChange={(e) => setVisitorEmailContent(e.target.value)}
                        value={visitorEmailContent}
                    />
                </div>
                {emailSentMessage.length > 0 && (
                    <b className="email-section-messages">{emailSentMessage}</b>
                )}
                <div className="email-buttons-container">
                    <button
                        onClick={() => {
                            showHomeMenu();
                            navigate("/");
                        }}
                        className="email-return-button"
                        type="button"
                    >
                        Voltar
                    </button>

                    <button
                        onClick={() => handleReceiveEmail()}
                        className="email-send-button"
                        type="button"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </EmailContainer>
    );
};
