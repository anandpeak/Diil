import { useOutletContext } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const { currentChat } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  const myAvatar = "https://i.pravatar.cc/150?img=10";

  // Load chat messages
  useEffect(() => {
    if (currentChat) setMessages(currentChat.messages);
  }, [currentChat]);

  // Auto-scroll whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Example auto-reply
    setTimeout(() => {
      const reply = {
        sender: "other",
        text: "This is the default reply.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!currentChat) return <div>Loading...</div>;

  return (
    <div
      className="relative w-full flex flex-col bg-[#F1F5F9]"
      style={{ height: "100dvh" }}
    >
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-[90px] px-6 md:pt-20 pt-14 lg:pt-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <div className="md:w-10 md:h-10 w-8 h-8 rounded-full mr-2">
                <img
                  className="rounded-full object-fill"
                  src={currentChat.avatar}
                  alt="avatar"
                />
              </div>
            )}

            <div
              className={`max-w-[60%] p-3 rounded-[24px] ${
                msg.sender === "me"
                  ? "bg-[#4258FF] text-white"
                  : "bg-white text-[#020618]"
              } shadow`}
            >
              <p className="md:text-base text-sm">{msg.text}</p>
            </div>

            {msg.sender === "me" && (
              <div className="md:w-10 md:h-10 w-8 h-8 rounded-full ml-2">
                <img
                  className="rounded-full object-fill"
                  src={myAvatar}
                  alt="avatar"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center bg-opacity-0">
        <div className="flex items-center lg:w-[320px] rounded-[99px] bg-white p-1 transition-all duration-300 w-[90vw] lg:hover:w-[420px] lg:focus-within:w-[420px] shadow-md mb-safe">
          <button className="h-10 w-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#020618]">
            <img src="/icon/chat/voice.svg" alt="icon" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-2 mx-2 rounded-lg focus:outline-none"
          />

          <button
            onClick={handleSend}
            className="h-10 w-10 bg-[#4258FF] rounded-full flex items-center justify-center text-white"
          >
            <img src="/icon/chat/send.svg" alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
