import { api } from "../../../services/axios";
import {
  AdminInteractionAnalyticsData,
  CommentLikeResponse,
  CreateCommentResponse,
  LikeResponse,
  PublicStudiesResponse,
  StudyComment,
  StudyDashboardData,
  StudyDetail,
  StudyFormValues,
  StudyStatus,
  StudySummary,
} from "../types/study";

type AdminStudyFilters = {
  search?: string;
  status?: "all" | StudyStatus;
  category?: string;
};

type PublicStudyFilters = {
  search?: string;
  category?: string;
  tag?: string;
};

const sanitizeStudyPayload = (payload: StudyFormValues) => ({
  category: payload.category,
  content: payload.content.map((block) => ({
    data: block.data,
    type: block.type,
  })),
  coverImage: payload.coverImage || null,
  excerpt: payload.excerpt,
  readingTime: payload.readingTime,
  seoDescription: payload.seoDescription || null,
  seoTitle: payload.seoTitle || null,
  slug: payload.slug || undefined,
  status: payload.status,
  tags: payload.tags,
  title: payload.title,
});

export const studiesApi = {
  async createComment(postId: string, content: string, parentCommentId?: string | null) {
    const response = await api.post<CreateCommentResponse>(`/studies/${postId}/comments`, {
      content,
      parentCommentId: parentCommentId || null,
    });
    return response.data;
  },

  async createStudy(payload: StudyFormValues) {
    const response = await api.post<StudyDetail>("/admin/studies", sanitizeStudyPayload(payload));
    return response.data;
  },

  async deleteComment(commentId: string, isAdminRoute = false) {
    const url = isAdminRoute ? `/admin/studies/comments/${commentId}` : `/comments/${commentId}`;
    const response = await api.delete<{ commentsCount: number; postId: string }>(url);
    return response.data;
  },

  async deleteStudy(postId: string) {
    await api.delete(`/admin/studies/${postId}`);
  },

  async fetchAdminComments(postId?: string) {
    const response = await api.get<StudyComment[]>("/admin/studies/comments", {
      params: { postId },
    });

    return response.data;
  },

  async fetchAdminDashboard() {
    const response = await api.get<StudyDashboardData>("/admin/studies/dashboard");
    return response.data;
  },

  async fetchAdminInteractionAnalytics() {
    const response = await api.get<AdminInteractionAnalyticsData>("/admin/studies/analytics");
    return response.data;
  },

  async fetchAdminStudies(filters: AdminStudyFilters) {
    const response = await api.get<StudySummary[]>("/admin/studies", {
      params: filters,
    });

    return response.data;
  },

  async fetchAdminStudy(postId: string) {
    const response = await api.get<StudyDetail>(`/admin/studies/${postId}`);
    return response.data;
  },

  async fetchComments(postId: string) {
    const response = await api.get<StudyComment[]>(`/studies/${postId}/comments`);
    return response.data;
  },

  async fetchPublicStudies(filters: PublicStudyFilters) {
    const response = await api.get<PublicStudiesResponse>("/studies", {
      params: filters,
    });

    return response.data;
  },

  async fetchStudyBySlug(slug: string) {
    const response = await api.get<StudyDetail>(`/studies/${slug}`);
    return response.data;
  },

  async likeStudy(postId: string) {
    const response = await api.post<LikeResponse>(`/studies/${postId}/likes`);
    return response.data;
  },

  async likeComment(commentId: string) {
    const response = await api.post<CommentLikeResponse>(`/comments/${commentId}/likes`);
    return response.data;
  },

  async setStudyStatus(postId: string, status: StudyStatus) {
    const response = await api.patch<StudyDetail>(`/admin/studies/${postId}/status`, { status });
    return response.data;
  },

  async unlikeStudy(postId: string) {
    const response = await api.delete<LikeResponse>(`/studies/${postId}/likes`);
    return response.data;
  },

  async unlikeComment(commentId: string) {
    const response = await api.delete<CommentLikeResponse>(`/comments/${commentId}/likes`);
    return response.data;
  },

  async updateStudy(postId: string, payload: StudyFormValues) {
    const response = await api.put<StudyDetail>(
      `/admin/studies/${postId}`,
      sanitizeStudyPayload(payload)
    );
    return response.data;
  },
};
