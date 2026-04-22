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
            <div className="site-sign-emblem" aria-hidden="true">
                <span className="site-sign-emblem-core" />
                <span className="site-sign-emblem-ring" />
            </div>
            <h1 className="site-sign-title">OTEROFFICIA</h1>
            <div className="site-sign-rule" />
        </SiteSignContainer>
    );
};
