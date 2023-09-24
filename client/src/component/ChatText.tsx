import { ChartTextProps } from "../types/type";

const ChatText = ({ text }: ChartTextProps) => {
  return (
    <div className="msg-container">
      {text
        .split("\n")
        .filter((line) => line !== "null")
        .map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
    </div>
  );
};

export default ChatText;
