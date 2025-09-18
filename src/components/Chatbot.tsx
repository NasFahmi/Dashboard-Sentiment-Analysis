// components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClient } from '@/lib/axios';
import axios from 'axios';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

// Types
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: string[];
  error?: boolean;
}

interface ChatRequest {
  question: string;
}

interface ChatResponse {
  answer: string;
  sources: string[];
}

// LocalStorage helper functions
const CHAT_HISTORY_KEY = 'sentinela_chat_history';
const MAX_HISTORY_LENGTH = 50; // Limit history to prevent localStorage overflow

const getChatHistoryFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error('Error loading chat history from localStorage:', error);
    return [];
  }
};

const saveChatHistoryToStorage = (messages: Message[]): void => {
  try {
    // Keep only recent messages to prevent storage overflow
    const recentMessages = messages.slice(-MAX_HISTORY_LENGTH);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(recentMessages));
  } catch (error) {
    console.error('Error saving chat history to localStorage:', error);
  }
};

const clearChatHistoryFromStorage = (): void => {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history from localStorage:', error);
  }
};

// API function
const sendChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await axiosClient.post<ChatResponse>('/rag/query', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
    throw new Error('Failed to send message');
  }
}

// Suggested questions
const suggestedQuestions = [
  "Berapa jumlah data mention?",
  "Brand mana yang memiliki sentimen positif tertinggi?",
  "Apa kata kunci negatif yang paling sering muncul?",
  "Bagaimana performa engagement per sentimen?",
  "Kategori kuliner mana yang paling populer?"
];

// Component untuk merender HTML content dengan sanitasi
// Fungsi untuk mengkonversi Markdown ke HTML
const convertMarkdownToHtml = (text: string): string => {
  // Konversi **bold** ke <strong>
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Konversi *italic* ke <em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Konversi bullet points dengan * ke <ul><li>
  html = html.replace(/^(\s*)\*\s+(.*?)(?=\n|$)/gm, '$1<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Konversi line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
};

// Component untuk merender HTML content dengan sanitasi
const HtmlContent: React.FC<{ content: string }> = ({ content }) => {
  const sanitizeAndParse = (html: string) => {
    // Konversi Markdown ke HTML terlebih dahulu
    const convertedHtml = convertMarkdownToHtml(html);
    
    // Sanitize HTML untuk keamanan
    const sanitized = DOMPurify.sanitize(convertedHtml, {
      ALLOWED_TAGS: [
        'strong', 'em', 'u', 'b', 'i', 
        'hr', 'br', 'p', 'div', 'span',
        'ul', 'ol', 'li'
      ],
      ALLOWED_ATTR: ['class', 'style']
    });
    
    // Parse HTML menjadi React elements
    return parse(sanitized);
  };

  return (
    <div className="html-content">
      {sanitizeAndParse(content)}
    </div>
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize with stored history or default welcome message
    const storedHistory = getChatHistoryFromStorage();
    if (storedHistory.length > 0) {
      return storedHistory;
    }
    return [
      {
        id: '1',
        type: 'bot',
        content: 'Halo! 👋 Nama saya Sentinela, saya adalah asisten analisis sentimen kuliner. Silakan tanyakan apa saja tentang data sentimen yang Anda miliki.',
        timestamp: new Date(),
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Use standard div ref for scroll container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveChatHistoryToStorage(messages);
  }, [messages]);

  // TanStack Query mutation
  const chatMutation = useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: sendChatMessage,
    onMutate: async (variables) => {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: variables.question,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      setInputValue('');
    },
    onSuccess: (data) => {
      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    },
    onError: () => {
      // Add error message
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

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !chatMutation.isPending) {
      chatMutation.mutate({ question: inputValue.trim() });
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!chatMutation.isPending) {
      setInputValue(question);
      chatMutation.mutate({ question });
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
    clearChatHistoryFromStorage();
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow z-50"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          height: isMinimized ? 'auto' : '600px'
        }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col ${
          isMinimized ? 'h-auto' : 'h-[600px]'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sentinela</h3>
                <p className="text-xs text-white/80">AI Assistant Analisis Sentimen</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area with custom scroll */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-4"
              style={{ 
                scrollBehavior: 'smooth',
                minHeight: 0 // Important for flexbox
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      }>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>

                    <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-[85%] ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm'
                          : message.error
                          ? 'bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-sm'
                          : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                      } px-4 py-2`}>
                        {/* Gunakan HtmlContent component untuk merender HTML */}
                        {message.type === 'bot' && !message.error ? (
                          <HtmlContent content={message.content} />
                        ) : (
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex-shrink-0">
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Pertanyaan yang disarankan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={chatMutation.isPending}
                      className="text-xs bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator className="flex-shrink-0" />

            {/* Input Area */}
            <div className="p-4 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ketik pertanyaan Anda..."
                    disabled={chatMutation.isPending}
                    className="pr-10"
                    maxLength={500}
                  />
                  {inputValue && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      {inputValue.length}/500
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={clearChat}
                  disabled={chatMutation.isPending}
                  title="Reset chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </form>

              {/* Status Bar */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500">Online</span>
                  </div>
                  {chatMutation.isPending && (
                    <Badge variant="secondary" className="text-xs">
                      Processing...
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Powered by AI
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;