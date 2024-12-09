"use client";
import React, { useEffect, useState } from "react";
import { Client as StompClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useGlobal } from "../../contexts/GlobalContext";
import Header from "../Header/Header";

let stompClient = null;

const Chat = () => {
  const { userType, name } = useGlobal();
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");

  const [userData, setUserData] = useState({
    username: name,
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
    setUserData({ ...userData, connected: true, username: name });
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

  useEffect(() => {
    setUserData({ ...userData, username: name });
  }, [name]);
  return (
    <div className="w-screen min-h-screen p-4 text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200">
      <Header />
      {userData.connected ? (
        <div className="chat-box flex flex-col md:flex-row border border-gray-300 shadow-lg overflow-hidden mt-[140px] rounded-3xl">
          {/* Member List */}
          <div className="member-list w-full md:w-1/4 bg-gradient-to-tl pt-[45px] from-gray-900 to-gray-700 text-white p-6 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">Logged in as {name}</h2>
            <h2 className="text-xl font-semibold mb-4">Chats</h2>
            <ul className="space-y-2">
              <li
                onClick={() => setTab("CHATROOM")}
                className={`cursor-pointer p-3 rounded-xl hover:bg-gray-600 transition  flex gap-x-2 ${
                  tab === "CHATROOM" ? "bg-gray-600 font-semibold" : ""
                }`}
              >
                <MessageCircle />
                Forum
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  key={index}
                  onClick={() => setTab(name)}
                  className={`cursor-pointer p-3 hover:bg-gray-600 transition flex gap-x-2 rounded-xl ${
                    tab === name ? "bg-gray-600 font-semibold" : ""
                  }`}
                >
                  <MessageCircle />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Content */}
          <div className="chat-content flex-1 p-6 bg-gradient-to-br from-white to-gray-100">
            <ul className="space-y-4 flex flex-col justify-end overflow-y-auto h-[calc(100vh-200px)] md:h-[calc(100vh-300px)]">
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
                      <div className="p-2 bg-gray-300 rounded-full text-sm shadow mr-3 flex justify-center items-center min-w-14">
                        {chat.senderName}
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-3xl shadow-md ${
                        chat.senderName === userData.username
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      } max-w-xs break-words`}
                    >
                      {chat.message}
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 flex items-center">
              <input
                type="text"
                className="flex-1 p-3 rounded-l-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the message"
                value={userData.message}
                onChange={handleMessage}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-3 rounded-r-full hover:bg-blue-600 transition"
                onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="register max-w-md mx-auto p-8  bg-white  rounded-xl shadow-2xl  text-center mt-[140px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Logged In As
          </h2>
          <input
            id="user-name"
            placeholder="Enter your name"
            disabled
            name="userName"
            value={name}
            className="w-full p-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition mb-6 text-gray-700 font-medium"
          />
          <button
            type="button"
            onClick={registerUser}
            className="bg-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
