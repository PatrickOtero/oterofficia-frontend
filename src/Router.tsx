import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { BotContextProvider } from "./contexts/botFunctions";
import { DefaultLayout } from "./layouts/defaultLayout";
import { AboutMePage } from "./pages/AboutMe";
import { HomePage } from "./pages/Home";

export function Router() {
    const navigate = useNavigate(); 
    
    useEffect(() => {
        navigate("/")
      }, [])

    return (
        <BotContextProvider>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/aboutme" element={<AboutMePage/>}/>
                </Route>
            </Routes>
        </BotContextProvider>
    )
}