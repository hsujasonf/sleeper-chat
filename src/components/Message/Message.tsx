import React, { useState, useRef, useEffect } from "react";
import "./Message.css";
import { ChatMessage, User } from "../../types";
import EditInputComponent from "../EditInputComponent/EditInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface MessageProps {
  message: ChatMessage;
  ownUserInfo: User;
  setMessages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ChatMessage }>
  >;
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const Message: React.FC<MessageProps> = ({
  message,
  ownUserInfo,
  setMessages,
  setOrder,
}) => {
  const { timestamp, text, id, likedBy, userId } = message;
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(text);
  const messageRef = useRef<HTMLDivElement>(null);

  const isOwnMessage = ownUserInfo.id === userId;
  const dateObject = new Date(timestamp);
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const handleMouseEnter = () => {
    if (!isEditing) setIsHover(true);
    if (isEditing) setIsHover(false);
  };

  const handleMouseLeave = () => {
    if (!isEditing) setIsHover(false);
  };

  const handleDelete = () => {
    setMessages((prevMessages) => {
      const { [id]: removed, ...remainingMessages } = prevMessages;
      return remainingMessages;
    });
    setOrder((prevOrder) => prevOrder.filter((messageId) => messageId !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevMessages) => ({
      ...prevMessages,
      [id]: {
        ...prevMessages[id],
        text: editingValue,
      },
    }));
    setIsEditing(false);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageRef.current &&
      !messageRef.current.contains(event.target as Node)
    ) {
      setIsEditing(false);
    }
  };
  const handleClickLike = () => {
    setMessages((prevMessages) => {
      // Create a shallow copy of the previous messages object
      let newMessages = { ...prevMessages };
      let likedBy = newMessages[id].likedBy || [];
      // Check if the user ID is already in the likedBy array
      if (!likedBy.includes(userId)) {
        // Create a shallow copy of the likedBy array and add the userId
        newMessages[id] = {
          ...newMessages[id],
          likedBy: [...likedBy, userId],
        };
      }
      return newMessages;
    });
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div
      ref={messageRef}
      className={`${isHover ? "hover" : ""} message-container`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="message">
        {isEditing ? (
          <EditInputComponent
            value={editingValue}
            handleSubmit={handleSubmitEdit}
            handleChange={handleChange}
          />
        ) : (
          <div>{text}</div>
        )}
        <div>{formattedTime}</div>
      </div>
      <div>
        {likedBy && likedBy.length > 0 && (
          <div className="like-count">
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        )}
      </div>
      {isHover && (
        <div className="hover-options">
          <div onClick={handleClickLike}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div>reply</div>
          <div onClick={handleClickEdit}>edit</div>
          {isOwnMessage && <div onClick={handleDelete}>delete</div>}
        </div>
      )}
    </div>
  );
};

export default Message;
