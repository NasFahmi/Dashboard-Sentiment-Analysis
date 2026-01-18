// features/dashboard/chatbot/hooks/useChatbotMutation.ts
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardRepository } from "@/features/Dashboard/repository/dashboard.repository";
import type { ChatbotPayload, ChatbotResponse } from "../types/chatbot";

export const useChatbotMutation = (datasetId: string) => {
  const repo = DashboardRepository();

  return useMutation<ChatbotResponse, AxiosError, ChatbotPayload>({
    mutationFn: (payload) => repo.postChatbot(datasetId, payload),
  });
};
