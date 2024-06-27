import React, { useState, useEffect } from "react";

import { ChatMessage } from "../../types";

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { timestamp, name, text } = message;

  return (
    <div>
      <div>{name}</div>
      <div>{timestamp.toString()}</div>
      <div>{text}</div>
    </div>
  );
};

export default Message;
