"use client";
import React, { useEffect, useState } from "react";
import { Client as StompClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useGlobal } from "../contexts/GlobalContext";

let stompClient = null;

const Chat = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const { username } = useGlobal();

  const [userData, setUserData] = useState({
    username: username,
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
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
        `/user/${userData.username}/private`,
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

  const registerUser = () => {
    connect();
  };

  return (
      <div className="container mx-auto p-6 min-h-screen text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200">
        {userData.connected ? (
            <div className="chat-box flex flex-col md:flex-row bg-white rounded-lg shadow-lg h-[90vh] overflow-hidden">
              {/* Sidebar */}
              <div className="member-list w-full md:w-1/4 bg-gray-800 text-white">
                <Link href="Dashboard">
                  <ArrowLeft className="text-gray-300 hover:text-white m-4 cursor-pointer" />
                </Link>
                <ul className="mt-4">
                  <li
                      onClick={() => setTab("CHATROOM")}
                      className={`cursor-pointer p-4 flex items-center hover:bg-gray-700 ${
                          tab === "CHATROOM" && "bg-gray-700 font-semibold"
                      }`}
                  >
                    <MessageCircle className="mr-2" />
                    Forum
                  </li>
                  {[...privateChats.keys()].map((name, index) => (
                      <li
                          key={index}
                          onClick={() => setTab(name)}
                          className={`cursor-pointer p-4 flex items-center hover:bg-gray-700 ${
                              tab === name && "bg-gray-700 font-semibold"
                          }`}
                      >
                        <MessageCircle className="mr-2" />
                        {name}
                      </li>
                  ))}
                </ul>
              </div>

              {/* Chat Content */}
              <div className="chat-content flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {tab === "CHATROOM" ? "Forum" : tab}
                  </h2>
                  <span>Logged in as: {userData.username}</span>
                </div>

                {/* Messages */}
                <ul className="flex-1 p-4 overflow-y-auto space-y-4">
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
                            <div
                                className={`p-3 rounded-lg shadow ${
                                    chat.senderName === userData.username
                                        ? "bg-blue-400 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              <p className="text-sm font-medium">{chat.message}</p>
                            </div>
                          </li>
                      )
                  )}
                </ul>

                {/* Input Box */}
                <div className="flex items-center bg-gray-100 p-4">
                  <input
                      type="text"
                      placeholder="Enter your message"
                      value={userData.message}
                      onChange={handleMessage}
                      className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                      onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
        ) : (
            <div className="register max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
              <Link href="Dashboard">
                <ArrowLeft className="text-gray-500 hover:text-gray-800 transition cursor-pointer mb-4" />
              </Link>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                Logged in as: {username}
              </p>
              <button
                  type="button"
                  onClick={registerUser}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                Connect
              </button>
            </div>
        )}
      </div>
  );
};

export default Chat;
