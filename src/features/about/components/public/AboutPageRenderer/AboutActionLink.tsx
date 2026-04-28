import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AboutActionLinkProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  url?: string;
};

export const AboutActionLink = ({ children, className, disabled, url }: AboutActionLinkProps) => {
  if (!url || disabled) {
    return <span className={className}>{children}</span>;
  }

  if (url.startsWith("/")) {
    return (
      <Link className={className} to={url}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={url} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
};
