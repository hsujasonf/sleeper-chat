import React from "react";
import { User } from "../../types";
import { Avatar } from "@mui/material";
import "./MessageHeader.css";

interface MessageHeaderProps {
  user: User;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ user }) => {
  const { name, avatar } = user;
  return (
    <div className="message-header">
      <Avatar src={avatar} className="avatar" />
      <h4>{name}</h4>
    </div>
  );
};

export default MessageHeader;
