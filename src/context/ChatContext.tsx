import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { ChatMessage, ChatThread, User } from "../types";
import { mockData } from "../mockData";

interface ChatContextProps {
  user: User | null;
  setUser: (user: User) => void;
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  fetchMessages: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatThread[]>(mockData);

  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider
      value={{ user, setUser, messages, addMessage, fetchMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChat };
