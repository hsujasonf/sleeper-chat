import { faker } from "@faker-js/faker";
import { User, ChatMessage, ChatThread } from "./types";

// Function to generate a unique user
const generateUser = (name: string = faker.person.fullName()): User => {
  return {
    id: faker.string.uuid(),
    name: name,
    avatar: faker.image.avatar(),
  };
};

const user1 = generateUser("Jason Hsu");
let users = [];
for (let i = 1; i < 21; i++) {
  let newUser = generateUser();
  users.push(newUser);
}

// Function to generate a message from a specific user
function generateMessage(user: { id: string; name: string }): ChatMessage {
  return {
    userId: user.id,
    name: user.name,
    text: faker.lorem.sentence(),
    timestamp: faker.date.recent(),
  };
}

// Function to generate a chat conversation
function generateChat(user1: User, user2: User, numberOfMessages: number) {
  const chat = [];
  for (let i = 0; i < numberOfMessages; i++) {
    const sender = i % 2 === 0 ? user1 : user2; // Alternate between users
    chat.push(generateMessage(sender));
  }
  return chat;
}

let chats = [];

for (let i = 0; i < users.length; i++) {
  let newChat: ChatThread = {
    id: faker.string.uuid(),
    user: users[i].name,
    messages: [],
  };
  let newChatMessages = generateChat(user1, users[i], 25);
  newChat.messages = newChatMessages;
  chats.push(newChat);
}

export const mockData = chats;
