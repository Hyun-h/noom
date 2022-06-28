const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to sever!");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Sever!");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  console.log(input.value);
}

messageForm.addEventListener("submit", handleSubmit);
