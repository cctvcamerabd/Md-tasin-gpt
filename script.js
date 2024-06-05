const API_KEY = 'sk-proj-6QRxXZ5OQi5Kokv6CproT3BlbkFJKjRS0gxiTvp2yPHgdxqz';  // Replace with your OpenAI API key

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display user message
    displayMessage(userInput, 'user');

    // Clear input field
    document.getElementById('user-input').value = '';

    // Prepare the message for the API
    const message = {
        role: "user",
        content: userInput
    };

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-002",
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();

    // Display the API response
    displayMessage(data.choices[0].text.trim(), 'bot');
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
