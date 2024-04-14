"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Django Channels WebSocket URL

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<any>('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios.get('http://localhost:8000/api/users/') // Example Django API endpoint
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Send login information to server
    const username = prompt('Enter your username:');
    socket.emit('login', username);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', inputMessage);
    setInputMessage('');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Chat Application</h1>
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mr-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>

      <h2 className="text-2xl font-bold mt-8">Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-2">{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
