import { InputTextProps } from "../types/type";

const InputText = ({
  message,
  handleMessageChange,
  handleSendMessage,
}: InputTextProps) => {
  return (
    <>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
};

export default InputText;
