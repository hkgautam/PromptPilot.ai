const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const introDiv = document.getElementById('welcome-div');

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        userInput.value = '';

        if (introDiv) {
            introDiv.style.display = 'none';
        }

        // Simulate GPT response (Replace with actual API call to your GPT model)
        setTimeout(() => {
            getGPTResponse(userMessage);
            // addMessage(`You said: "${userMessage}"`, 'bot');
        }, 1000);
    }
});

function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);

    const iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    if (type === 'user') {
        iconElement.src = './user.png'; // Replace with user icon
    } else {
        iconElement.src = './ai.png'; // Replace with bot icon
    }

    const messageText = document.createElement('span');
    messageText.classList.add('message-text');
    messageText.textContent = message;

    messageElement.appendChild(iconElement);
    messageElement.appendChild(messageText);
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}



// Function to send a request to your custom GPT API
async function getGPTResponse(userMessage) {
    try {
        const response = await fetch('https://api.example.com/gpt', { // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your API key if necessary
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 100, // You can adjust this based on your API's parameters
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const botMessage = data.choices[0].text.trim(); // Adjust based on your API's response format
            addMessage(botMessage, 'bot');
        } else {
            // Handle any API errors
            addMessage("Sorry, there was an issue with the response. Please try again later.", 'bot');
        }
    } catch (error) {
        console.error("Error:", error);
        addMessage("Sorry, something went wrong. Please try again later.", 'bot');
    }
}