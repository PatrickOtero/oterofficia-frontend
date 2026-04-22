import { api } from "../../../services/axios";
import {
  RobotConversationReply,
  RobotConversationRequest,
} from "../types/robotConversation";

export const robotConversationApi = {
  async converse(payload: RobotConversationRequest) {
    const response = await api.post<RobotConversationReply>("/robot/converse", payload);
    return response.data;
  },
};
