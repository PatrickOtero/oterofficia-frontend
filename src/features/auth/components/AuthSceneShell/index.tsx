import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { useBotFunctionsContext } from "../../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../../hooks/useBotSceneActions";

type AuthSceneShellProps = {
  children: ReactNode;
};

const AuthSceneShellContainer = styled.section`
    @keyframes authSceneReveal {
        from {
            opacity: 0;
            transform: translate3d(-2rem, 1rem, 0) scale(0.985);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    position: relative;
    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: min(112rem, 92vw);
    min-height: min(86rem, calc(100vh - 4rem));
    padding-right: clamp(18rem, 20vw, 30rem);
    pointer-events: none;

    .auth-scene-panel {
        width: min(56rem, 100%);
        pointer-events: auto;
        animation: authSceneReveal 460ms cubic-bezier(0.16, 1, 0.22, 1);
    }

    @media (max-width: 900px) {
        width: min(112rem, 96vw);
        min-height: min(86rem, calc(100vh - 2rem));
        justify-content: center;
        padding-right: 0;

        .auth-scene-panel {
            width: min(56rem, 100%);
        }
    }
`;

export const AuthSceneShell = ({ children }: AuthSceneShellProps) => {
  const { authPage } = useBotFunctionsContext();
  const { openAuthScene } = useBotSceneActions();

  useEffect(() => {
    if (!authPage) {
      openAuthScene();
    }
  }, [authPage, openAuthScene]);

  return (
    <AuthSceneShellContainer>
      <div className="auth-scene-panel">{children}</div>
    </AuthSceneShellContainer>
  );
};
