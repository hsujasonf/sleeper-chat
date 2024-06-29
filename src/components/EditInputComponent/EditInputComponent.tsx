import React, { useRef, useEffect } from "react";
import "./EditInputComponent.css";
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="edit-input-component">
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className="edit-input-component-input"
      />
      <button type="submit" className="edit-input-component-button">
        Submit
      </button>
    </form>
  );
};

export default EditInputComponent;
