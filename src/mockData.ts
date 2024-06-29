// import { faker } from "@faker-js/faker";
// import { User, ChatMessage } from "./types";

// // Function to generate a unique user
// const generateUser = (name: string = faker.person.fullName()): User => {
//   return {
//     id: faker.string.uuid(),
//     name: name,
//     avatar: faker.image.avatar(),
//   };
// };

// const user1 = generateUser("Jason Hsu");

// const generateUsers = (numberOfUsers: number) => {
//   let users = [];
//   for (let i = 0; i < numberOfUsers; i++) {
//     let newUser = generateUser();
//     users.push(newUser);
//   }
//   return users;
// };

// const users = generateUsers(3);
// users.push(user1);
// // Function to generate a message from a specific user
// export function generateMessage(
//   user: {
//     id: string;
//     name: string;
//     avatar: string;
//   },
//   text: string = faker.lorem.sentence(),
//   timestamp: Date = faker.date.recent()
// ): ChatMessage {
//   return {
//     userId: user.id,
//     text: text,
//     timestamp: timestamp,
//     responses: [],
//     likedBy: [],
//   };
// }

// // Function to generate a chat conversation
// export function generateChat(users: User[], numberOfMessages: number) {
//   const chat = [];

//   for (let i = 0; i < numberOfMessages; i++) {
//     let randomNumber = Math.floor(Math.random() * users.length);
//     console.log(users.length, "<<<<users", randomNumber);
//     const sender = users[randomNumber];
//     console.log(sender, "<<<sender");
//     chat.push(generateMessage(sender));
//   }
//   chat.sort(
//     (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//   );
//   return chat;
// }

// const chat = generateChat(users, 500);

// export const mockData = chat;
// export const mockOtherUsers = generateUsers(3);
// export const self = user1;
import { faker } from "@faker-js/faker";
import { User, ChatMessage } from "./types";

// Function to generate a unique user
const generateUser = (name: string = faker.person.fullName()): User => {
  return {
    id: faker.string.uuid(),
    name: name,
    avatar: faker.image.avatar(),
  };
};

const user1 = generateUser("Jason Hsu");

const generateUsers = (numberOfUsers: number) => {
  let users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    let newUser = generateUser();
    users.push(newUser);
  }
  return users;
};

const users = generateUsers(3);
users.push(user1);

// Function to generate a message from a specific user
export function generateMessage(
  user: {
    id: string;
    name: string;
    avatar: string;
  },
  text: string = faker.lorem.sentence(),
  timestamp: Date = faker.date.recent()
): ChatMessage {
  return {
    id: faker.string.uuid(),
    userId: user.id,
    text: text,
    timestamp: timestamp,
    responses: [],
    likedBy: [],
  };
}

// Function to generate a chat conversation
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

const chat = generateChat(users, 500);

export const mockData = chat.messages;
export const mockOrder = chat.order;
export const mockOtherUsers = generateUsers(3);
export const self = user1;
