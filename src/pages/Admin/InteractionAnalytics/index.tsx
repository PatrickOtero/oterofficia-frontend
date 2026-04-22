import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { studiesApi } from "../../../features/studies/api/studiesApi";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import {
  AdminInteractionAnalyticsData,
  InteractionAnalyticsMixItem,
  InteractionAnalyticsRecentActivityItem,
  InteractionAnalyticsSeriesPoint,
  InteractionAnalyticsUserRow,
} from "../../../features/studies/types/study";
import {
  orbitalPanelCss,
  scrollableContentCss,
  surfaceCardCss,
} from "../../../features/studies/utils/styleMixins";

const AdminInteractionAnalyticsContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    padding: 2rem;

    .analytics-hero {
        ${surfaceCardCss};
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(26rem, 0.7fr);
        gap: 1.6rem;
        padding: 2rem;
        overflow: hidden;
    }

    .analytics-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .analytics-eyebrow,
    .analytics-kicker {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .analytics-title {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.4rem, 4vw, 4rem);
        line-height: 1.04;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .analytics-description {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.32rem;
        line-height: 1.8;
        max-width: 62rem;
    }

    .analytics-hero-highlight {
        position: relative;
        border-radius: 2.2rem;
        padding: 1.8rem;
        background:
            radial-gradient(circle at top right, rgba(118, 206, 255, 0.16), transparent 42%),
            linear-gradient(180deg, rgba(9, 26, 38, 0.92) 0%, rgba(8, 18, 28, 0.86) 100%);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        justify-content: space-between;
    }

    .analytics-hero-highlight strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(3.2rem, 6vw, 5rem);
        letter-spacing: 0.06em;
    }

    .analytics-hero-highlight p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.18rem;
        line-height: 1.7;
    }

    .analytics-metrics-grid,
    .analytics-ranking-grid {
        display: grid;
        gap: 1.2rem;
    }

    .analytics-metrics-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .analytics-ranking-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .analytics-metric-card,
    .analytics-panel-card,
    .analytics-ranking-card {
        ${surfaceCardCss};
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }

    .analytics-metric-card strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 2.2rem;
        letter-spacing: 0.06em;
    }

    .analytics-metric-card span {
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.96rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .analytics-metric-card p {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 1.02rem;
        line-height: 1.6;
    }

    .analytics-detail-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(24rem, 0.8fr);
        gap: 1.2rem;
        align-items: start;
    }

    .analytics-panel-card h3,
    .analytics-ranking-card h3 {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.22rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .analytics-panel-card p,
    .analytics-ranking-card p {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 1.05rem;
        line-height: 1.65;
    }

    .series-chart {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
        gap: 1rem;
        align-items: end;
        min-height: 24rem;
    }

    .series-column {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        align-items: center;
    }

    .series-bars {
        width: 100%;
        min-height: 20rem;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 0.44rem;
    }

    .series-bar {
        width: 1.25rem;
        border-radius: 999px 999px 0 0;
        transition: transform 180ms ease, opacity 180ms ease;
    }

    .series-column:hover .series-bar {
        transform: translateY(-0.18rem);
    }

    .series-bar.reads {
        background: linear-gradient(180deg, rgba(125, 218, 255, 0.96) 0%, rgba(72, 148, 255, 0.78) 100%);
        box-shadow: 0 0 1rem rgba(112, 206, 255, 0.18);
    }

    .series-bar.comments {
        background: linear-gradient(180deg, rgba(188, 148, 255, 0.96) 0%, rgba(132, 82, 255, 0.72) 100%);
    }

    .series-bar.likes {
        background: linear-gradient(180deg, rgba(128, 255, 220, 0.94) 0%, rgba(42, 184, 168, 0.72) 100%);
    }

    .series-meta {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        align-items: center;
    }

    .series-meta strong {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: 1rem;
    }

    .series-meta span {
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.84rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .mix-list,
    .ranking-list,
    .recent-activity-list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }

    .mix-item,
    .ranking-item,
    .recent-activity-item {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        padding: 1rem 1.1rem;
        border-radius: 1.6rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.1);
        background: rgba(10, 24, 37, 0.7);
    }

    .mix-header,
    .ranking-item-header,
    .recent-activity-item-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
    }

    .mix-header strong,
    .ranking-item-header strong,
    .recent-activity-item-header strong {
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 1.02rem;
        line-height: 1.5;
    }

    .mix-header span,
    .ranking-item-header span,
    .recent-activity-item-header span {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .mix-bar-track,
    .ranking-bar-track {
        width: 100%;
        height: 0.72rem;
        border-radius: 999px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.06);
    }

    .mix-bar-fill,
    .ranking-bar-fill {
        height: 100%;
        border-radius: 999px;
    }

    .mix-bar-fill {
        background: linear-gradient(90deg, rgba(123, 214, 255, 0.9) 0%, rgba(154, 110, 255, 0.72) 100%);
    }

    .ranking-bar-fill {
        background: linear-gradient(90deg, rgba(126, 214, 255, 0.94) 0%, rgba(61, 159, 255, 0.72) 100%);
    }

    .ranking-item-body {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: center;
    }

    .ranking-avatar {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background:
            radial-gradient(circle at 30% 30%, rgba(218, 245, 255, 0.2), transparent 30%),
            linear-gradient(180deg, rgba(35, 65, 98, 0.84) 0%, rgba(11, 23, 38, 0.96) 100%);
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .ranking-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .ranking-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .ranking-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
    }

    .ranking-stat-pill {
        padding: 0.3rem 0.65rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
        background: rgba(var(--scene-accent-rgb), 0.06);
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.82rem;
        letter-spacing: 0.07em;
        text-transform: uppercase;
    }

    .recent-activity-item p {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1rem;
        line-height: 1.65;
    }

    @media (max-width: 1200px) {
        .analytics-hero,
        .analytics-detail-grid,
        .analytics-ranking-grid {
            grid-template-columns: 1fr;
        }

        .analytics-metrics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 900px) {
        padding: 1.4rem;

        .analytics-hero,
        .analytics-panel-card,
        .analytics-ranking-card,
        .analytics-metric-card {
            padding: 1.3rem;
        }

        .analytics-metrics-grid {
            grid-template-columns: 1fr;
        }
    }
`;

const initialAnalytics: AdminInteractionAnalyticsData = {
  activitySeries: [],
  interactionMix: [],
  overview: {
    totalCommentLikes: 0,
    totalComments: 0,
    totalEvents: 0,
    totalReads: 0,
    totalReplies: 0,
    totalStudyLikes: 0,
    trackedUsers: 0,
  },
  recentActivity: [],
  topCommenters: [],
  topLikers: [],
  topReaders: [],
  topUsers: [],
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: value > 999 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
      }).format(new Date(value))
    : "Sem registro";

const activityLabelMap: Record<InteractionAnalyticsRecentActivityItem["kind"], string> = {
  comment_created: "Comentario",
  comment_like: "Curtida em comentario",
  comment_reply: "Resposta",
  study_like: "Curtida em publicacao",
  study_view: "Leitura",
};

const getUserInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const getMaxFromRows = (
  rows: InteractionAnalyticsUserRow[],
  selector: (row: InteractionAnalyticsUserRow) => number
) => Math.max(...rows.map(selector), 1);

const getMaxFromSeries = (points: InteractionAnalyticsSeriesPoint[]) =>
  Math.max(...points.map((point) => Math.max(point.reads, point.comments, point.likes)), 1);

const getMaxFromMix = (items: InteractionAnalyticsMixItem[]) =>
  Math.max(...items.map((item) => item.count), 1);

type RankingCardProps = {
  description: string;
  getMetricLabel: (row: InteractionAnalyticsUserRow) => string;
  rows: InteractionAnalyticsUserRow[];
  title: string;
  valueSelector: (row: InteractionAnalyticsUserRow) => number;
};

const RankingCard = ({
  description,
  getMetricLabel,
  rows,
  title,
  valueSelector,
}: RankingCardProps) => {
  const maxValue = useMemo(() => getMaxFromRows(rows, valueSelector), [rows, valueSelector]);

  return (
    <div className="analytics-ranking-card">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="ranking-list">
        {rows.map((row) => (
          <div className="ranking-item" key={row.userId}>
            <div className="ranking-item-body">
              <span className="ranking-avatar">
                {row.avatarUrl ? (
                  <img alt={row.name} loading="lazy" src={row.avatarUrl} />
                ) : (
                  getUserInitials(row.name)
                )}
              </span>

              <div className="ranking-details">
                <div className="ranking-item-header">
                  <strong>{row.name}</strong>
                  <span>{getMetricLabel(row)}</span>
                </div>
                <div className="ranking-bar-track">
                  <div
                    className="ranking-bar-fill"
                    style={{ width: `${(valueSelector(row) / maxValue) * 100}%` }}
                  />
                </div>
                <div className="ranking-stats">
                  <span className="ranking-stat-pill">{row.reads} leituras</span>
                  <span className="ranking-stat-pill">{row.comments + row.replies} comentarios</span>
                  <span className="ranking-stat-pill">{row.studyLikes + row.commentLikes} curtidas</span>
                  <span className="ranking-stat-pill">{row.role === "admin" ? "admin" : "user"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminInteractionAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AdminInteractionAnalyticsData>(initialAnalytics);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await studiesApi.fetchAdminInteractionAnalytics();
        setAnalytics(response);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Nao foi possivel carregar a telemetria de interacao.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadAnalytics();
  }, []);

  const maxSeriesValue = useMemo(
    () => getMaxFromSeries(analytics.activitySeries.length ? analytics.activitySeries : [{ comments: 0, label: "", likes: 0, reads: 0 }]),
    [analytics.activitySeries]
  );
  const maxMixValue = useMemo(() => getMaxFromMix(analytics.interactionMix), [analytics.interactionMix]);

  const socialActions = analytics.overview.totalComments + analytics.overview.totalReplies + analytics.overview.totalCommentLikes + analytics.overview.totalStudyLikes;

  return (
    <AdminInteractionAnalyticsContainer>
      <AdminSectionTabs />

      {isLoading ? (
        <FeedbackState description="Os sinais de leitura, comentarios e curtidas estao sendo agregados." title="Carregando analiticos" />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar analiticos" variant="error" />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <div className="analytics-hero">
            <div className="analytics-hero-copy">
              <span className="analytics-eyebrow">Painel comportamental</span>
              <h1 className="analytics-title">Mapa vivo da interacao dos usuarios</h1>
              <p className="analytics-description">
                Aqui fica o pulso do site: quem le com frequencia, quem comenta mais, quem distribui curtidas e
                como a conversa cresce em volta das publicacoes.
              </p>
              <span className="analytics-kicker">
                {analytics.overview.totalEvents} eventos rastreados desde a ativacao deste modulo
              </span>
            </div>

            <div className="analytics-hero-highlight">
              <span className="analytics-eyebrow">Usuarios engajados</span>
              <strong>{formatCompact(analytics.overview.trackedUsers)}</strong>
              <p>
                Pessoas autenticadas que ja leram, curtiram ou conversaram nas suas publicacoes. O destaque abaixo
                mistura profundidade de leitura com sinais sociais.
              </p>
            </div>
          </div>

          <div className="analytics-metrics-grid">
            <div className="analytics-metric-card">
              <span>Leituras rastreadas</span>
              <strong>{formatCompact(analytics.overview.totalReads)}</strong>
              <p>Visualizacoes autenticadas em estudos, com controle para nao inflar recargas seguidas.</p>
            </div>
            <div className="analytics-metric-card">
              <span>Comentarios e respostas</span>
              <strong>{formatCompact(analytics.overview.totalComments + analytics.overview.totalReplies)}</strong>
              <p>Conversas iniciadas e continuadas dentro das publicacoes.</p>
            </div>
            <div className="analytics-metric-card">
              <span>Curtidas sociais</span>
              <strong>{formatCompact(analytics.overview.totalStudyLikes + analytics.overview.totalCommentLikes)}</strong>
              <p>Somatorio de curtidas em publicacoes e em comentarios.</p>
            </div>
            <div className="analytics-metric-card">
              <span>Eventos totais</span>
              <strong>{formatCompact(analytics.overview.totalEvents)}</strong>
              <p>Volume consolidado da atividade registrada para leitura, conversa e reacao.</p>
            </div>
          </div>

          <div className="analytics-detail-grid">
            <div className="analytics-panel-card">
              <h3>Ritmo dos ultimos dias</h3>
              <p>Leituras, comentarios e curtidas distribuidas em uma linha temporal curta para revelar picos recentes.</p>

              <div className="series-chart">
                {analytics.activitySeries.map((point) => (
                  <div className="series-column" key={point.label}>
                    <div className="series-bars">
                      <span className="series-bar reads" style={{ height: `${(point.reads / maxSeriesValue) * 18}rem` }} />
                      <span className="series-bar comments" style={{ height: `${(point.comments / maxSeriesValue) * 18}rem` }} />
                      <span className="series-bar likes" style={{ height: `${(point.likes / maxSeriesValue) * 18}rem` }} />
                    </div>
                    <div className="series-meta">
                      <strong>{point.label}</strong>
                      <span>{point.reads + point.comments + point.likes} sinais</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-panel-card">
              <h3>Composicao da interacao</h3>
              <p>Qual tipo de gesto domina a experiencia hoje e como o peso da leitura conversa com a reacao social.</p>

              <div className="mix-list">
                {analytics.interactionMix.map((item) => (
                  <div className="mix-item" key={item.kind}>
                    <div className="mix-header">
                      <strong>{item.label}</strong>
                      <span>{formatCompact(item.count)}</span>
                    </div>
                    <div className="mix-bar-track">
                      <div className="mix-bar-fill" style={{ width: `${(item.count / maxMixValue) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="analytics-ranking-grid">
            <RankingCard
              description="Quem mais gera movimento somando leitura, conversa e reacao."
              getMetricLabel={(row) => `${row.totalInteractions} interacoes`}
              rows={analytics.topUsers}
              title="Motores da comunidade"
              valueSelector={(row) => row.totalInteractions}
            />
            <RankingCard
              description="Perfis que mais avancam pelas publicacoes e mantem frequencia de leitura."
              getMetricLabel={(row) => `${row.reads} leituras`}
              rows={analytics.topReaders}
              title="Leitores mais ativos"
              valueSelector={(row) => row.reads}
            />
            <RankingCard
              description="Quem mais puxa ou sustenta conversa com comentarios e respostas."
              getMetricLabel={(row) => `${row.comments + row.replies} comentarios`}
              rows={analytics.topCommenters}
              title="Quem mais conversa"
              valueSelector={(row) => row.comments + row.replies}
            />
            <RankingCard
              description="Perfis que mais distribuem sinais de aprovacao entre posts e comentarios."
              getMetricLabel={(row) => `${row.studyLikes + row.commentLikes} curtidas`}
              rows={analytics.topLikers}
              title="Quem mais curte"
              valueSelector={(row) => row.studyLikes + row.commentLikes}
            />
          </div>

          <div className="analytics-panel-card">
            <h3>Atividade recente</h3>
            <p>
              Ultimos movimentos registrados no site, misturando leitura, curtidas e conversa para ajudar a enxergar
              contexto e timing.
            </p>

            <div className="recent-activity-list">
              {analytics.recentActivity.map((item) => (
                <div className="recent-activity-item" key={item.id}>
                  <div className="recent-activity-item-header">
                    <strong>{item.actorName}</strong>
                    <span>{activityLabelMap[item.kind]}</span>
                  </div>
                  <p>
                    {item.postTitle
                      ? `${item.actorName} gerou um evento do tipo "${activityLabelMap[item.kind].toLowerCase()}" em "${item.postTitle}".`
                      : `${item.actorName} gerou um evento do tipo "${activityLabelMap[item.kind].toLowerCase()}".`}
                  </p>
                  <div className="ranking-stats">
                    <span className="ranking-stat-pill">{item.actorRole === "admin" ? "admin" : "user"}</span>
                    <span className="ranking-stat-pill">{formatDate(item.createdAt)}</span>
                    {item.postTitle ? <span className="ranking-stat-pill">{item.postTitle}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-panel-card">
            <h3>Leitura rapida</h3>
            <p>
              Hoje voce tem {analytics.overview.trackedUsers} usuarios rastreados, {socialActions} acoes sociais e um
              volume de {analytics.overview.totalReads} leituras autenticadas distribuido entre as suas publicacoes.
            </p>
          </div>
        </>
      ) : null}
    </AdminInteractionAnalyticsContainer>
  );
};
