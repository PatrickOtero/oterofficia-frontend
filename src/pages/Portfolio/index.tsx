import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { PortfolioContainer } from "./Portfolio.style";
import { ProjectCarousel } from "./ProjectCarousel";

export const PortfolioPage = () => {

    const { portfolioPage } = useBotFunctionsContext()

    return (
        <PortfolioContainer>
           {portfolioPage && <ProjectCarousel/>} 
        </PortfolioContainer>
    );
}