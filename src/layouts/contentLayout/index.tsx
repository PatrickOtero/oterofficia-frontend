import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { PlanetEarth } from "../components/Earth";
import { Moon } from "../components/Moon";
import { SiteSign } from "../components/SiteSign";
import { StarsBackground } from "../components/StarsBackground";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ContentLayoutContainer } from "./styles";
import { GreetBot } from "../components/greetbot";

export const ContentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isAdmin, isLoading } = useAuth();
  const { earthPosition } = useBotFunctionsContext();
  const shouldShowAmbientBot =
    location.pathname.startsWith("/studies") || location.pathname.startsWith("/admin");

  const handleLogout = async () => {
    await logout();

    if (location.pathname.startsWith("/admin")) {
      navigate("/studies");
    }
  };

  return (
    <ContentLayoutContainer>
      <StarsBackground />
      <div className="planet-system">
        <Moon />
        <PlanetEarth earthPosition={earthPosition} />
      </div>

      <SiteSign forceVisible />
      {shouldShowAmbientBot ? <GreetBot beamTarget="content-menu" interactive={false} /> : null}

      <div className="content-topbar">
        <NavLink
          className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
          to="/studies"
        >
          Estudos
        </NavLink>
        {isAdmin ? (
          <NavLink
            className={() =>
              `content-nav-link ${location.pathname.startsWith("/admin") ? "active" : ""}`
            }
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
            >
              Entrar
            </NavLink>
            <NavLink
              className={({ isActive }) => `content-nav-link ${isActive ? "active" : ""}`}
              to="/register"
            >
              Cadastro
            </NavLink>
          </>
        ) : null}
        {user ? <span className="content-session-chip">{user.name}</span> : null}
        {user ? (
          <button className="content-nav-button" onClick={() => void handleLogout()} type="button">
            Sair
          </button>
        ) : null}
      </div>

      <main className="content-main">
        <Outlet />
      </main>
    </ContentLayoutContainer>
  );
};
