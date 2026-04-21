import { PortfolioContainer } from "./Portfolio.style";
import { ProjectCarousel } from "./ProjectCarousel";

export const PortfolioPage = () => (
  <PortfolioContainer className="portfolio-page-main">
    <ProjectCarousel />
  </PortfolioContainer>
);
