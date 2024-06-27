import React, { useState, useEffect } from "react";

interface MessageProps {
  text: string;
  timestamp: string;
}

const MessageGroup: React.FC<MessageProps> = ({ text, timestamp }) => {
  return (
    <div>
      <div>{timestamp}</div>
      <div>{text}</div>
    </div>
  );
};

export default MessageGroup;
