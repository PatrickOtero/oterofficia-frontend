export type StudyStatus = "draft" | "published";

export type StudyBlockType =
  | "callout"
  | "code"
  | "divider"
  | "heading"
  | "image"
  | "list"
  | "paragraph"
  | "quote"
  | "references";

export interface StudyBlock {
  id?: string;
  type: StudyBlockType;
  position?: number;
  data: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudySummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  status: StudyStatus;
  category: string;
  tags: string[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
}

export interface StudyDetail extends StudySummary {
  content: StudyBlock[];
}

export interface StudyFilterOptions {
  categories: string[];
  tags: string[];
}

export interface PublicStudiesResponse {
  filters: StudyFilterOptions;
  posts: StudySummary[];
}

export interface StudyComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  parentCommentId: string | null;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  canDelete: boolean;
  likesCount: number;
  likedByCurrentUser: boolean;
  replies: StudyComment[];
  postTitle?: string;
}

export interface CreateCommentResponse {
  comment: StudyComment;
  commentsCount: number;
}

export interface CommentLikeResponse {
  commentId: string;
  likedByCurrentUser: boolean;
  likesCount: number;
}

export interface LikeResponse {
  likedByCurrentUser: boolean;
  likesCount: number;
  postId: string;
}

export interface StudyDashboardMetric {
  totalPosts: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  totalLikes: number;
  totalComments: number;
}

export interface StudyDashboardData {
  metrics: StudyDashboardMetric;
  recentPosts: StudySummary[];
  recentComments: Array<{
    id: string;
    content: string;
    createdAt: string;
    authorName: string;
    postId: string;
    postTitle: string;
  }>;
}

export interface StudyFormValues {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  status: StudyStatus;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  content: StudyBlock[];
  readingTime?: number;
}
