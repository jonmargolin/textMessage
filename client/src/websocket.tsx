import { SetStateAction, useEffect, useState } from "react";
import io from "socket.io-client";
import ChatText from "./component/ChatText";
import InputText from "./component/InputText";

const socket = io("http://localhost:3000", { transports: ["websocket"] }); // Replace with your server's URL

socket.emit("join");

export function WebSocketComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string | null>(null);
  socket.on("message", (message) => {
    const msg = `${messages}\n ${message}`;
    if (typeof msg === "string") {
      setMessages(msg);
    }
  });

  useEffect(() => {
    return () => {
      // Clean up the WebSocket connection when the component unmounts

      console.log("unmounting");
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Send the message to the server
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="text-container">
      <h2>Chat</h2>

      <ChatText text={messages ?? ""} />
      <InputText
        message={message}
        handleMessageChange={handleMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default WebSocketComponent;
