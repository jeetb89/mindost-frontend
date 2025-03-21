import React, { useState } from "react";
import { Input } from "antd";
import { AudioOutlined, CloseCircleOutlined, SendOutlined } from "@ant-design/icons";
// import "./ChatInput.css"; // Import custom styles

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");

  return (
    <Input
      size="large"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="custom-chat-input"
      prefix={
        <AudioOutlined
          style={{ fontSize: 18, color: "gray", cursor: "pointer" }}
        />
      }
      suffix={
        <>
          {message && (
            <CloseCircleOutlined
              style={{ fontSize: 18, color: "gray", cursor: "pointer", marginRight: 8 }}
              onClick={() => setMessage("")}
            />
          )}
          <SendOutlined
            style={{ fontSize: 18, color: message ? "#1890ff" : "gray", cursor: "pointer" }}
            onClick={() => message && console.log("Message sent:", message)}
          />
        </>
      }
    />
  );
};

export default ChatInput;
