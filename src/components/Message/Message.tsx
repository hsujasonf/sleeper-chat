import React from "react";
import "./Message.css";
import { ChatMessage, User } from "../../types";
import EditInputComponent from "../EditInputComponent/EditInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "../../context/ChatProvider";
import useMessageHandlers from "../../hooks/useMessageHandlers";

interface MessageProps {
  message: ChatMessage;
  ownUserInfo: User;
}

const Message: React.FC<MessageProps> = ({ message, ownUserInfo }) => {
  const { setMessages, setOrder } = useChatContext();
  const {
    isHover,
    isEditing,
    editingValue,
    isOwnMessage,
    formattedTime,
    handleMouseEnter,
    handleMouseLeave,
    handleDelete,
    handleChange,
    handleSubmitEdit,
    handleClickEdit,
    handleClickLike,
    handleClickUnlike,
    setMessageRef,
  } = useMessageHandlers({
    message,
    ownUserInfo,
    setMessages,
    setOrder,
  });

  // Check if the message text is a URL and ends with an image extension
  const isImageUrl = (text: string) => {
    const urlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    return urlPattern.test(text);
  };

  return (
    <div>
      <div
        ref={setMessageRef}
        className="message-container"
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
            <div className={`${isHover ? "hover" : ""}`}>
              {message.text}
              {isImageUrl(message.text) && (
                <div className="image-preview">
                  <img src={message.text} alt="Image preview" />
                </div>
              )}
            </div>
          )}
          <div>{formattedTime}</div>
        </div>
        <div></div>
        {isHover && (
          <div className="hover-options">
            <div onClick={handleClickLike} className="hover-option">
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div onClick={handleClickEdit} className="hover-option">
              edit
            </div>
            {isOwnMessage && (
              <div onClick={handleDelete} className="hover-option">
                delete
              </div>
            )}
          </div>
        )}
      </div>
      {message.likedBy && message.likedBy.length > 0 && (
        <div className="like-count" onClick={handleClickUnlike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{message.likedBy.length}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
