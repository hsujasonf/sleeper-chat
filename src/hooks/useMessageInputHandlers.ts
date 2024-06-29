import { useState, ChangeEvent, FormEvent } from "react";
import { useChatContext } from "../context/ChatProvider";
import { generateMessage } from "../dataUtils";
import { User, ChatMessage } from "../types";

const useMessageInputHandlers = (user: User) => {
  const { setMessages, setOrder } = useChatContext();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    if (input.trim() === "") {
      setError("Message cannot be empty.");
      return false;
    }
    if (input.length > 500) {
      setError("Message cannot exceed 500 characters.");
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateInput(text)) return;

    try {
      const currentTimestamp = new Date();
      const newMessage: ChatMessage = generateMessage(
        user,
        text,
        currentTimestamp
      );
      setMessages((prevMessages: { [key: string]: ChatMessage }) => ({
        ...prevMessages,
        [newMessage.id]: newMessage,
      }));
      setOrder((prevOrder: string[]) => [...prevOrder, newMessage.id]);
      setText("");
    } catch (err) {
      console.error("Error adding message:", err);
      setError("An error occurred while sending the message.");
    }
  };

  return {
    text,
    handleChange,
    handleSubmit,
    error,
  };
};

export default useMessageInputHandlers;
