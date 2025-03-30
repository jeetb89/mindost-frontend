import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  messageRef: React.RefObject<string | null>;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  messageRef,
  speed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  const speakCharacter = (char: string) => {
    const utterance = new SpeechSynthesisUtterance(char);
    utterance.rate = 1; // Adjust speed (1 is normal)
    utterance.pitch = 1; // Default pitch
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!messageRef.current) return;

    let index = 0;
    setDisplayedText(""); // Reset text before typing new content

    // Cancel any ongoing speech before starting a new one
    window.speechSynthesis.cancel();

    const interval = setInterval(() => {
      if (index < messageRef.current!.length) {
        setDisplayedText((prev) => prev + messageRef.current![index]);

        // Speak each character as it's typed
        speakCharacter(messageRef.current![index]);

        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [messageRef.current]);

  return (
    <div
      style={{
        color: "#000",
        whiteSpace: "pre-wrap",
        fontSize: "1.4rem",
        fontWeight: "600",
        maxWidth: "70%",
        maxHeight: "300px",
        overflowY: "auto",
        wordBreak: "break-word",
        marginTop: "3%",
        borderRadius: "8px",
      }}
    >
      {displayedText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingEffect;
