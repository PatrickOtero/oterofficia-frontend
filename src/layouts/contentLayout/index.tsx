import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { PlanetEarth } from "../components/Earth";
import { Moon } from "../components/Moon";
import { SiteSign } from "../components/SiteSign";
import { StarsBackground } from "../components/StarsBackground";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ContentLayoutContainer } from "./styles";
import { GreetBot } from "../components/greetbot";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";

export const ContentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isAdmin, isLoading } = useAuth();
  const { earthPosition } = useBotFunctionsContext();
  const { openContentScene, showHomeMenu } = useBotSceneActions();
  const shouldShowAmbientBot = true;
  const beamTarget = location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/forgot-password") ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/verify-email") ||
    location.pathname.startsWith("/confirm-email-change") ||
    location.pathname.startsWith("/confirm-account-deletion") ||
    location.pathname.startsWith("/profile")
    ? "auth-panel"
    : "content-menu";

  const handleLogout = async () => {
    await logout();

    if (location.pathname.startsWith("/admin")) {
      navigate("/studies");
    }
  };

  const handleGoHome = () => {
    showHomeMenu("content");
    navigate("/");
  };

  return (
    <ContentLayoutContainer>
      <StarsBackground />
      <div className="planet-system">
        <Moon />
        <PlanetEarth earthPosition={earthPosition} />
      </div>

      <SiteSign forceVisible />
      {shouldShowAmbientBot ? <GreetBot beamTarget={beamTarget} interactive={false} /> : null}

      <div className="content-topbar">
        <button
          className={`content-nav-button-link ${location.pathname === "/" ? "active" : ""}`}
          onClick={handleGoHome}
          type="button"
        >
          Inicio
        </button>
        <NavLink
          className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
          to="/studies"
          onClick={() => openContentScene()}
        >
          Estudos
        </NavLink>
        {isAdmin ? (
          <NavLink
              className={() =>
                `content-nav-link ${location.pathname.startsWith("/admin") ? "active" : ""}`
              }
              onClick={() => openContentScene()}
              to="/admin/studies"
            >
              Painel
          </NavLink>
        ) : null}
        {!isLoading && !user ? (
          <>
            <NavLink
              className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
              to="/login"
              onClick={() => openContentScene()}
            >
              Entrar
            </NavLink>
            <NavLink
              className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
              to="/register"
              onClick={() => openContentScene()}
            >
              Cadastro
            </NavLink>
          </>
        ) : null}
        {user ? (
          <NavLink
            className={({ isActive }) =>
              `content-nav-link content-session-chip ${isActive ? "active" : ""}`
            }
            onClick={() => openContentScene()}
            to="/profile"
          >
            {user.name}
          </NavLink>
        ) : null}
        {user ? (
          <button className="content-nav-button" onClick={() => void handleLogout()} type="button">
            Sair
          </button>
        ) : null}
      </div>

      <main className="content-main">
        <div className={`content-stage ${location.pathname.startsWith("/admin") ? "panel-stage" : "study-stage"}`}>
          <Outlet />
        </div>
      </main>
    </ContentLayoutContainer>
  );
};
