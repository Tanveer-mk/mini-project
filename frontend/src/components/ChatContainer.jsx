// "use client";
// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef, useState } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
// import { useTranslateStore } from "../store/useTranslateStore";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const { authUser } = useAuthStore();

//   const { showTranslate, targetLang, fetchTranslation } = useTranslateStore();

//   const messageEndRef = useRef(null);
//   const prevShowTranslateRef = useRef(false);

//   // Store translations keyed by message._id
//   const [translations, setTranslations] = useState({});

//   // Load messages & subscribe
//   useEffect(() => {
//     getMessages(selectedUser._id);
//     subscribeToMessages();
//     return () => unsubscribeFromMessages();
//   }, [
//     selectedUser._id,
//     getMessages,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   ]);

//   // Scroll to bottom on new messages
//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   // Fetch translations only when showTranslate toggles from false -> true
//   useEffect(() => {
//     const fetchAllTranslations = async () => {
//       const newTranslations = {};
//       for (const message of messages) {
//         if (message.text) {
//           try {
//             const translated = await fetchTranslation(message.text);
//             newTranslations[message._id] =
//               translated || "⚠️ Could not translate";
//           } catch (e) {
//             newTranslations[message._id] = "⚠️ Translation failed";
//           }
//         }
//       }
//       setTranslations(newTranslations);
//     };

//     if (showTranslate && !prevShowTranslateRef.current) {
//       fetchAllTranslations();
//     }

//     prevShowTranslateRef.current = showTranslate;
//   }, [showTranslate, messages, fetchTranslation]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${
//               message.senderId === authUser._id ? "chat-end" : "chat-start"
//             }`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div
//               className={`chat-bubble flex flex-col ${
//                 message.senderId === authUser._id
//                   ? "bg-primary text-primary-content"
//                   : "bg-base-300 text-base-content"
//               }`}
//             >
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}

//               {/* Original message */}
//               {message.text && <p>{message.text}</p>}

//               {/* Translated text if showTranslate is true */}
//               {showTranslate && translations[message._id] && (
//                 <p className="mt-1 text-sm italic text-gray-600">
//                   {translations[message._id]}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messageEndRef} />
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

// "use client";
// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef, useState } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
// import { useTranslateStore } from "../store/useTranslateStore";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const { authUser } = useAuthStore();
//   const { showTranslate, targetLang, fetchTranslation } = useTranslateStore();

//   const messageEndRef = useRef(null);

//   // Translation states
//   const [translations, setTranslations] = useState({});
//   const [isTranslating, setIsTranslating] = useState(false);

//   // To track previous values and detect changes
//   const prevShowTranslateRef = useRef(false);
//   const prevTargetLangRef = useRef(targetLang);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [
//     selectedUser._id,
//     getMessages,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   ]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const fetchAllTranslations = async () => {
//       setIsTranslating(true);
//       const newTranslations = {};
//       for (const message of messages) {
//         if (message.text) {
//           try {
//             const translated = await fetchTranslation(message.text);
//             newTranslations[message._id] =
//               translated || "⚠️ Could not translate";
//           } catch (e) {
//             newTranslations[message._id] = "⚠️ Translation failed";
//           }
//         }
//       }
//       setTranslations(newTranslations);
//       setIsTranslating(false);
//     };

//     const showTranslateChanged = showTranslate && !prevShowTranslateRef.current;
//     const targetLangChanged = targetLang !== prevTargetLangRef.current;

//     if (showTranslate && (showTranslateChanged || targetLangChanged)) {
//       fetchAllTranslations();
//     }

//     prevShowTranslateRef.current = showTranslate;
//     prevTargetLangRef.current = targetLang;
//   }, [showTranslate, targetLang, messages, fetchTranslation]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${
//               message.senderId === authUser._id ? "chat-end" : "chat-start"
//             }`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div
//               className={`chat-bubble flex flex-col ${
//                 message.senderId === authUser._id
//                   ? "bg-primary text-primary-content"
//                   : "bg-base-300 text-base-content"
//               }`}
//             >
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}

//               {showTranslate ? (
//                 <>
//                   {isTranslating ? (
//                     <p className="italic text-gray-500">Translating...</p>
//                   ) : translations[message._id] ? (
//                     <p>{translations[message._id]}</p>
//                   ) : (
//                     <p>{message.text}</p>
//                   )}
//                 </>
//               ) : (
//                 message.text && <p>{message.text}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

"use client";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useTranslateStore } from "../store/useTranslateStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const { showTranslate, targetLang, fetchTranslation } = useTranslateStore();

  const messageEndRef = useRef(null);

  // Store translations keyed by message._id
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // To track previous toggle and language for refetching translations
  const prevShowTranslateRef = useRef(false);
  const prevTargetLangRef = useRef(targetLang);

  // Load messages & subscribe
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch translations when toggled on or language changes
  useEffect(() => {
    const fetchAllTranslations = async () => {
      setIsTranslating(true);
      const newTranslations = {};
      for (const message of messages) {
        if (message.text) {
          try {
            const translated = await fetchTranslation(message.text);
            newTranslations[message._id] =
              translated || "⚠️ Could not translate";
          } catch (e) {
            newTranslations[message._id] = "⚠️ Translation failed";
          }
        }
      }
      setTranslations(newTranslations);
      setIsTranslating(false);
    };

    const showTranslateChanged = showTranslate && !prevShowTranslateRef.current;
    const targetLangChanged = targetLang !== prevTargetLangRef.current;

    if (showTranslate && (showTranslateChanged || targetLangChanged)) {
      fetchAllTranslations();
    }

    // If translation toggled off, clear translations
    if (!showTranslate) {
      setTranslations({});
    }

    prevShowTranslateRef.current = showTranslate;
    prevTargetLangRef.current = targetLang;
  }, [showTranslate, targetLang, messages, fetchTranslation]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex flex-col ${
                message.senderId === authUser._id
                  ? "bg-primary text-primary-content"
                  : "bg-base-300 text-base-content"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {/* Always show original message */}
              {message.text && <p>{message.text}</p>}

              {/* Show translation below original if toggled */}
              {showTranslate && (
                <>
                  {isTranslating ? (
                    <p className="italic text-gray-500 mt-1">Translating...</p>
                  ) : translations[message._id] ? (
                    <p className="mt-1 text-sm italic text-gray-600">
                      {translations[message._id]}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
