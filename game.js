window.onload = function() {
    const userInput = document.getElementById('user_input');
    const inputArea = document.getElementById('input-area');
    const outputDiv = document.getElementById('output');
    const typingSpeed = 50; // Speed of typing effect in milliseconds

    // Initialize Map instance
    const map = new Map();

    // State variable to track if typing is in progress
    let isTyping = false;

    // Automatically focus the hidden input field
    userInput.focus();

    // Print the initial greeting message with typing effect
    typeMessage('Hello, World!', typingSpeed, () => {
        // Allow user to input after the greeting message is fully printed
        userInput.addEventListener('keydown', handleKeyPress);
    });

    function handleKeyPress(event) {
        if (isTyping) {
            // Prevent input if typing is in progress
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            const command = inputArea.textContent.trim(); // Get the command from the display area
            processCommand(command);
            userInput.value = ''; // Clear the hidden input field
            inputArea.textContent = ''; // Clear the displayed input
        } else if (event.key === 'Backspace') {
            inputArea.textContent = inputArea.textContent.slice(0, -1); // Remove last character
        } else if (event.key.length === 1) { // Only add visible characters
            inputArea.textContent += event.key;
        }

        // Prevent any default behavior (like moving the cursor)
        event.preventDefault();
    }

    function typeMessage(message, speed, callback) {
        let i = 0;
        isTyping = true; // Set typing flag to true

        function type() {
            if (i < message.length) {
                // Append character to the output
                const lastChild = outputDiv.lastElementChild;
                lastChild.innerHTML += message[i];
                scrollToBottom(); // Ensure the page scrolls to the bottom
                i++;
                setTimeout(type, speed);
            } else {
                // Add a new line after the message is finished
                outputDiv.innerHTML += '<div></div>'; // Add new line
                scrollToBottom(); // Ensure the page scrolls to the bottom
                isTyping = false; // Set typing flag to false
                if (callback) {
                    callback(); // Call the callback function once typing is complete
                }
            }
        }

        // Add a new line to start
        outputDiv.innerHTML += '<div></div>'; // Add initial empty line
        scrollToBottom(); // Ensure the page scrolls to the bottom
        type();
    }

    function scrollToBottom() {
        outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom of the output div
    }

    function processCommand(input) {
        let response = '';

        if (input === 'look') {
            response = `You see: ${map.get().join(', ')}`;
        } else if (input === 'turn left') {
            map.turn('left');
            response = `Turned left. Now facing ${map.direction}.`;
        } else if (input === 'turn right') {
            map.turn('right');
            response = `Turned right. Now facing ${map.direction}.`;
        } else if (input === 'step') {
            map.step(); // Move one step in the current direction
            response = `Stepped forward. Now at position ${map.position.join(', ')}. You see: ${map.get().join(', ')}`;
        } else {
            response = 'I don\'t understand that command.';
        }

        // Append the command and response to the output
        outputDiv.innerHTML += `<div>$ ${input}</div>`; // Print the command
        typeMessage(response, typingSpeed); // Print the response with typing effect
    }
};
