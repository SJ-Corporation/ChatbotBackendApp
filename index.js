const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server);
const axios = require('axios');

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/www/js/index.js');
});
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/www/css/style.css');
});
app.get('/chatbot', (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});
app.get('/chatbot.css', (req, res) => {
  res.sendFile(__dirname + '/www/css/chatbot.css');
});
app.get('/chatpage.css', (req, res) => {
  res.sendFile(__dirname + '/www/css/chatpage.css');
})

app.post('/personal', (req, res) => {
  let param = req.params;
  console.log(param);
  res.sendFile(__dirname + '/www/chatpage.html');
})

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

io.on('connection', async (socket) => {
  await delay(1500);
  socket.emit('chat reply', 'Hi, It\'s AskBot')
  await delay(1500);
  socket.emit('chat reply', 'How can I help you today?')
  socket.on('chat message', (chat) => {
    let result = '';
    axios.get('https://chatbot-req-res-app-python.azurewebsites.net/api/chatbottrigger?question='+chat)
        .then(res => {
          socket.emit('chat reply', res.data)
        }).catch(err => {
          console.log(err)
        })
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});