import React, { useState, useEffect, useRef } from "react";

//Import css module
import classes from "./LiveChat.module.css";

//Import livechat actions
import { liveChatActions } from "../store/live-chat";

//Import from react-redux
import { useSelector, useDispatch } from "react-redux";

//Socket io
import socket from "../utils/socket-io";

//Admin icon
import AdminIcon from "../ui/AdminIcon";

//uuid
import { v4 as uuidv4 } from "uuid";

const LiveChat = () => {
  //Select show live chat state
  const showLiveChat = useSelector((state) => state.liveChat.showLiveChat);

  //dispath
  const dispatch = useDispatch();

  //Click live chat button handler
  const clickLiveChatHandler = () => {
    //Dispatch to toggle showLiveChat state
    dispatch(liveChatActions.toggleShowLiveChat());
  };

  //Message state
  const [message, setMessage] = useState("");

  //Ref container div
  const divRef = useRef();

  //timeout Id
  let timeOutId = useRef();

  //Message state
  const [messages, setMessages] = useState([]);

  //is Starting Chat
  const [isStartingChat, setIsStartingChat] = useState(false);

  //Handle message change
  const messageChangeHandler = (e) => {
    //Set message
    setMessage(e.target.value);
  };

  //Handle submit message
  const handleSubmitMessage = async (e) => {
    //Prevent default behavior
    e.preventDefault();

    //Check empty message
    if (message.trim() === "") {
      return;
    }

    //End command
    if (message.trim().includes("/end")) {
      //Check localStorage
      const data = localStorage.getItem("roomID")
        ? JSON.parse(localStorage.getItem("roomID"))
        : {};
      if (data) {
        socket.emit("message", {
          action: "client-end",
          end: true,
          _id: data._id,
        });
      }
      localStorage.removeItem("roomID");
      //Reset input
      setMessages([]);
      setMessage("");
      setIsStartingChat(false);
      return;
    }

    //Starting chat
    setIsStartingChat(true);

    if (!localStorage.getItem("roomID")) {
      //Init socket io
      socket.emit("message", {
        action: "client-send",
        message: message,
        first: true,
        client: true,
      });
    } else {
      const data = localStorage.getItem("roomID")
        ? JSON.parse(localStorage.getItem("roomID"))
        : {};
      //Handle socket io
      socket.emit("message", {
        action: "client-send",
        message: message,
        _id: data?._id,
        client: true,
      });
    }

    //Scroll to bottom chat
    divRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    //Reset input
    setMessage("");
  };
  useEffect(() => {
    //Scroll to bottom chat
    timeOutId.current = setTimeout(() => {
      divRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
    //Clean up
    return () => {
      //Clear timeout
      clearTimeout(timeOutId.current);
    };
  }, [showLiveChat]);

  //Handle effect socket io
  useEffect(() => {
    //Get roomId from localStorage
    const clientMsgs = localStorage.getItem("roomID")
      ? JSON.parse(localStorage.getItem("roomID"))
      : {};

    if (clientMsgs) {
      //Get messages from localStorage
      const getMessages = clientMsgs?.messages;
      //Set state
      setMessages(getMessages);
    }

    //Handle message event
    const handleMessageEvent = (data) => {
      if (data.action === "server-send") {
        if (isStartingChat || localStorage.getItem("roomID")) {
          if (!data.client) {
            //Scroll to bottom chat
            setTimeout(() => {
              divRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }, 100);
          }

          //Get roomId from localStorage
          const clientMsgs = localStorage.getItem("roomID")
            ? JSON.parse(localStorage.getItem("roomID"))
            : {};
          //Create new room
          if (!clientMsgs._id) {
            const roomInfo = {
              _id: data._id,
              messages: [
                {
                  message: data.message,
                  client: data.client,
                },
              ],
            };
            setMessages(roomInfo.messages);

            //Save to localStorage
            localStorage.setItem("roomID", JSON.stringify(roomInfo));
          } else {
            if (clientMsgs._id.toString() === data._id.toString()) {
              const roomInfo = {
                ...clientMsgs,
                messages: [
                  ...clientMsgs.messages,
                  { message: data.message, client: data.client },
                ],
              };
              setMessages((prevMessage) => {
                if (!prevMessage) {
                  return [data.message];
                }
                return [
                  ...prevMessage,
                  { message: data.message, client: data.client },
                ];
              });

              //Save to localStorage
              localStorage.setItem("roomID", JSON.stringify(roomInfo));
            }
          }
        }
      }

      //Set admin messages
    };

    //Listener message event
    socket.on("message", handleMessageEvent);

    //Clean up func
    return () => {
      //Clean up message event
      socket.off("message", handleMessageEvent);
    };
  }, [isStartingChat]);

  return (
    <div className={classes["live-chat"]}>
      <button
        className={
          showLiveChat
            ? `${classes["live-chat-btn"]} ${classes.active}`
            : classes["live-chat-btn"]
        }
        onClick={clickLiveChatHandler}
      >
        <i className="fa-brands fa-facebook-messenger"></i>
      </button>
      {/* Render live chat popup */}
      {showLiveChat && (
        <div className={classes["livechat-popup"]}>
          <div className={classes.container}>
            <div className={classes.title}>
              <h3>Customer Support</h3>
              <button>Let's Chat App</button>
            </div>
            <div className={classes.content}>
              {messages?.length > 0 && (
                <>
                  <div ref={divRef} className={classes.bottom}>
                    {messages.map((messageItem) => (
                      <div key={uuidv4()}>
                        {!messageItem.client && (
                          <>
                            <p className={classes.icon}>
                              <i>
                                <AdminIcon />
                              </i>
                            </p>
                            <p className={classes.admin}>
                              Cộng tác viên: {messageItem.message}
                            </p>
                          </>
                        )}
                        {messageItem.client && (
                          <>
                            <p className={classes.client}>
                              <span> You: {messageItem.message}</span>
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className={classes.message}>
              <p className={classes.icon}>
                <i>
                  <AdminIcon />
                </i>
              </p>
              <form onSubmit={handleSubmitMessage}>
                <input
                  placeholder="Enter Message!"
                  type="text"
                  value={message}
                  onChange={messageChangeHandler}
                />
                <button type="submit">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
