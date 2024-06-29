import { useRef, useState, useEffect, useCallback } from "react";
import { ChatMessage, User } from "../types";

interface UseMessageHandlersProps {
  message: ChatMessage;
  ownUserInfo: User;
  setMessages: React.Dispatch<
    React.SetStateAction<{ [key: string]: ChatMessage }>
  >;
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const useMessageHandlers = ({
  message,
  ownUserInfo,
  setMessages,
  setOrder,
}: UseMessageHandlersProps) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(message.text);

  const setMessageRef = useCallback((ref: HTMLDivElement | null) => {
    if (messageRef.current !== ref) {
      messageRef.current = ref;
    }
  }, []);

  const handleMouseEnter = () => !isEditing && setIsHover(true);
  const handleMouseLeave = () => !isEditing && setIsHover(false);

  const handleDelete = () => {
    setMessages((prevMessages) => {
      const { [message.id]: removed, ...remainingMessages } = prevMessages;
      return remainingMessages;
    });
    setOrder((prevOrder) =>
      prevOrder.filter((messageId) => messageId !== message.id)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditingValue(e.target.value);

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevMessages) => ({
      ...prevMessages,
      [message.id]: {
        ...prevMessages[message.id],
        text: editingValue,
      },
    }));
    setIsEditing(false);
  };

  const handleClickEdit = () => setIsEditing(true);

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
      const newMessages = { ...prevMessages };
      const likedBy = newMessages[message.id].likedBy || [];
      if (!likedBy.includes(ownUserInfo.id)) {
        newMessages[message.id] = {
          ...newMessages[message.id],
          likedBy: [...likedBy, ownUserInfo.id],
        };
      }
      return newMessages;
    });
    setIsHover(false);
  };

  const handleClickUnlike = () => {
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      const likedBy = newMessages[message.id].likedBy || [];
      if (likedBy.includes(ownUserInfo.id)) {
        newMessages[message.id] = {
          ...newMessages[message.id],
          likedBy: likedBy.filter(
            (userId: string) => userId !== ownUserInfo.id
          ),
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

  return {
    isHover,
    isEditing,
    editingValue,
    isOwnMessage: ownUserInfo.id === message.userId,
    formattedTime: new Date(message.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    handleMouseEnter,
    handleMouseLeave,
    handleDelete,
    handleChange,
    handleSubmitEdit,
    handleClickEdit,
    handleClickOutside,
    handleClickLike,
    handleClickUnlike,
    setMessageRef,
  };
};

export default useMessageHandlers;
