import {
  AdminInteractionAnalyticsData,
  InteractionAnalyticsMixItem,
  InteractionAnalyticsRecentActivityItem,
  InteractionAnalyticsSeriesPoint,
  InteractionAnalyticsUserRow,
} from "../../../features/studies/types/study";

export const initialAnalytics: AdminInteractionAnalyticsData = {
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

export const formatCompact = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: value > 999 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);

export const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
      }).format(new Date(value))
    : "Sem registro";

export const activityLabelMap: Record<InteractionAnalyticsRecentActivityItem["kind"], string> = {
  comment_created: "Comentário",
  comment_like: "Curtida em comentário",
  comment_reply: "Resposta",
  study_like: "Curtida em publicação",
  study_view: "Leitura",
};

export const getUserInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

export const getMaxFromRows = (
  rows: InteractionAnalyticsUserRow[],
  selector: (row: InteractionAnalyticsUserRow) => number
) => Math.max(...rows.map(selector), 1);

export const getMaxFromSeries = (points: InteractionAnalyticsSeriesPoint[]) =>
  Math.max(...points.map((point) => Math.max(point.reads, point.comments, point.likes)), 1);

export const getMaxFromMix = (items: InteractionAnalyticsMixItem[]) =>
  Math.max(...items.map((item) => item.count), 1);
