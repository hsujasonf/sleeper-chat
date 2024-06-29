import React, { createContext, useContext, useState } from "react";
import { generateChat, userInfo, otherUsers } from "../dataUtils";
import { ChatMessage, User } from "../types";

interface UsersObject {
  [key: string]: User;
}

// Create context
const ChatContext = createContext<any>(null);

export const useChatContext = () => useContext(ChatContext);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockUsers = [...otherUsers, userInfo];
  const chat = generateChat(mockUsers, 500);

  const [messages, setMessages] = useState<{ [key: string]: ChatMessage }>(
    chat.messages
  );
  const [order, setOrder] = useState<string[]>(chat.order);

  const usersObj: UsersObject = {};
  for (let i = 0; i < mockUsers.length; i++) {
    usersObj[mockUsers[i].id] = mockUsers[i];
  }

  const [users] = useState(usersObj);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, order, setOrder, users }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
