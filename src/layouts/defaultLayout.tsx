import { Outlet } from "react-router-dom";
import { StarsBackground } from "../pages/Home/components/StarsBackground";
import { DefaultContainer } from "./default.style";

export function DefaultLayout() {

    return (
       <DefaultContainer>
            <StarsBackground/>
            <Outlet/>
       </DefaultContainer>
    )
}