export type RobotConversationAction =
  | {
      id: string;
      kind: "prompt";
      label: string;
      prompt: string;
    }
  | {
      id: string;
      kind: "navigate";
      label: string;
      path: string;
    };

export type RobotConversationReply = {
  actions: RobotConversationAction[];
  intent: string;
  profile: "admin" | "user";
  reply: string;
};

export type RobotConversationNavigationEntry = {
  path: string;
  title?: string | null;
  visitedAt: string;
};

export type RobotConversationStudyContext = {
  category?: string | null;
  excerpt?: string | null;
  lastSeenAt: string;
  path: string;
  progress?: number | null;
  readingTime?: number | null;
  slug: string;
  tags?: string[];
  title?: string | null;
};

export type RobotConversationRequest = {
  currentPath?: string | null;
  currentStudySlug?: string | null;
  navigationContext?: {
    lastStudy?: RobotConversationStudyContext | null;
    recentRoutes?: RobotConversationNavigationEntry[];
  } | null;
  prompt?: string | null;
};
