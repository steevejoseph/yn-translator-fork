import { useState } from 'react'
import './chat.css'

const FLASK_URL = 'http://localhost:8080';
// const FLASK_URL = 'https://yn-translator.onrender.com/chat';
// Function to simulate the gradual typing of the response

const Chat = (props: { search: string }) => {
  console.log(props.search)
  // const name = props.search.split("=")[1]
  const nameRegex = /\?name=/g;
  const name = props.search.replace(nameRegex, "")
  const [content, setContent] = useState("")
  const [role, setRole] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const onPing = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${FLASK_URL}/api/ping`);
      console.log("res:", response)
    }
    catch (e) {
      alert(e);
    }

    setIsLoading(false);
  }

  const submitData = async () => {

    setIsLoading(true)

    if (!content || !role) {
      alert("Please fill in both content and role.");
      setIsLoading(false);
      return;
    }

    const data = {
      content: content,
      role: role
    };

    try {
      const response = await fetch(FLASK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Success:', data);
      setResponse(responseData.message)
      typeResponseGradually(responseData.message || 'No message returned');
    }
    catch (e) {

      console.error('Error:', e);
      alert('There was an error submitting the data.');
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
  }
  function typeResponseGradually(message: string) {

    setResponse(""); // Clear any previous text
    let index = -1;
    const speed = 50; // Speed of typing effect in milliseconds

    function typeChar() {
      if (index < message.length) {

        setResponse((prev) => { return prev + message.charAt(index) })
        index++;
        setTimeout(typeChar, speed); // Recursively call to add the next character
      }
    }

    typeChar(); // Start the typing effect
  }

  return (
    <>
      <div className="container">
        <h2>Welcome {name}</h2>

        <form >
          <label htmlFor="content">Content:</label>
          <input type="text" required onChange={(e) => setContent(e.target.value)} />
          <br />

          <label htmlFor="role">Role:</label>
          <input type="text" required onChange={(e) => setRole(e.target.value)} />

          <br />

          <div className="button-container" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space between"

          }}>
            <button type="button" style={{ margin: "1em" }} onClick={() => onPing()}>{isLoading ? "Pinging..." : "Ping"
            }</button>

            <button type="button" style={{ margin: "1em" }} onClick={() => submitData()}>{isLoading ? "Loading..." : "Submit"
            }</button>

          </div>
        </form>

        {/* <!-- Text area for displaying the message returned from the POST request --> */}
        <label htmlFor="responseMessage">Response Message:</label>
        <textarea readOnly value={response}></textarea>
      </div>
    </>
  )
}

export default Chat
