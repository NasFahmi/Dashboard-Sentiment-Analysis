import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from "axios";
import { DashboardRepository } from "../repository/dashboard.repository.tsx1";
import type { ChatbotPayload, ChatbotResponse } from "../types/chatbot";

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  error?: boolean;
}

const MAX_HISTORY_LENGTH = 50;

export const useChatbot = (datasetId?: string) => {
  const repo = DashboardRepository();
  const CHAT_HISTORY_KEY = datasetId ? `sentinela_chat_history_${datasetId}` : 'sentinela_chat_history';
  const CHAT_STATE_KEY = datasetId ? `sentinela_chat_state_${datasetId}` : 'sentinela_chat_state';

  // Helper functions for LocalStorage
  const getChatHistoryFromStorage = (): Message[] => {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  };

  const saveChatHistoryToStorage = (updatedMessages: Message[]): void => {
    try {
      const recentMessages = updatedMessages.slice(-MAX_HISTORY_LENGTH);
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(recentMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const getChatStateFromStorage = () => {
    try {
      const stored = localStorage.getItem(CHAT_STATE_KEY);
      if (!stored) return { isOpen: false, isMinimized: false };
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading chat state:', error);
      return { isOpen: false, isMinimized: false };
    }
  };

  const saveChatStateToStorage = (open: boolean, minimized: boolean): void => {
    try {
      localStorage.setItem(CHAT_STATE_KEY, JSON.stringify({ isOpen: open, isMinimized: minimized }));
    } catch (error) {
      console.error('Error saving chat state:', error);
    }
  };

  // State
  const [chatState] = useState(() => getChatStateFromStorage());
  const [isOpen, setIsOpen] = useState(chatState.isOpen);
  const [isMinimized, setIsMinimized] = useState(chatState.isMinimized);

  const [messages, setMessages] = useState<Message[]>(() => {
    const storedHistory = getChatHistoryFromStorage();
    if (storedHistory.length > 0) return storedHistory;
    return [{
      id: '1',
      type: 'bot',
      content: 'Halo! 👋 Nama saya Sentinela, saya adalah asisten analisis sentimen kuliner. Silakan tanyakan apa saja tentang data sentimen yang Anda miliki.',
      timestamp: new Date(),
    }];
  });

  const [isTyping, setIsTyping] = useState(false);

  // Effects
  useEffect(() => {
    saveChatStateToStorage(isOpen, isMinimized);
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveChatHistoryToStorage(messages);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Mutation
  const mutation = useMutation<ChatbotResponse, AxiosError, ChatbotPayload>({
    mutationFn: (payload) => repo.postChatbot(datasetId, payload),
    onMutate: async (variables) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: variables.question,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
    },
    onSuccess: (data) => {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: data.data,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    },
    onError: () => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi.',
        timestamp: new Date(),
        error: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    },
  });

  // Actions
  const sendMessage = (question: string) => {
    if (question.trim() && !mutation.isPending) {
      mutation.mutate({ question: question.trim() });
    }
  };

  const clearChat = () => {
    const resetMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: 'Chat telah direset. Ada yang bisa saya bantu?',
      timestamp: new Date(),
    };
    setMessages([resetMessage]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
    localStorage.removeItem(CHAT_STATE_KEY);
  };

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    isTyping,
    sendMessage,
    clearChat,
    isLoading: mutation.isPending
  };
};
