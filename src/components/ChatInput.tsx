import React, { useRef, useState } from "react";
import { Input } from "antd";
import {
  CloseCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

interface ChatInputProps {
  handleInputMessage: (message: string) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleInputMessage }) => {
  const [inputValue, setInputValue] = useState<string>(""); 
  const messageRef = useRef<string>(""); 

  const updateMessage = (value: string) => {
    messageRef.current = value;
    setInputValue(value);
  };

  const sendMessage = () => {
    const trimmedMessage = messageRef.current.trim();
    if (!trimmedMessage) return;

    handleInputMessage(trimmedMessage);
    messageRef.current = "";
    setInputValue("");
    // });
  };

  return (
    <Input
      size="large"
      placeholder="Type your message..."
      value={inputValue}
      onChange={(e) => updateMessage(e.target.value)}
      onPressEnter={sendMessage} // Allows sending with Enter key
      className="custom-chat-input"
      // prefix={<AudioOutlined style={{ fontSize: 18, color: "gray", cursor: "pointer" }} />}
      suffix={
        <>
          {inputValue && (
            <CloseCircleOutlined
              style={{
                fontSize: 18,
                color: "gray",
                cursor: "pointer",
                marginRight: 8,
              }}
              onClick={() => updateMessage("")}
            />
          )}
          <SendOutlined
            style={{
              fontSize: 18,
              color: inputValue ? "#1890ff" : "gray",
              cursor: "pointer",
            }}
            onClick={sendMessage}
          />
        </>
      }
    />
  );
};

export default ChatInput;
