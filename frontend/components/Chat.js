"use client";
import React, { useEffect, useState } from "react";
import { Client as StompClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGlobal } from "../contexts/GlobalContext";

let stompClient = null;

const Chat = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const { username } = useGlobal();


  const [userData, setUserData] = useState({
    username: username ,
    receivername: "",
    connected: false,
    message: "",
  });



  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = new StompClient({
      webSocketFactory: () => Sock,
      onConnect: onConnected,
      onStompError: onError,
    });
    stompClient.activate();
  };

  const onConnected = () => {
    
    setUserData({ ...userData, connected: true, username: username });
    // console.log('inside on conn',userData);
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.publish({
      destination: "/app/message",
      body: JSON.stringify(chatMessage),
    });
  };

  const onMessageReceived = (payload) => {
    console.log('payload',payload);
    
    const payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [payloadData];
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.error(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify(chatMessage),
      });
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.publish({
        destination: "/app/private-message",
        body: JSON.stringify(chatMessage),
      });
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = () => {
    // const { value } = event.target;
    // setUserData({ ...userData, username: username });
  };

  const registerUser = () => {
    connect();
  };
useEffect(() => {
  console.log('userData', userData);
  
}, [userData])

  useEffect(() => {
    setUserData({ ...userData, username: username });
    // // console.log(username);
    // registerUser();
  }, [username]);

  return (
    <div className="container mx-auto p-4 min-h-screen text-gray-800 bg-white">
    {userData.connected ? (
      <div className="chat-box h-[95vh] flex flex-col md:flex-row h-full border border-gray-300 rounded-lg shadow-lg">
        <Link href="Dashboard">
          <ArrowLeft className="text-gray-500 hover:text-gray-800 transition cursor-pointer mb-4" />
        </Link>
        <div className="member-list w-full md:w-1/4 border-b md:border-r border-gray-300 p-4">
          <ul>
            <li
              onClick={() => setTab("CHATROOM")}
              className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 ${
                tab === "CHATROOM" && "bg-gray-200 font-semibold"
              }`}
            >
              Forum
            </li>
            {[...privateChats.keys()].map((name, index) => (
              <li
                key={index}
                onClick={() => setTab(name)}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 ${
                  tab === name && "bg-gray-200 font-semibold"
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-content flex-1 p-4">
          <ul className="space-y-4 h-[85vh] flex justify-end flex-col">
            {(tab === "CHATROOM" ? publicChats : privateChats.get(tab)).map(
              (chat, index) => (
                <li
                  key={index}
                  className={`flex ${
                    chat.senderName === userData.username
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {chat.senderName !== userData.username && (
                    <div className="p-2 bg-gray-200 rounded-lg mr-2">
                      {chat.senderName}
                    </div>
                  )}
                  <div
                    className={`p-2 rounded-lg ${
                      chat.senderName === userData.username
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {chat.message}
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-l-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the message"
              value={userData.message}
              onChange={handleMessage}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
              onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="register max-w-sm mx-auto bg-gray-50 p-4 rounded-lg shadow-lg text-center">
        <Link href="Dashboard">
          <ArrowLeft className="text-gray-500 hover:text-gray-800 transition cursor-pointer mb-4" />
        </Link>
        <input
          id="user-name"
          placeholder="Enter your name"
          name="userName"
          value={username}
          className="w-full p-2 rounded bg-gray-100 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="button"
          onClick={registerUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Connect
        </button>
      </div>
    )}
  </div>

  );
};

export default Chat;
