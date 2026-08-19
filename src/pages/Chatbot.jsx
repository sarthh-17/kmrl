import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Paperclip, Terminal, Zap } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, Administrator! I am the KMRL Neural Dispatch Assistant. How can I assist your operations today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    'Check status of TR-101',
    'Generate daily passenger surge forecast',
    'List pending maintenance work orders',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate smart AI response based on query
    setTimeout(() => {
      let botReply = `Processed command regarding "${query}". All grid parameters are currently stable.`;
      if (query.toLowerCase().includes('tr-101')) {
        botReply = 'TR-101 is currently On Time on the Aluva to Petta route traveling at 52 km/h. Next stop: Palarivattom.';
      } else if (query.toLowerCase().includes('forecast') || query.toLowerCase().includes('surge')) {
        botReply = 'AI models predict a peak passenger surge of 3,950 individuals at 18:00 HRS. Additional capacity deployed.';
      } else if (query.toLowerCase().includes('maintenance')) {
        botReply = 'There are 2 pending high-priority work orders: TR-105 brake replacement and Escalator Motor Check at Aluva.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">KMRL Autonomous Assistant</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs text-slate-400 font-medium">Neural core online • Ready for commands</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-xl text-xs font-bold text-violet-300">
          <Sparkles size={14} /> v2.4 Live
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1"><Zap size={12}/> Quick Queries:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 bg-white hover:bg-violet-50 border border-slate-200 text-slate-700 hover:text-violet-700 rounded-xl text-xs font-semibold transition-all shrink-0 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-3">
          <button type="button" className="p-2.5 text-slate-400 hover:text-violet-600 transition-colors shrink-0">
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about train schedules, passenger loads, or anomalies..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
          />
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="p-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
      
    </div>
  );
}