import { useState, useRef, useEffect } from "react";
import { Send, Image, Paperclip, Smile } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "other",
      text: "Сайн уу! Энэ бүтээгдэхүүний талаар асуух зүйл байна уу?",
      time: "10:30",
    },
    {
      sender: "me",
      text: "Сайн байна уу. Энэ зарын талаар дэлгэрэнгүй мэдээлэл авмаар байна.",
      time: "10:32",
    },
    {
      sender: "other",
      text: "Мэдээж! Ямар мэдээлэл хэрэгтэй байна вэ?",
      time: "10:32",
    },
    {
      sender: "me",
      text: "Үнэ болон хүргэлтийн нөхцөл сонирхож байна.",
      time: "10:33",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const inputRef = useRef();

  const myAvatar = "https://i.pravatar.cc/150?img=10";
  const otherAvatar = "https://i.pravatar.cc/150?img=5";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    };
    const inputEl = inputRef.current;
    inputEl?.addEventListener("focus", handleFocus);
    return () => inputEl?.removeEventListener("focus", handleFocus);
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

    setTimeout(() => {
      const reply = {
        sender: "other",
        text: "Баярлалаа, таны асуултыг хүлээн авлаа.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative ">
      {/* Messages Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        style={{ paddingBottom: "140px" }}
      >
        {messages.map((msg, idx) => {
          const isMe = msg.sender === "me";
          const avatar = isMe ? myAvatar : otherAvatar;

          return (
            <div
              key={idx}
              className={`flex items-end gap-2 animate-fade-in ${
                isMe ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={avatar}
                  alt={msg.sender}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
              </div>

              {/* Message Bubble */}
              <div
                className={`flex flex-col ${
                  isMe ? "items-end" : "items-start"
                } max-w-[75%] sm:max-w-[60%]`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 transition-all hover:shadow-md ${
                    isMe
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm shadow-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">
                    {msg.text}
                  </p>
                </div>
                <span className="text-xs text-gray-500 mt-1.5 px-1 font-medium">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 left-0 right-0 flex items-center">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Мессеж бичих..."
            className="w-full px-4 py-3 pr-12 rounded-3xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 resize-none transition-all bg-gray-50 focus:bg-white"
            rows="1"
            style={{
              minHeight: "52px",
              maxHeight: "120px",
            }}
            onInput={(e) => {
              e.target.style.height = "52px";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`p-3.5 rounded-full mb-2 transition-all active:scale-95 ${
            input.trim()
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
