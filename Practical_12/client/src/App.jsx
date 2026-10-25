
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    const handleMessage = (data) => {
      setMessages((previous) => [
        ...previous,
        {
          ...data,
          id: `${Date.now()}-${Math.random()}`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("receive_message", handleMessage);

    setConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("receive_message", handleMessage);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = (e) => {
    e.preventDefault();

    if (name.trim()) {
      setUsername(name.trim());
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !username || !connected) return;

    socket.emit("send_message", {
      name: username,
      message: message.trim(),
    });

    setMessage("");
  };

  return (
    <main className="app">
      <section className="chat-card">
        <header className="chat-header">
          <div className="brand">
            <div className="brand-icon">✉</div>
            <div>
              <h1>ChatFlow</h1>
              <p>Real-time messaging</p>
            </div>
          </div>

          <div className="connection">
            <span className={`status-dot ${connected ? "online" : ""}`}></span>
            {connected ? "Connected" : "Connecting..."}
          </div>
        </header>

        {!username ? (
          <div className="welcome">
            <div className="welcome-icon">💬</div>
            <h2>Welcome to ChatFlow</h2>
            <p>Enter your name and start chatting instantly.</p>

            <form className="join-form" onSubmit={joinChat}>
              <label htmlFor="username">Your name</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                required
              />

              <button type="submit" disabled={!connected}>
                Join Chat <span>→</span>
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="chat-info">
              <div className="avatar">
                {username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{username}</h2>
                <p>You're ready to chat</p>
              </div>

              <button
                className="change-name"
                onClick={() => setUsername("")}
                type="button"
              >
                Change name
              </button>
            </div>

            <div className="messages">
              {messages.length === 0 ? (
                <div className="empty-chat">
                  <div>👋</div>
                  <h3>Say hello!</h3>
                  <p>Your conversation starts here.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.name === username;

                  return (
                    <div
                      className={`message-row ${isOwn ? "own-row" : ""}`}
                      key={msg.id}
                    >
                      <div
                        className={`message-bubble ${
                          isOwn ? "own-message" : "other-message"
                        }`}
                      >
                        <strong>{msg.name}</strong>
                        <p>{msg.message}</p>
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  );
                })
              )}

              <div ref={bottomRef}></div>
            </div>

            <form className="message-form" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                aria-label="Message"
              />

              <button
                type="submit"
                disabled={!message.trim() || !connected}
                aria-label="Send message"
              >
                <span>➤</span>
              </button>
            </form>

            <p className="chat-footer">
              <span>🔒</span> Stay connected, share your thoughts
            </p>
          </>
        )}
      </section>

      <footer className="page-footer">
        Powered by <strong>React</strong> and <strong>Socket.IO</strong>
      </footer>
    </main>
  );
}

export default App;

