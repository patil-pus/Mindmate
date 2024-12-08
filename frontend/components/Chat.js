"use client";
import React, { useEffect, useState } from "react";
import { Client as StompClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useGlobal } from "../contexts/GlobalContext";

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
    console.log("payload", payload);

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
    <div className="w-screen h-screen p-4 text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200">
      {userData.connected ? (
        <div className="chat-box h-full flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {/* Back Link */}
          <Link
            href={userType == "client" ? "Dashboard" : "TherapistDashboard"}
            className="absolute top-4 left-4 p-[11px] flex items-center space-x-2 text-gray-500 hover:text-gray-800 transition cursor-pointer font-semibold text-lg"
          >
            <ArrowLeft /> Back to {name}'s Dashboard
          </Link>

          {/* Member List */}
          <div className="member-list w-full md:w-1/4 bg-gradient-to-tl pt-[45px] from-gray-900 to-gray-700 text-white p-6">
            <h2 className="text-xl font-semibold mb-4">Chats</h2>
            <ul className="space-y-2">
              <li
                onClick={() => setTab("CHATROOM")}
                className={`cursor-pointer p-3 rounded-lg hover:bg-gray-600 transition  flex gap-x-2 ${
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
                  className={`cursor-pointer p-3 rounded-lg hover:bg-gray-600 transition flex gap-x-2 ${
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
            <ul className="space-y-4 h-[85vh] flex flex-col-reverse overflow-y-auto">
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
                      <div className="p-2 bg-gray-300 rounded-full text-sm shadow mr-3 flex justify-center items-center">
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
        <div className="register max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <Link
            href={userType == "client" ? "Dashboard" : "TherapistDashboard"}
            className="flex mb-6"
          >
            <ArrowLeft className="text-gray-500 hover:text-gray-800 transition cursor-pointer" />{" "}
            Back to Dashboard
          </Link>
          <h2 className="text-xl font-semibold mb-4">Logged in as</h2>
          <input
            id="user-name"
            placeholder="Enter your name"
            disabled
            name="userName"
            value={name}
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="button"
            onClick={registerUser}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
