import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BotContextProvider } from "./contexts/botFunctions";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { ContentLayout } from "./layouts/contentLayout";
import { DefaultLayout } from "./layouts/defaultLayout";

const HomePage = lazy(() => import("./pages/Home").then((module) => ({ default: module.HomePage })));
const AboutMePage = lazy(() =>
  import("./pages/AboutMe").then((module) => ({ default: module.AboutMePage }))
);
const PortfolioPage = lazy(() =>
  import("./pages/Portfolio").then((module) => ({ default: module.PortfolioPage }))
);
const StudiesPage = lazy(() =>
  import("./pages/Studies").then((module) => ({ default: module.StudiesPage }))
);
const StudyPostPage = lazy(() =>
  import("./pages/StudyPost").then((module) => ({ default: module.StudyPostPage }))
);
const LoginPage = lazy(() =>
  import("./pages/Auth/Login").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("./pages/Auth/Register").then((module) => ({ default: module.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/Auth/ForgotPassword").then((module) => ({ default: module.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import("./pages/Auth/ResetPassword").then((module) => ({ default: module.ResetPasswordPage }))
);
const VerifyEmailPage = lazy(() =>
  import("./pages/Auth/VerifyEmail").then((module) => ({ default: module.VerifyEmailPage }))
);
const ConfirmEmailChangePage = lazy(() =>
  import("./pages/Auth/ConfirmEmailChange").then((module) => ({ default: module.ConfirmEmailChangePage }))
);
const ConfirmAccountDeletionPage = lazy(() =>
  import("./pages/Auth/ConfirmAccountDeletion").then((module) => ({
    default: module.ConfirmAccountDeletionPage,
  }))
);
const ProfilePage = lazy(() =>
  import("./pages/Profile").then((module) => ({ default: module.ProfilePage }))
);
const AdminStudiesDashboardPage = lazy(() =>
  import("./pages/Admin/StudiesDashboard").then((module) => ({
    default: module.AdminStudiesDashboardPage,
  }))
);
const AdminAboutEditorPage = lazy(() =>
  import("./pages/Admin/AboutEditor").then((module) => ({
    default: module.AdminAboutEditorPage,
  }))
);
const AdminStudyEditorPage = lazy(() =>
  import("./pages/Admin/StudyEditor").then((module) => ({ default: module.AdminStudyEditorPage }))
);
const AdminProjectsDashboardPage = lazy(() =>
  import("./pages/Admin/ProjectsDashboard").then((module) => ({
    default: module.AdminProjectsDashboardPage,
  }))
);
const AdminProjectEditorPage = lazy(() =>
  import("./pages/Admin/ProjectEditor").then((module) => ({
    default: module.AdminProjectEditorPage,
  }))
);

const RouteFallback = () => (
  <div
    style={{
      alignItems: "center",
      color: "rgba(209, 227, 242, 0.82)",
      display: "flex",
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: "1.2rem",
      inset: 0,
      justifyContent: "center",
      letterSpacing: "0.08em",
      position: "fixed",
      pointerEvents: "none",
      textTransform: "uppercase",
      zIndex: 4,
    }}
  >
    Carregando cena
  </div>
);

export function Router() {
  return (
    <BotContextProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<DefaultLayout />} path="/">
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutMePage />} path="/aboutme" />
            <Route element={<PortfolioPage />} path="/portfolio" />
          </Route>

          <Route element={<ContentLayout />}>
            <Route element={<StudiesPage />} path="/studies" />
            <Route element={<StudyPostPage />} path="/studies/:slug" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<ForgotPasswordPage />} path="/forgot-password" />
            <Route element={<ResetPasswordPage />} path="/reset-password" />
            <Route element={<VerifyEmailPage />} path="/verify-email" />
            <Route element={<ConfirmEmailChangePage />} path="/confirm-email-change" />
            <Route element={<ConfirmAccountDeletionPage />} path="/confirm-account-deletion" />

            <Route element={<ProtectedRoute />}>
              <Route element={<ProfilePage />} path="/profile" />
            </Route>

            <Route element={<ProtectedRoute requireAdmin />}>
              <Route element={<AdminAboutEditorPage />} path="/admin/about" />
              <Route element={<AdminStudiesDashboardPage />} path="/admin/studies" />
              <Route element={<AdminStudyEditorPage />} path="/admin/studies/new" />
              <Route element={<AdminStudyEditorPage />} path="/admin/studies/:id/edit" />
              <Route element={<AdminProjectsDashboardPage />} path="/admin/projects" />
              <Route element={<AdminProjectEditorPage />} path="/admin/projects/new" />
              <Route element={<AdminProjectEditorPage />} path="/admin/projects/:id/edit" />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BotContextProvider>
  );
}
