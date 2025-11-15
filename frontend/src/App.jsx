import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import MessageBubble from "./components/MessageBubble.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const systemPrompt =
  "You are MediBot, a precise and empathetic medical support assistant. " +
  "Answer with concise, factual guidance based on trusted medical knowledge. " +
  "If you are unsure, clearly state that the information is unavailable.";

const apiBase =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ||
  window.location.origin.replace(/\/$/, "");

const initialGreeting = {
  id: makeId(),
  role: "assistant",
  content:
    "Hi, I am MediBot. Ask me anything about your health concerns and I will share evidence-based guidance.",
  createdAt: new Date().toISOString(),
};

function App() {
  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const scrollAnchorRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isTyping,
    [input, isTyping],
  );

  const submitMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const conversation = [
      { role: "system", content: systemPrompt },
      ...messagesRef.current.map(({ role, content }) => ({ role, content })),
      { role: "user", content: trimmed },
    ];

    try {
      const { data } = await axios.post(`${apiBase}/api/chat`, {
        messages: conversation,
      });

      const assistantMessage = {
        id: makeId(),
        role: "assistant",
        content: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (requestError) {
      const fallbackMessage =
        "I ran into an issue reaching the server. Please try again in a moment.";

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: fallbackMessage,
          createdAt: new Date().toISOString(),
        },
      ]);

      setError(
        requestError?.response?.data?.detail ||
          requestError?.message ||
          "Request failed",
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSend) {
      submitMessage();
    }
  };

  return (
    <div className="app-shell">
      <div className="chat-panel">
        <header className="chat-header">
          <div className="avatar assistant">
            <span>MB</span>
          </div>
          <div>
            <h1 className="title">MediBots Assistant</h1>
            <p className="subtitle">
              Gemini powered · Provides guidance, not medical diagnosis
            </p>
          </div>
        </header>

        <main className="chat-body">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={scrollAnchorRef} />
        </main>

        <footer className="chat-footer">
          {error && <p className="error-banner">{error}</p>}
          <form className="input-row" onSubmit={handleSubmit}>
            <input
              aria-label="Type your message"
              autoComplete="off"
              placeholder="Write a message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={!canSend}>
              {isTyping ? "Sending..." : "Send"}
            </button>
          </form>
          <p className="disclaimer">
            MediBot is not a substitute for professional medical advice. For
            emergencies, contact your local medical services.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
