import MicIcon from "@mui/icons-material/Mic";
import { useState, useEffect } from "react";

interface VoiceIndicatorProps {
  value: boolean;
}

const VoiceIndicator = ({ value }: VoiceIndicatorProps) => {
  const [listening, setListening] = useState(value);

  // Sync listening state when value prop changes
  useEffect(() => {
    setListening(value);
  }, [value]);

  return (
    <div>
      <MicIcon
        sx={{
          fontSize: 50,
          color: listening ? "red" : "gray",
          animation: listening ? "pulse 1.5s infinite" : "none",
        }}
      />
      {/* <button onClick={() => setListening(!listening)}> */}
        {/* {listening ? "Stop" : "Start"} */}
      {/* </button> */}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default VoiceIndicator;
