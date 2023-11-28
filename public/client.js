const socket = io();

let names;

let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message_area');

do {
    names = prompt("Please Enter Your Name")
} while (!names)

textarea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }

})

function sendMessage(message) {

    let msg = {
        user: names,
        message: message.trim()

    }

    // append to the dom
    appendMessage(msg, "outgoing");
    scroll();

    textarea.value = '';

    // send to server
    socket.emit('message', msg);

}

function appendMessage(msg, type) {

    let mainDiv = document.createElement('div');

    let className = type

    mainDiv.classList.add(className, "message");

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;

    messageArea.appendChild(mainDiv)

}

// recieve messages
socket.on('message', (msg) => {
    appendMessage(msg, "incoming");
    scroll();
})

function scroll() {
    messageArea.scrollTop = messageArea.scrollHeight;
}