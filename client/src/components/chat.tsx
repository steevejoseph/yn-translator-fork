import { useState } from "react";
import "./chat.css";

const FLASK_URL = "http://localhost:8080";
// const FLASK_URL = 'https://yn-translator.onrender.com/chat';
// Function to simulate the gradual typing of the response

const Chat = () => {
  const [content, setContent] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPing = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${FLASK_URL}/api/ping`);
      console.log("res:", response);
    } catch (e) {
      alert(e);
    }

    setIsLoading(false);
  };

  const submitData = async () => {
    setIsLoading(true);

    if (!content || !role) {
      alert("Please fill in both content and role.");
      setIsLoading(false);
      return;
    }

    const data = {
      content: content,
      role: role,
    };

    try {
      const response = await fetch(FLASK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Success:", data);
      setResponse(responseData.message);
      typeResponseGradually(responseData.message || "No message returned");
    } catch (e) {
      console.error("Error:", e);
      alert("There was an error submitting the data.");
    }

    setIsLoading(false);

    // fetch(FLASK_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //     setResponse(data.message)

    //     typeResponseGradually(data.message || 'No message returned');
    //   })
    //   .catch((error) => {

    //     console.error('Error:', error);
    //     alert('There was an error submitting the data.');
    //   }).finally(() => {
    //     setIsLoading(false)
    //   })
  };
  function typeResponseGradually(message: string) {
    setResponse(""); // Clear any previous text
    let index = -1;
    const speed = 50; // Speed of typing effect in milliseconds

    function typeChar() {
      if (index < message.length) {
        setResponse((prev) => {
          return prev + message.charAt(index);
        });
        index++;
        setTimeout(typeChar, speed); // Recursively call to add the next character
      }
    }

    typeChar(); // Start the typing effect
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <h1 className="chat-title">AI Chat Interface</h1>

        <div className="chat-form">
          <div className="chat-input-group">
            <label className="chat-label">Content</label>
            <input
              className="chat-input"
              type="text"
              placeholder="Type your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="chat-input-group">
            <label className="chat-label">Role</label>
            <input
              className="chat-input"
              type="text"
              placeholder="e.g., Helpful Assistant, Teacher, Expert..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="chat-button-container">
            <button
              className="chat-button"
              onClick={onPing}
              disabled={isLoading}
            >
              {isLoading ? "Pinging..." : "Ping"}
            </button>

            <button
              className="chat-button primary"
              onClick={submitData}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </div>

          <div className="chat-response-group">
            <label className="chat-label">Response</label>
            <textarea
              className="chat-textarea"
              readOnly
              value={response}
              placeholder="AI response will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
