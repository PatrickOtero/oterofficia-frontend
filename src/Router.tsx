import { Route, Routes } from "react-router-dom";
import { BotContextProvider } from "./contexts/botFunctions";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { ContentLayout } from "./layouts/contentLayout";
import { DefaultLayout } from "./layouts/defaultLayout";
import { LoginPage } from "./pages/Auth/Login";
import { RegisterPage } from "./pages/Auth/Register";
import { AdminProjectEditorPage } from "./pages/Admin/ProjectEditor";
import { AdminProjectsDashboardPage } from "./pages/Admin/ProjectsDashboard";
import { AdminStudiesDashboardPage } from "./pages/Admin/StudiesDashboard";
import { AdminStudyEditorPage } from "./pages/Admin/StudyEditor";
import { AboutMePage } from "./pages/AboutMe";
import { HomePage } from "./pages/Home";
import { PortfolioPage } from "./pages/Portfolio";
import { StudiesPage } from "./pages/Studies";
import { StudyPostPage } from "./pages/StudyPost";

export function Router() {
    return (
        <BotContextProvider>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/aboutme" element={<AboutMePage/>}/>
                    <Route path="/portfolio" element={<PortfolioPage/>}/>
                </Route>
                <Route element={<ContentLayout />}>
                    <Route path="/studies" element={<StudiesPage />} />
                    <Route path="/studies/:slug" element={<StudyPostPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route element={<ProtectedRoute requireAdmin />}>
                        <Route path="/admin/studies" element={<AdminStudiesDashboardPage />} />
                        <Route path="/admin/studies/new" element={<AdminStudyEditorPage />} />
                        <Route path="/admin/studies/:id/edit" element={<AdminStudyEditorPage />} />
                        <Route path="/admin/projects" element={<AdminProjectsDashboardPage />} />
                        <Route path="/admin/projects/new" element={<AdminProjectEditorPage />} />
                        <Route path="/admin/projects/:id/edit" element={<AdminProjectEditorPage />} />
                    </Route>
                </Route>
            </Routes>
        </BotContextProvider>
    )
}