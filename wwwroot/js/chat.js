"use-strict"

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build()

//Disable send button until connection is established
document.getElementById('sendButton').disabled = true

connection.on('RecieveMessage', (user, message) => {
    let msg = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    let encodedMsg = `${user} says ${msg}`;
    let li = document.createElement('li')

    li.textContent = encodedMsg
    document.getElementById('messagesList').appendChild(li)
})

connection.start().then(() => {
    document.getElementById('sendButton').disabled = false;
}).catch((err) => {
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', (event) => {
    let user = document.getElementById('userInput').value;
    let message = document.getElementById('messageInput').value;

    connection.invoke('SendMessage', user, message).catch((err) => {
        return console.error(err.toString());
    });

    event.preventDefault();
});