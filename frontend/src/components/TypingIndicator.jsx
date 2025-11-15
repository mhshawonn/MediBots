function TypingIndicator() {
  return (
    <div className="message-row align-left">
      <div className="avatar assistant">
        <span>MB</span>
      </div>
      <div className="message-bubble bubble-assistant typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export default TypingIndicator;
