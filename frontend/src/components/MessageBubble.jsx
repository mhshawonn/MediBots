import clsx from "clsx";

const formatTime = (isoString) => {
  if (!isoString) {
    return "";
  }
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (error) {
    return "";
  }
};

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={clsx("message-row", isUser ? "align-right" : "align-left")}>
      {!isUser && (
        <div className="avatar assistant">
          <span>MB</span>
        </div>
      )}
      <div
        className={clsx(
          "message-bubble",
          isUser ? "bubble-user" : "bubble-assistant",
        )}
      >
        <p className="message-text">{message.content}</p>
        <span className="message-time">{formatTime(message.createdAt)}</span>
      </div>
      {isUser && (
        <div className="avatar user">
          <span>Me</span>
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
