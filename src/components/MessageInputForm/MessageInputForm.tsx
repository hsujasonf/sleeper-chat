import React, { useState } from "react";
import { ChatMessage } from "../../types";
import { generateMessage } from "../../mockData";
import "./MessageInputForm.css";
import { User } from "../../types";

interface MessageInputFormProps {
  user: User;
  setMessages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ChatMessage }>
  >;
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  setMessages,
  setOrder,
  user,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTimestamp = new Date();
    let newMessage = generateMessage(user, text, currentTimestamp);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [newMessage.id]: newMessage,
    }));
    setText("");
    setOrder((prevOrder) => {
      let newOrder = [...prevOrder];
      newOrder.push(newMessage.id);
      return newOrder;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="message-input-form-input"
      />
      <button className="message-input-form-button">Send</button>
    </form>
  );
};

export default MessageInputForm;
