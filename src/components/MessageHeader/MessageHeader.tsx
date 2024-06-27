import React, { useState, useEffect } from "react";
import { mockData } from "../../mockData";

interface MessageProps {
  text: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ text, timestamp }) => {
  return (
    <div>
      <div>{timestamp}</div>
      <div>{text}</div>
    </div>
  );
};

export default Message;
