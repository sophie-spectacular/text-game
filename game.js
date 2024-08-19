window.onload = function() {
    const userInput = document.getElementById('user_input');
    const inputArea = document.getElementById('input-area');
    const outputDiv = document.getElementById('output');
    const typingSpeed = 1;
    const map = new Map();
    let isTyping = false;
    userInput.focus();

    typeMessage('hello, worldly traveler. you have landed at sophie\'s beach. feel free to explore! type "help"', typingSpeed, () => {
        userInput.addEventListener('keydown', handleKeyPress);
    });
    function handleKeyPress(event) {
        if (isTyping) {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            const command = inputArea.textContent.trim(); //get command
            processCommand(command);
            userInput.value = '';
            inputArea.textContent = '';
        } else if (event.key === 'Backspace') {
            inputArea.textContent = inputArea.textContent.slice(0, -1);
        } else if (event.key.length === 1) {
            inputArea.textContent += event.key;
        }

        event.preventDefault();
    }

    function typeMessage(message, speed, callback) {
        let i = 0;
        isTyping = true;
        function type() {
            if (i < message.length) {
                const lastChild = outputDiv.lastElementChild;
                lastChild.innerHTML += message[i];
                scrollToBottom();
                i++;
                setTimeout(type, speed);
            } else {
                outputDiv.innerHTML += '<div></div>';
                scrollToBottom();
                isTyping = false;
                if (callback) {
                    callback();
                }
            }
        }

        outputDiv.innerHTML += '<div></div>';
        scrollToBottom();
        type();
    }

    function scrollToBottom() {
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    function processCommand(input) {
        let response = '';

        if (input === 'step') {
            map.step();
            response = `now at (${map.position.join(', ')}).`;
        } else if (input === 'turn left') {
            map.turn('left');
            response = `now facing ${map.direction}.`;
        } else if (input === 'turn right') {
            map.turn('right');
            response = `now facing ${map.direction}.`;
        } else if (input === 'help') {
            response = `"step": go forward\n"turn left"/"turn right": change direction\n"open": open doors\n"inspect": get more info on object`;
        } else {
            response = 'I don\'t understand that command.';
        }

        outputDiv.innerHTML += `<div>$ ${input}</div>`;
        typeMessage(response, typingSpeed);
    }
};
