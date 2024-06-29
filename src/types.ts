export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  userId: User["id"];
  text: string;
  timestamp: Date;
  responses?: ChatMessage[];
  likedBy?: User["id"][];
}

export interface ChatThread {
  id: string;
  users: User[];
  messageGroups: GroupedMessages[];
}

export interface GroupedMessages {
  user: User;
  messages: { text: string; timestamp: Date }[];
}
