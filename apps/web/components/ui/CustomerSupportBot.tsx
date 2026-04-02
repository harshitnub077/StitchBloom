"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomerSupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: "Hi there! Welcome to StitchBloom. How can we help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userMessage = input;
    setInput("");

    // Simulate bot response based on keywords
    setTimeout(() => {
        let botReply = "Thank you for reaching out! Our artisans are currently busy creating magic, but we'll get back to you shortly.";
        
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
            botReply = "We offer free pan-India shipping! Your handcrafted piece usually takes 5-7 business days to arrive.";
        } else if (lowerMsg.includes("custom") || lowerMsg.includes("order")) {
            botReply = "We love creating custom pieces! Please leave your email and requirements, and our master artisans will reach out.";
        } else if (lowerMsg.includes("return") || lowerMsg.includes("exchange")) {
            botReply = "We have a 7-day hassle-free return policy for unused items in their original packaging.";
        }

        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#1A4D3E] text-white rounded-full shadow-xl hover:bg-[#0B3028] hover:scale-105 transition-all duration-300"
        aria-label="Open Customer Support"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Header */}
            <div className="bg-[#1A4D3E] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-heading tracking-wide">StitchBloom Support</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] bg-[#FCFBF7] flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-[#1A4D3E] text-white self-end rounded-br-sm"
                      : "bg-white border border-primary/10 text-primary self-start rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-primary/10 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask us anything..."
                className="flex-1 px-4 py-2 bg-[#FCFBF7] border border-primary/10 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#1A4D3E]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-[#1A4D3E] text-white rounded-full hover:bg-[#0B3028] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
