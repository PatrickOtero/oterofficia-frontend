import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { aboutApi } from "../../features/about/api/aboutApi";
import { AboutPageRenderer } from "../../features/about/components/public/AboutPageRenderer";
import { AboutPage } from "../../features/about/types/about";
import { FeedbackState } from "../../features/studies/components/shared/FeedbackState";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";
import { AboutMeContainer } from "./AboutMe.style";
import { getApiErrorMessage } from "../../services/apiError";

export const AboutMePage = () => {
    const { aboutMePage } = useBotFunctionsContext();
    const { openAboutMeScene, showHomeMenu } = useBotSceneActions();
    const [page, setPage] = useState<AboutPage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
      if (!aboutMePage) {
        openAboutMeScene();
      }
    }, [aboutMePage, openAboutMeScene]);

    useEffect(() => {
      const loadPage = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
          const response = await aboutApi.fetchPublicPage();
          setPage(response);
        } catch (error) {
          setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar esta página."));
        } finally {
          setIsLoading(false);
        }
      };

      void loadPage();
    }, []);

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
                    {isLoading ? (
                      <FeedbackState
                        description="Montando a apresentação."
                        title="Carregando página"
                      />
                    ) : null}

                    {!isLoading && errorMessage ? (
                      <FeedbackState
                        description={errorMessage}
                        title="Falha ao carregar"
                        variant="error"
                      />
                    ) : null}

                    {!isLoading && !errorMessage && page ? <AboutPageRenderer page={page} /> : null}
                </div>
            )}
        </AboutMeContainer>
    );
};
