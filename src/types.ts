export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatMessage {
  userId: User["id"];
  name: User["name"];
  text: string;
  timestamp: Date;
}

export interface ChatThread {
  id: string;
  user: User["name"];
  messages: ChatMessage[];
}
