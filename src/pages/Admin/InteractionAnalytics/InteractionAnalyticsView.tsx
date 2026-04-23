import {
  AdminInteractionAnalyticsData,
  InteractionAnalyticsSeriesPoint,
  InteractionAnalyticsUserRow,
} from "../../../features/studies/types/study";
import { AdminInteractionAnalyticsContainer } from "./InteractionAnalytics.style";
import {
  activityLabelMap,
  formatCompact,
  formatDate,
  getMaxFromMix,
  getMaxFromRows,
  getMaxFromSeries,
  getUserInitials,
} from "./InteractionAnalytics.utils";

type AdminInteractionAnalyticsViewProps = {
  analytics: AdminInteractionAnalyticsData;
};

type RankingCardProps = {
  description: string;
  getMetricLabel: (row: InteractionAnalyticsUserRow) => string;
  rows: InteractionAnalyticsUserRow[];
  title: string;
  valueSelector: (row: InteractionAnalyticsUserRow) => number;
};

const emptySeriesPoint: InteractionAnalyticsSeriesPoint = {
  comments: 0,
  label: "",
  likes: 0,
  reads: 0,
};

const RankingCard = ({
  description,
  getMetricLabel,
  rows,
  title,
  valueSelector,
}: RankingCardProps) => {
  const maxValue = getMaxFromRows(rows, valueSelector);

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

export const AdminInteractionAnalyticsView = ({
  analytics,
}: AdminInteractionAnalyticsViewProps) => {
  const maxSeriesValue = getMaxFromSeries(
    analytics.activitySeries.length ? analytics.activitySeries : [emptySeriesPoint]
  );
  const maxMixValue = getMaxFromMix(analytics.interactionMix);
  const socialActions =
    analytics.overview.totalComments +
    analytics.overview.totalReplies +
    analytics.overview.totalCommentLikes +
    analytics.overview.totalStudyLikes;

  return (
    <AdminInteractionAnalyticsContainer>
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
    </AdminInteractionAnalyticsContainer>
  );
};
