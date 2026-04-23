import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { useTouchDevice } from "../../../hooks/useTouchDevice";
import { ContentNavigationContainer } from "./contentNav.style";

export const ContentNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isTouchDevice = useTouchDevice();
    const { isAdmin } = useAuth();
    const { openContentScene, showHomeMenu } = useBotSceneActions();

    const isHomeActive = location.pathname === "/";

    if (isTouchDevice) {
        return null;
    }

    return (
        <ContentNavigationContainer className="content-topbar">
            <button
                className={`content-nav-button-link ${isHomeActive ? "active" : ""}`}
                onClick={() => {
                    showHomeMenu("content");
                    navigate("/");
                }}
                type="button"
            >
                Inicio
            </button>
            <NavLink
                className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
                onClick={() => openContentScene("content")}
                to="/studies"
            >
                Estudos
            </NavLink>
            {isAdmin ? (
                <NavLink
                    className={() =>
                        `content-nav-link ${location.pathname.startsWith("/admin") ? "active" : ""}`
                    }
                    onClick={() => openContentScene("content")}
                    to="/admin/studies"
                >
                    Painel
                </NavLink>
            ) : null}
        </ContentNavigationContainer>
    );
};
