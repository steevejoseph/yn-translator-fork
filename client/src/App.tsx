import { useState } from 'react'
import './App.css'





// Function to simulate the gradual typing of the response


function App() {

  const [content, setContent] = useState("")
  const [role, setRole] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)




  const submitData = () => {

    setIsLoading(true)

    if (!content || !role) {
      alert("Please fill in both content and role.");
      return;
    }


    const data = {
      content: content,
      role: role
    };



    fetch('https://yn-translator.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setResponse(data.message)


        typeResponseGradually(data.message || 'No message returned');
      })
      .catch((error) => {


        console.error('Error:', error);
        alert('There was an error submitting the data.');
      }).finally(() => {
        setIsLoading(false)
      })
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
        <h2>Submit Content and Role</h2>

        <form >
          <label htmlFor="content">Content:</label>
          <input type="text" required onChange={(e) => setContent(e.target.value)} />
          <br />

          <label htmlFor="role">Role:</label>
          <input type="text" required onChange={(e) => setRole(e.target.value)} />

          <br />

          <button type="button" onClick={() => submitData()}>{isLoading ? "Loading..." : "Submit"
          }</button>
        </form>

        {/* <!-- Text area for displaying the message returned from the POST request --> */}
        <label htmlFor="responseMessage">Response Message:</label>
        <textarea readOnly value={response}></textarea>
      </div>
    </>
  )
}

export default App
