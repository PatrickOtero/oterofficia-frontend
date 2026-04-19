import { SiteSignContainer } from "./styles";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";

type SiteSignProps = {
    forceVisible?: boolean;
};

export const SiteSign = ({ forceVisible = false }: SiteSignProps) => {
    const { aboutMePage, portfolioPage } = useBotFunctionsContext();

    const shouldShowSign = forceVisible || (!aboutMePage && !portfolioPage);

    if (!shouldShowSign) {
        return null;
    }

    return (
        <SiteSignContainer>
            <span className="site-sign-kicker">ORBITAL ARCHIVE</span>
            <h1 className="site-sign-title">OTEROFFICIA</h1>
            <div className="site-sign-rule" />
        </SiteSignContainer>
    );
};