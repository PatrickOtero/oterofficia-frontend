import { useEffect, useRef, useState } from "react";
import { X } from "phosphor-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { SiteSign } from "../components/SiteSign";
import { SceneBackdrop } from "../components/SceneBackdrop";
import { ContentLayoutContainer } from "./styles";
import { GreetBot } from "../components/greetbot";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";
import { useTouchDevice } from "../../hooks/useTouchDevice";

export const ContentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasInitializedScene = useRef(false);
  const isTouchDevice = useTouchDevice();
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const { earthPosition, sceneTransition } = useBotFunctionsContext();
  const { openContentScene, showHomeMenu } = useBotSceneActions();
  const shouldShowAmbientBot = true;
  const beamTarget = "content-panel";
  const shouldEnableOutsideDismiss =
    location.pathname.startsWith("/studies") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/profile");

  useEffect(() => {
    if (hasInitializedScene.current) {
      return;
    }

    hasInitializedScene.current = true;

    if (sceneTransition !== "home-to-content" && sceneTransition !== "menu-to-content") {
      openContentScene("content");
    }
  }, [openContentScene, sceneTransition]);

  const handleOutsideDismiss = () => {
    showHomeMenu("content");
    navigate("/");
  };

  return (
    <ContentLayoutContainer>
      {shouldEnableOutsideDismiss ? (
        <div
          className="layout-clickable-container"
          onClick={handleOutsideDismiss}
        />
      ) : null}

      <SceneBackdrop planetPosition={earthPosition} />

      <SiteSign forceVisible />
      {shouldShowAmbientBot ? (
        <GreetBot
          beamTarget={beamTarget}
          interactive={false}
          onConversationVisibilityChange={setIsConversationOpen}
        />
      ) : null}

      {isTouchDevice && isConversationOpen ? <div className="content-conversation-fade" /> : null}

      <main className={`content-main${isTouchDevice && isConversationOpen ? " conversation-active" : ""}`}>
        {shouldEnableOutsideDismiss ? (
          <button
            aria-label="Fechar painel e voltar para tela inicial"
            className="content-exit-button"
            onClick={handleOutsideDismiss}
            type="button"
          >
            <X size={18} weight="bold" />
          </button>
        ) : null}

        <div className={`content-stage ${location.pathname.startsWith("/admin") ? "panel-stage" : "study-stage"}`}>
          <Outlet />
        </div>
      </main>
    </ContentLayoutContainer>
  );
};
