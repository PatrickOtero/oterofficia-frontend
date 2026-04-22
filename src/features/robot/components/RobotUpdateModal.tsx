import { X } from "phosphor-react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { SiteVisitorSummary } from "../types/robotInsights";

type RobotUpdateModalProps = {
  isLoading: boolean;
  onClose: () => void;
  summary: SiteVisitorSummary | null;
};

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "Ainda sem leitura recente";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
  }).format(new Date(value));
};

const RobotUpdatePortal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 31;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    background: rgba(3, 10, 16, 0.68);
    backdrop-filter: blur(10px);

    .robot-update-shell {
        width: min(34rem, 100%);
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 1.6rem;
        border-radius: 2.2rem;
        border: 1px solid rgba(116, 214, 255, 0.18);
        background:
            linear-gradient(180deg, rgba(8, 21, 34, 0.96) 0%, rgba(6, 15, 25, 0.94) 100%);
        box-shadow:
            0 1.4rem 3.4rem rgba(0, 0, 0, 0.34),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
    }

    .robot-update-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    }

    .robot-update-title {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .robot-update-title span,
    .robot-update-footnote {
        color: rgba(171, 220, 242, 0.72);
        font-size: 1rem;
        line-height: 1.7;
    }

    .robot-update-title strong {
        color: rgba(236, 248, 255, 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.42rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .robot-update-close {
        width: 4rem;
        height: 4rem;
        min-width: 0;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgba(115, 206, 255, 0.16);
        background: rgba(10, 28, 42, 0.8);
        color: rgba(222, 245, 255, 0.92);
    }

    .robot-update-core {
        padding: 1.4rem;
        border-radius: 1.8rem;
        border: 1px solid rgba(110, 198, 255, 0.12);
        background:
            linear-gradient(180deg, rgba(14, 31, 46, 0.82) 0%, rgba(10, 18, 28, 0.86) 100%);
    }

    .robot-update-core strong {
        display: block;
        color: rgba(236, 248, 255, 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.6rem, 6vw, 3.6rem);
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .robot-update-core span {
        display: block;
        margin-top: 0.7rem;
        color: rgba(184, 228, 242, 0.86);
        font-size: 1.08rem;
        line-height: 1.7;
    }

    .robot-update-loading {
        color: rgba(186, 231, 255, 0.88);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
`;

export const RobotUpdateModal = ({ isLoading, onClose, summary }: RobotUpdateModalProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <RobotUpdatePortal onClick={onClose}>
      <div className="robot-update-shell" onClick={(event) => event.stopPropagation()}>
        <div className="robot-update-header">
          <div className="robot-update-title">
            <strong>Me atualize</strong>
            <span>Radar rapido do movimento no seu site.</span>
          </div>
          <button
            aria-label="Fechar atualizacao do robo"
            className="robot-update-close"
            onClick={onClose}
            type="button"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="robot-update-core">
          {isLoading ? (
            <span className="robot-update-loading">Consultando visitantes...</span>
          ) : summary ? (
            <>
              <strong>{summary.totalVisitors}</strong>
              <span>visitantes unicos ja entraram no seu site.</span>
            </>
          ) : (
            <>
              <strong>--</strong>
              <span>Nao consegui consultar os visitantes agora.</span>
            </>
          )}
        </div>

        <span className="robot-update-footnote">
          {summary
            ? `Ultima entrada detectada em ${formatDateTime(summary.lastVisitAt)}.`
            : "Esse contador comeca a valer a partir do rastreio atual."}
        </span>
      </div>
    </RobotUpdatePortal>,
    document.body
  );
};
