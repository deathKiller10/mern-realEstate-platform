import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  const scrollRef = useRef();

  // Auto-scroll to bottom when a new message arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.list}>
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

const styles = {
  list: { flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#f9f9f9' }
};

export default MessageList;