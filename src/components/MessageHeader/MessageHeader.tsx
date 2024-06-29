import React from "react";
import { User, ChatMessage } from "../../types";
import { Avatar } from "@mui/material";
import "./MessageHeader.css";

interface MessageHeaderProps {
  user: User;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ user }) => {
  const { name, avatar } = user;
  return (
    <div className="message-header">
      <div>
        <Avatar src={avatar} />
      </div>
      <div>
        <h4>{name}</h4>
      </div>
    </div>
  );
};

export default MessageHeader;
