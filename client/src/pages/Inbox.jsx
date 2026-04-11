import { useEffect, useState, useContext } from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchThreads();
  }, [user, navigate]);

  const fetchThreads = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/messages/my-threads", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setThreads(res.data);
      if (res.data.length > 0 && !activeThread) {
        setActiveThread(res.data[0]);
      }
    } catch (error) {
      console.error("Failed to load threads");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const toastId = toast.loading('Sending message...');

    try {
      const token = localStorage.getItem("token");
      const receiverId = user.role === "owner" ? activeThread.buyer._id : activeThread.owner._id;

      const res = await axios.post("http://localhost:5000/api/messages/send", {
        propertyId: activeThread.property?._id || null, 
        receiverId: receiverId,
        text: replyText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedThread = {
        ...res.data.thread,
        property: activeThread.property,
        buyer: activeThread.buyer,
        owner: activeThread.owner
      };

      setActiveThread(updatedThread);
      setThreads(threads.map(t => t._id === updatedThread._id ? updatedThread : t));
      setReplyText("");

      toast.success('Message sent!', { id: toastId });

    } catch (error) {
      alert(error.response?.data?.message || "Failed to send reply");
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading Inbox...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 h-[80vh] flex flex-col">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 border-b pb-4">My Inbox</h1>

      {threads.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center border">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No messages yet.</h2>
          <p className="text-gray-500">When you contact an owner or receive an inquiry, it will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-grow bg-white rounded-xl shadow border overflow-hidden">
          
          {/* LEFT SIDEBAR: Threads List */}
          <div className="w-full md:w-1/3 border-r bg-gray-50 overflow-y-auto">
            {threads.map(thread => {
              const isOwner = user.role === "owner";
              const otherPerson = isOwner ? thread.buyer : thread.owner;
              const isActive = activeThread?._id === thread._id;

              return (
                <div 
                  key={thread._id}
                  onClick={async () => {
                    setActiveThread(thread);
                    try {
                      const token = localStorage.getItem("token");
                      await axios.patch(`http://localhost:5000/api/messages/mark-read/${thread._id}`, {}, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      thread.messages.forEach(m => {
                        if (m.sender !== user.id) m.read = true;
                      });
                    } catch (e) { console.log(e); }
                  }}
                  className={`p-4 border-b cursor-pointer transition ${isActive ? 'bg-blue-100 border-l-4 border-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <p className={`font-bold truncate ${thread.property?.isDeleted ? 'text-red-500 line-through' : 'text-gray-800'}`}>
                    {thread.property?.title || "Unavailable Property"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isOwner ? "Buyer: " : "Owner: "} <span className="font-semibold">{otherPerson?.name || "Unknown User"}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {thread.messages.length} messages
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Active Chat Area */}
          <div className="w-full md:w-2/3 flex flex-col h-[50vh] md:h-auto">
            {activeThread ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white shadow-sm flex items-center gap-4">
                   <img 
                    src={activeThread.property?.images?.[0] 
                          ? `http://localhost:5000/${activeThread.property.images[0]}` 
                          : 'https://via.placeholder.com/150?text=Deleted'} 
                    className="w-12 h-12 rounded object-cover bg-gray-200"
                    alt="Property"
                    onError={(e) => e.target.style.display = 'none'}
                   />
                   {/* FIX: Keep text elements inside this div next to the image */}
                   <div>
                     <h3 className={`font-bold text-lg ${activeThread.property?.isDeleted ? 'text-red-500' : ''}`}>
                        {activeThread.property?.title || "Unavailable Property"}
                     </h3>
                     <p className="text-xs text-gray-500">
                       Chatting with {user.role === 'owner' ? activeThread.buyer?.name : activeThread.owner?.name}
                     </p>
                   </div>
                </div>

                {/* Messages Area */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                  {activeThread.messages.map(msg => {
                    const isMe = msg.sender === user.id;
                    return (
                      <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 rounded-lg ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-500'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Input or Disabled Notice */}
                <div className="p-4 bg-white border-t">
                  {/* FIX: Check both isDeleted and status === 'sold' */}
                  {!activeThread.property?.isDeleted && activeThread.property?.status !== "sold" ? (
                    <form onSubmit={handleReply} className="flex gap-2">
                      <input 
                        type="text" 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your message..." 
                        className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 px-4"
                      />
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">
                        Send
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
                      🚫 {activeThread.property?.status === "sold" 
                          ? "This property has been sold." 
                          : "This property has been removed."} Replies are disabled.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a thread to view messages
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}