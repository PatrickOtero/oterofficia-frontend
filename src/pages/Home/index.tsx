import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { InitialMenu } from "./components/InitialMenu";
import { HomeContainer } from "./Home.style";

export const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { openAuthScene, openContentScene } = useBotSceneActions();
    const { homePage } = useBotFunctionsContext();

    return (
        <HomeContainer>
            {!homePage ? (
                <div className="home-access-dock">
                    <span className="home-access-label">
                        {isAuthenticated ? "Sessao ativa" : "Acesso rapido"}
                    </span>
                    {isAuthenticated ? <strong className="home-access-user">{user?.name}</strong> : null}
                    <div className="home-access-actions">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => {
                                        openContentScene();
                                        navigate("/profile");
                                    }}
                                    type="button"
                                >
                                    Perfil
                                </button>
                                <button
                                    className="secondary"
                                    onClick={() => {
                                        openContentScene();
                                        navigate("/studies");
                                    }}
                                    type="button"
                                >
                                    Estudos
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        openAuthScene();
                                        navigate("/login");
                                    }}
                                    type="button"
                                >
                                    Entrar
                                </button>
                                <button
                                    className="secondary"
                                    onClick={() => {
                                        openAuthScene();
                                        navigate("/register");
                                    }}
                                    type="button"
                                >
                                    Criar conta
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : null}

            {homePage ? <InitialMenu /> : null}
        </HomeContainer>
    );
};
