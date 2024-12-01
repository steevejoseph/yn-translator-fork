function printValue(event) {
    for (let i = 0; i < 10; i++)
        console.log("value:", event.target.value, i)

}

function submitData() {
    // Get values from the input fields
    const content = document.getElementById('content').value;
    const role = document.getElementById('role').value;
    const button = document.getElementById('SubmitButton');
    console.log(`Heres what im printing out:`, button.innerText)
    button.innerText = "Loading..." 
    // Check if both fields have values
    if (!content || !role) {
        alert("Please fill in both content and role.");
        return;
    }

    // Create the data object
    const data = {
        content: content,
        role: role
    };


    //  start spinner
    // 

    // Make the POST request using fetch
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
            button.innerText = "Submit" 
            // end spinner 
            // Call the function to simulate gradual message typing
            typeResponseGradually(data.message || 'No message returned');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting the data.');
        });
}

// Function to simulate the gradual typing of the response
function typeResponseGradually(message) {
    const textarea = document.getElementById('responseMessage');
    textarea.value = ''; // Clear any previous text
    let index = 0;
    const speed = 50; // Speed of typing effect in milliseconds

    function typeChar() {
        if (index < message.length) {
            textarea.value += message.charAt(index);
            index++;
            setTimeout(typeChar, speed); // Recursively call to add the next character
        }
    }

    typeChar(); // Start the typing effect
}
