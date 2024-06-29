import React, { useState, useEffect, useRef } from "react";
import { generateChat, mockOtherUsers, self } from "../../mockData";
import { ChatMessage, User } from "../../types";
import MessageHeader from "../MessageHeader/MessageHeader";
import Message from "../Message/Message";
import MessageInputForm from "../MessageInputForm/MessageInputForm";
import "./Chat.css";

interface UsersObject {
  [key: string]: User;
}

const Chat: React.FC = () => {
  const mockUsers = [...mockOtherUsers, self];
  const chat = generateChat(mockUsers, 500);

  const [messages, setMessages] = useState<{ [key: string]: ChatMessage }>(
    chat.messages
  );
  const [order, setOrder] = useState<string[]>(chat.order);
  const usersObj: UsersObject = {};

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  for (let i = 0; i < mockUsers.length; i++) {
    usersObj[mockUsers[i].id] = mockUsers[i];
  }

  const [users] = useState(usersObj);

  return (
    <div className="chat">
      <div className="chat-messages">
        {order.map((id, i) => {
          const message = messages[id];
          let prevId = i > 0 && messages[order[i - 1]].userId;
          const renderHeader = i === 0 || prevId !== message.userId;
          return (
            <>
              {renderHeader && <MessageHeader user={users[message.userId]} />}
              <Message
                message={message}
                ownUserInfo={self}
                setMessages={setMessages}
                setOrder={setOrder}
              />
            </>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-form-container ">
        <MessageInputForm
          setMessages={setMessages}
          setOrder={setOrder}
          user={self}
        />
      </div>
    </div>
  );
};

export default Chat;
