import React, { useRef, useEffect, useState } from "react";
import "./EditInputComponent.css";

// input component for editing messages
interface EditInputComponentProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditInputComponent: React.FC<EditInputComponentProps> = ({
  value,
  handleSubmit,
  handleChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //hanlde error if the input is empty
    if (value.trim() === "") {
      setError("Input cannot be empty.");
    } else {
      setError("");
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Clear error when user starts typing
    handleChange(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="edit-input-component">
      <input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        className="edit-input-component-input"
      />
      {error && <div className="edit-input-component-error">{error}</div>}
      <button type="submit" className="edit-input-component-button">
        Submit
      </button>
    </form>
  );
};

export default EditInputComponent;
