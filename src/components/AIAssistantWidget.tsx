/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Clock, 
  Calendar, 
  FileText, 
  HeartHandshake, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: 'Horarios de atención', query: '¿Cuáles son los horarios de atención de emergencias y consulta externa?' },
  { label: 'Exámenes de Ecografía', query: '¿Cómo puedo consultar mis exámenes de ecografía y cuáles son los requisitos de preparación?' },
  { label: 'Servicios médicos', query: '¿Qué servicios y especialidades médicas atienden en el Centro de Salud?' },
  { label: 'Agendar cita', query: '¿Cómo puedo agendar una cita médica para consulta externa?' },
  { label: 'Resultados de laboratorio', query: '¿Cómo puedo consultar o descargar mis resultados de exámenes de laboratorio?' },
  { label: '¿Tiene costo?', query: '¿Los servicios, consultas y medicinas de farmacia son gratuitos?' },
  { label: 'Parto humanizado', query: '¿Qué facilidades ofrecen para parto y atención a mujeres embarazadas?' },
];

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: '¡Hola! Soy tu **Asistente Virtual con IA** del **Centro de Salud Tipo C Rioverde** 🌿.\n\nPuedo orientarte de inmediato sobre nuestros horarios, especialidades médicas, turnos, laboratorio clínico y farmacia gratuita.\n\n¿En qué te puedo ayudar hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Error de conexión');
      }

      const data = await response.json();
      const botReply = data.reply || 'No pude procesar tu consulta en este momento. Por favor acude a admisión o escribe al WhatsApp oficial.';

      const botMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Hubo un inconveniente temporal para conectar con el asistente. Recuerda que puedes comunicarte al WhatsApp oficial **096 117 1171** o acudir directamente al Centro de Salud.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: '¡Conversación reiniciada! Soy tu **Asistente Virtual con IA** del **Centro de Salud Tipo C Rioverde**. ¿Qué otra consulta tienes?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Simple Markdown Formatter for bold and bullet lists
  const renderFormattedText = (rawText: string) => {
    return rawText.split('\n').map((line, idx) => {
      // Bullet list item
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 text-xs sm:text-sm">
            <span className="text-emerald-600 font-bold shrink-0">•</span>
            <span>{renderInlineBold(content)}</span>
          </div>
        );
      }
      // Numbered list item
      const numMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 text-xs sm:text-sm">
            <span className="text-emerald-700 font-bold shrink-0">{numMatch[1]}.</span>
            <span>{renderInlineBold(numMatch[2])}</span>
          </div>
        );
      }
      // Blank line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="my-1 text-xs sm:text-sm leading-relaxed">
          {renderInlineBold(line)}
        </p>
      );
    });
  };

  const renderInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-2 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/90 text-white text-xs font-semibold rounded-full shadow-lg border border-emerald-400/50 backdrop-blur-md pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>¿Preguntas sobre horarios o citas?</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual con IA'}
          className={`relative group flex items-center justify-center p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-slate-800 text-white hover:bg-slate-900 scale-95'
              : 'bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 text-white hover:scale-105 active:scale-95 ring-4 ring-emerald-500/20 shadow-emerald-900/30'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-pulse" />
            </>
          )}

          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -left-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-bold text-white items-center justify-center">1</span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[420px] max-w-[420px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden text-left"
            role="dialog"
            aria-modal="true"
            aria-label="Ventana de chat con Asistente Virtual"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-400/80 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-emerald-200" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-950 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                      SaludBot Rioverde
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-300">
                      · IA
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 font-medium">
                    Atención y Orientación 24/7
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reiniciar chat"
                  className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Reiniciar conversación"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Cerrar ventana"
                  className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body: Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="leading-relaxed">{msg.text}</p>
                    ) : (
                      <div className="text-slate-800">
                        {renderFormattedText(msg.text)}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-3 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                  </div>
                  <span className="font-medium text-slate-600">Consultando información oficial...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Functional Interactive Buttons) */}
            <div className="px-4 py-2.5 bg-slate-100/90 border-t border-slate-200/80 shrink-0">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Consultas sugeridas:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(prompt.query)}
                    disabled={isLoading}
                    className="shrink-0 px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white border-t border-slate-200/80 shrink-0"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregunta sobre servicios, horarios o citas..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Enviar pregunta"
                  className="p-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Asistente con IA de orientación. En urgencia vital acude a Emergencias 24h.</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
