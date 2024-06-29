import { faker } from "@faker-js/faker";
import { User, ChatMessage } from "./types";
import mockUsers from "../assets/data/mock_users.json";
import mockMessages from "../assets/data/mock_messages.json";

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
let otherUsersArr = [];
for (let i = 0; i < mockUsers.length; i++) {
  let newUser = {
    id: faker.string.uuid(),
    name: mockUsers[i].name,
    avatar: mockUsers[i].avatar,
  };
  otherUsersArr.push(newUser);
}

users = [...otherUsersArr, user1];
users.push(user1);

// Function to generate a message from a specific user
export const generateMessage = (
  user: {
    id: string;
    name: string;
    avatar: string;
  },
  text?: string,
  timestamp: Date = faker.date.recent()
): ChatMessage => {
  let randomNumber = Math.floor(Math.random() * mockMessages.length);
  let randomMessage = mockMessages[randomNumber];
  return {
    id: faker.string.uuid(),
    userId: user.id,
    text: text || randomMessage,
    timestamp: timestamp,
    responses: [],
    likedBy: [],
  };
};

// Function to generate a messages object and an array of message ids to keep track of order
export function generateChat(users: User[], numberOfMessages: number) {
  const messages: { [key: string]: ChatMessage } = {};
  const order: string[] = [];

  for (let i = 0; i < numberOfMessages; i++) {
    let randomNumber = Math.floor(Math.random() * users.length);
    const sender = users[randomNumber];
    const message = generateMessage(sender);
    messages[message.id] = message;
    order.push(message.id);
  }

  order.sort(
    (a, b) =>
      new Date(messages[a].timestamp).getTime() -
      new Date(messages[b].timestamp).getTime()
  );

  return { messages, order };
}

export const userInfo = user1;
export const otherUsers = otherUsersArr;

export const generateRandomMessageFromOtherUser = () => {
  const randomMessageNumber = Math.floor(Math.random() * mockMessages.length);
  const randomMessageText = mockMessages[randomMessageNumber];
  const randomUserNumber = Math.floor(Math.random() * otherUsers.length);
  const randomUser = otherUsers[randomUserNumber];
  const currentTimestamp = new Date();
  const randomMessage = generateMessage(
    randomUser,
    randomMessageText,
    currentTimestamp
  );
  return randomMessage;
};
