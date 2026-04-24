import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";

type UserDockAction = {
    active?: boolean;
    className?: string;
    id: string;
    label: string;
    onClick: () => void | Promise<void>;
};

type UserDockController = {
    actions: UserDockAction[];
    caption: string;
    closePanel: () => void;
    isAuthenticated: boolean;
    isPanelOpen: boolean;
    roleLabel: string | null;
    shortcutAction: UserDockAction | null;
    status: string;
    togglePanel: () => void;
    triggerLabel: string;
};

const AUTH_ROUTES = new Set(["/login", "/register"]);

export const useUserDockController = (): UserDockController => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, logout, user } = useAuth();
    const { homePage, isShowingMenu } = useBotFunctionsContext();
    const { openAuthScene, openContentScene, showHomeMenu } = useBotSceneActions();
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const isContentRoute =
        location.pathname.startsWith("/studies") ||
        location.pathname.startsWith("/profile") ||
        location.pathname.startsWith("/admin");

    const contentSceneOrigin = isContentRoute ? "content" : homePage && isShowingMenu ? "menu" : "home";

    useEffect(() => {
        setIsPanelOpen(false);
    }, [location.pathname]);

    const closePanel = () => {
        setIsPanelOpen(false);
    };

    const openLogin = () => {
        closePanel();
        openAuthScene();
        navigate("/login");
    };

    const openRegister = () => {
        closePanel();
        openAuthScene();
        navigate("/register");
    };

    const openProfile = () => {
        closePanel();
        openContentScene(contentSceneOrigin);
        navigate("/profile");
    };

    const openAdminPanel = () => {
        closePanel();
        openContentScene(contentSceneOrigin);
        navigate("/admin/studies");
    };

    const handleLogout = async () => {
        closePanel();
        await logout();
        showHomeMenu("content");
        navigate("/");
    };

    const actions: UserDockAction[] = isAuthenticated
        ? [
              {
                  active: location.pathname === "/profile",
                  id: "profile",
                  label: "Perfil",
                  onClick: openProfile,
              },
              {
                  className: "ghost",
                  id: "logout",
                  label: "Sair",
                  onClick: () => {
                      void handleLogout();
                  },
              },
          ]
        : [
              {
                  active: location.pathname === "/login",
                  id: "login",
                  label: "Entrar",
                  onClick: openLogin,
              },
              {
                  active: location.pathname === "/register",
                  className: "secondary",
                  id: "register",
                  label: "Cadastro",
                  onClick: openRegister,
              },
          ];
    const firstName = user?.name?.trim().split(/\s+/)[0] || "Conta";
    const shortcutAction =
        isAuthenticated && isAdmin
            ? {
                  active: location.pathname.startsWith("/admin"),
                  className: "admin",
                  id: "admin-shortcut",
                  label: "Painel",
                  onClick: openAdminPanel,
              }
            : null;

    return {
        actions,
        caption: isAuthenticated ? "Sessão ativa" : AUTH_ROUTES.has(location.pathname) ? "Acesso" : "Conta",
        closePanel,
        isAuthenticated,
        isPanelOpen,
        roleLabel: isAuthenticated ? (isAdmin ? "Administrador" : "Membro") : null,
        shortcutAction,
        status: isAuthenticated ? user?.name || "Usuário" : "Entrar ou cadastrar",
        togglePanel: () => {
            setIsPanelOpen((currentState) => !currentState);
        },
        triggerLabel: isAuthenticated ? firstName : "Acessar",
    };
};
