import React, { useEffect, useState } from 'react';
import { Client as StompClient } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

let stompClient = null;

const Chat = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
   
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = new StompClient({
            webSocketFactory: () => Sock,
            onConnect: onConnected,
            onStompError: onError,
        });
        stompClient.activate();
    };

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    };

    const userJoin = () => {
        const chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.publish({
            destination: "/app/message",
            body: JSON.stringify(chatMessage)
        });
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
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
        setUserData({...userData, "message": value});
    };

    const sendValue = () => {
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.publish({
                destination: "/app/message",
                body: JSON.stringify(chatMessage)
            });
            setUserData({...userData, "message": ""});
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };
            
            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.publish({
                destination: "/app/private-message",
                body: JSON.stringify(chatMessage)
            });
            setUserData({...userData, "message": ""});
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({...userData, "username": value});
    };

    const registerUser = () => {
        connect();
    };

    return (
        <div className="container mx-auto p-4 min-h-screen  text-gray-200">
          <Link href="Dashboard" >
          <ArrowLeft />
          </Link>
            {userData.connected ? (
                <div className="chat-box flex flex-col md:flex-row h-full border border-gray-700 rounded-lg shadow-lg">
                    <div className="member-list w-full md:w-1/4 border-b md:border-r border-gray-700 p-4">
                        <ul>
                            <li 
                                onClick={() => { setTab("CHATROOM") }} 
                                className={`member cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${tab === "CHATROOM" && "bg-gray-700 text-white font-semibold"}`}
                            >
                                Forum
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li 
                                    onClick={() => { setTab(name) }} 
                                    className={`member cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${tab === name && "bg-gray-700 text-white font-semibold"}`} 
                                    key={index}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="chat-content flex-1 p-4">
                        <ul className="chat-messages space-y-4">
                            {(tab === "CHATROOM" ? publicChats : privateChats.get(tab)).map((chat, index) => (
                                <li 
                                    className={`message flex items-center ${chat.senderName === userData.username ? "justify-end" : ""}`} 
                                    key={index}
                                >
                                    {chat.senderName !== userData.username && (
                                        <div className="avatar bg-gray-600 text-white p-2 rounded-full mr-2">{chat.senderName}</div>
                                    )}
                                    <div className={`message-data p-2 rounded-lg ${chat.senderName === userData.username ? "bg-blue-500 text-white" : "bg-gray-800"}`}>
                                        {chat.message}
                                    </div>
                                    {chat.senderName === userData.username && (
                                        <div className="avatar self bg-blue-500 text-white p-2 rounded-full ml-2">{chat.senderName}</div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message mt-4 flex">
                            <input 
                                type="text" 
                                className="input-message flex-1 p-2 rounded-l-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter the message" 
                                value={userData.message} 
                                onChange={handleMessage} 
                            />
                            <button 
                                type="button" 
                                className="send-button bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
                                onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="register max-w-sm mx-auto bg-gray-800 p-4 rounded-lg shadow-lg text-center">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button 
                        type="button" 
                        id='myBtn'
                        onClick={registerUser}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Connect
                    </button> 
                </div>
            )}
        </div>
    );
    
}

export default Chat;