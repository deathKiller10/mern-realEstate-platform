const MessageItem = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex mb-3 px-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] p-2 rounded-2xl text-sm leading-relaxed ${
        isBot 
        ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none' 
        : 'bg-blue-600 text-white rounded-br-none shadow-sm'
      }`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;