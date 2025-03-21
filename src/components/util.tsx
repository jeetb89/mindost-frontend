import  { JSX } from "react";

interface Message {
  sender: string;
  text: string;
}

export const createChat = (messages: Message[]): JSX.Element[] => {
  return messages.map((message, index) => (

    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: message.sender === "user" ? "#4CAF50" : "#E0E0E0",
          color: message.sender === "user" ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "60%",
        }}
      >
        {message.text}
      </div>
    </div>
  ));
};

export const createChatHistory = (messages: Message[]): JSX.Element[] => {
  return messages.map((message, index) => (
    <div key={index} className="space-y-4" style={{margin: '16px 0px'}}>
      {message.sender === "user" ? (
        <div className="flex items-start space-x-3">
          <div className="flex-1 bg-blue-50 rounded-lg p-3">
            <p className="text-gray-900">{message.text}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold">Y</span>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600 font-semibold">A</span>
          </div>
          <div className="flex-1 bg-yellow-50 rounded-lg p-3">
            <p className="text-gray-900">{message.text}</p>
          </div>
        </div>
      )}
    </div>
  ));
};


// export const createAiResponse = (messages: Message[]): JSX.Element[] => {
//   return messages
//     .map((message, index) =>
//       message?.sender !== "user" ? (
//         // <div
//         //   key={index}
//         //   style={{
//         //     display: "flex",
//         //     justifyContent: "flex-end",
//         //     marginBottom: "10px",
//         //   }}
//         // >
//           <div
//             style={{
//               backgroundColor:  "#E0E0E0",
//               color:  "#000",
//               padding: "10px",
//               borderRadius: "10px",
//               maxWidth: "60%",
//             }}
//           >
//             {message.text}
//           </div>
//         // </div>
//       ) : null
//     )
//     .filter((element): element is JSX.Element => element !== null);
// };
