// components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
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
import { renderChatContent } from '@/helper/markdownChatHelper';
import { useChatbot } from '../hooks/useChatbot';

interface ChatbotProps {
  datasetId: string;
}

// Suggested questions
const suggestedQuestions = [
  "Berapa jumlah data mention?",
  "Brand mana yang memiliki sentimen positif tertinggi?",
  "Bagaimana performa engagement per sentimen?",
  "Kategori kuliner mana yang paling populer?"
];

// Component untuk merender HTML content dengan sanitasi
const HtmlContent: React.FC<{ content: string | null | undefined }> = ({ content }) => {
  return (
    <div className="html-content">
      {renderChatContent(content)}
    </div>
  );
};

const Chatbot: React.FC<ChatbotProps> = ({ datasetId }) => {
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    isTyping,
    sendMessage,
    clearChat,
    isLoading
  } = useChatbot(datasetId);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    sendMessage(question);
    setInputValue('');
  };

  // Enhanced: Open handler
  const handleOpen = () => {
    setIsOpen(true);
    // Auto-focus input after animation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
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
        className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col ${isMinimized ? 'h-auto' : 'h-[600px]'
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
            {/* Messages Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-4"
              style={{
                scrollBehavior: 'smooth',
                minHeight: 0
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''
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
                      <div className={`inline-block max-w-[85%] ${message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm'
                        : message.error
                          ? 'bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-sm'
                          : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                        } px-4 py-2`}>
                        {message.type === 'bot' && !message.error && message.content ? (
                          <HtmlContent content={message.content} />
                        ) : (
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content || 'Tidak ada pesan'}
                          </p>
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
                      disabled={isLoading}
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
                    disabled={isLoading}
                    maxLength={500}
                  />

                </div>
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  {isLoading ? (
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
                  disabled={isLoading}
                  title="Reset chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </form>

              {/* Enhanced Status Bar */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500">Online</span>
                  </div>
                  {isLoading && (
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