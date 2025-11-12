import { useOutletContext } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const { currentChat } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bottomOffset, setBottomOffset] = useState(24); // dynamic bottom for mobile keyboard
  const scrollRef = useRef();

  const myAvatar = "https://i.pravatar.cc/150?img=10";

  // Load chat messages
  useEffect(() => {
    if (currentChat) setMessages(currentChat.messages);
  }, [currentChat]);

  // Auto-scroll whenever messages or bottomOffset change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, bottomOffset]);

  // Mobile keyboard handling
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const vh = window.visualViewport.height;
        const bottom = Math.max(window.innerHeight - vh, 24);
        setBottomOffset(bottom);
      } else {
        setBottomOffset(24);
      }
    };

    // Listen to viewport changes (keyboard open/close)
    window.visualViewport?.addEventListener("resize", handleResize);
    handleResize();

    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="relative w-full h-full bg-[#F1F5F9] flex flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          bottomOffset === 24
            ? "md:max-h-[calc(100dvh-8.75rem)] max-h-[calc(100dvh-4rem-61px)]"
            : "max-h-[40dvh]"
        } pb-28 px-6 md:pt-20 pt-14 lg:pt-4`}
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
      <div
        className="fixed left-0 w-full flex justify-center bg-opacity-0 transition-all duration-300"
        style={{ bottom: bottomOffset }}
      >
        <div className="flex items-center lg:w-[320px] rounded-[99px] bg-white p-1 transition-all duration-300 w-[90vw] lg:hover:w-[420px] lg:focus-within:w-[420px] shadow-md">
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
