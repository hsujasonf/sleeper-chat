import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/ChatProvider";
import MessageHeader from "../MessageHeader/MessageHeader";
import Message from "../Message/Message";
import MessageInputForm from "../MessageInputForm/MessageInputForm";
import { userInfo, generateRandomMessageFromOtherUser } from "../../dataUtils";
import { ChatMessage } from "../../types";
import "./Chat.css";

const getRandomNumberOfSeconds = () => Math.floor(Math.random() * 10000) + 5000;

const Chat: React.FC = () => {
  const { messages, order, users, setMessages, setOrder } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(order.length);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    // on inital render or when the chat is updated, scroll down to the most recent message.
    if (initialRender || order.length !== prevMessageCount) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      setPrevMessageCount(order.length);
      setInitialRender(false);
    }

    const intervalDuration = getRandomNumberOfSeconds();
    const id = setInterval(() => {
      // add a random message from another user every 5 - 15 seconds
      let randomMessage = generateRandomMessageFromOtherUser();
      // add new message and add the id to the order
      setMessages((prevMessages: { [key: string]: ChatMessage }) => ({
        ...prevMessages,
        [randomMessage.id]: randomMessage,
      }));
      setOrder((prevOrder: string[]) => [...prevOrder, randomMessage.id]);
    }, intervalDuration);

    return () => clearInterval(id);
  }, [order.length, prevMessageCount, initialRender]);

  return (
    <div className="chat">
      <h3 className="chat-header">Sleeper Chat</h3>
      <div className="chat-messages">
        {order.map((id: string, i: number) => {
          // only renders header if its the first message in the chat or if its a new person responding.
          const message = messages[id];
          const prevId = i > 0 && messages[order[i - 1]].userId;
          const renderHeader = i === 0 || prevId !== message.userId;
          return (
            <div key={id}>
              {renderHeader && <MessageHeader user={users[message.userId]} />}
              <Message message={message} ownUserInfo={users[userInfo.id]} />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-form-container">
        <MessageInputForm user={userInfo} />
      </div>
    </div>
  );
};

export default Chat;
