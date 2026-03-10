import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const socket = io('http://localhost:5000');

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off('receive_message');
  }, []);

  const handleSendMessage = (text) => {
    if (text.trim()) socket.emit('send_message', { text });
  };

  return (
    <div className={`fixed bottom-0 right-5 w-80 bg-white shadow-2xl rounded-t-xl border border-gray-200 transition-all duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'h-[450px]' : 'h-12'}`}>
      
      <div 
        className="flex items-center justify-between px-4 h-12 cursor-pointer hover:bg-gray-50 rounded-t-xl border-b border-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <span className="font-semibold text-gray-700 text-sm">Chatbox</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <button className="p-1 hover:bg-gray-200 rounded">···</button>
          <button className="p-1 hover:bg-gray-200 rounded">
            {isOpen ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {/* Body & Input (Only visible when open) */}
      {isOpen && (
        <>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <MessageList messages={messages} />
          </div>
          <ChatInput onSend={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;