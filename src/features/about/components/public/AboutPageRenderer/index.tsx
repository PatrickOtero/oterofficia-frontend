import { useMemo } from "react";
import type { AboutPage } from "../../../types/about";
import { AboutContentBlock } from "./AboutContentBlock";
import { AboutHeroBlock } from "./AboutHeroBlock";
import { AboutRendererContainer } from "./AboutPageRenderer.style";

type AboutPageRendererProps = {
  interactive?: boolean;
  page: AboutPage;
};

export const AboutPageRenderer = ({ interactive = true, page }: AboutPageRendererProps) => {
  const heroBlock = page.blocks.find((block) => block.type === "hero");
  const orderedBlocks = useMemo(() => page.blocks.filter((block) => block.type !== "hero"), [page.blocks]);

  return (
    <AboutRendererContainer $preview={!interactive}>
      {heroBlock ? <AboutHeroBlock block={heroBlock} interactive={interactive} /> : null}

      <div className="about-grid">
        {orderedBlocks.map((block) => (
          <AboutContentBlock block={block} interactive={interactive} key={block.id} />
        ))}
      </div>
    </AboutRendererContainer>
  );
};
