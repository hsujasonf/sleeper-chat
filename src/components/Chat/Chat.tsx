import React, { useState, useEffect } from "react";
import { mockData } from "../../mockData";
import Message from "../Message/Message";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState(mockData);
  console.log(messages, "<<<");
  return (
    <div>
      {messages.map((message) => {
        return <Message text={message.text} timestamp={message.timestamp} />;
      })}
    </div>
  );
};

export default Chat;
