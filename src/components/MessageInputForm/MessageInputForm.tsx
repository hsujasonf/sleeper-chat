import React from "react";
import useMessageInputHandlers from "../../hooks/useMessageInputHandlers";
import { User } from "../../types";
import "./MessageInputForm.css";

interface MessageInputFormProps {
  user: User;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({ user }) => {
  const { text, handleChange, handleSubmit, error } =
    useMessageInputHandlers(user);

  return (
    <div className="message-input-form-container">
      <form className="message-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="message-input-form-input"
          aria-label="Message input"
        />
        <button
          type="submit"
          className="message-input-form-button"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
      <div className="message-input-error">{error}</div>
    </div>
  );
};

export default MessageInputForm;
