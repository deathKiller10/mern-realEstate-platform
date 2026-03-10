import React, { useState } from 'react';
const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
      <input
        className="flex-1 bg-gray-100 border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
      />
      <button type="submit" className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition">
        Send
      </button>
    </form>
  );
};

export default ChatInput;