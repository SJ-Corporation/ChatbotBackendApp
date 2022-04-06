const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server);
const axios = require('axios');
require('dotenv').config()
const path = require('path');
const dialogFlowService = require('./src/services/dialogFlowService')

app.use(cors());

app.get('/startup.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/js/index.js'));
})

app.get('/startup.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/css/style.css'));
})

app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/chatbot.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/css/chatbot.css'));
})

app.post('/startchat', (req, res) => {
  let param = req.params;
  console.log(param);
  res.sendFile(path.join(__dirname + '/public/chatpage.html'));
})

app.get('/startchat.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/css/chatpage.css'));
})

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

io.on('connection', async (socket) => {
  await delay(1000);
  socket.emit('chat reply', 'Hi, I\'m AskBot')
  await delay(1000);
  socket.emit('chat reply', 'How can I help you today?')
  socket.on('chat message', (chat) => {
    dialogFlowService.detectIntentText(chat, socket.id).then(obj =>  {
      if(obj.length != 0){
        obj.forEach(async element => {
          await delay(1000).then(() => {
            if(element != ''){
              socket.emit('chat reply', element)
            }
          })
        });
      }else{
        axios.get('https://chatbot-req-res-app-python.azurewebsites.net/api/chatbottrigger?question='+chat)
          .then(async res => {
            await delay(1000).then(() => {
              if(res.data != ''){
                socket.emit('chat reply', res.data)
              }
            })
          }).catch(err => {
            console.log(err)
          })
      }
    }).catch(err => {
      axios.get('https://chatbot-req-res-app-python.azurewebsites.net/api/chatbottrigger?question='+chat)
          .then(async res => {
            await delay(1000).then(() => {
              if(res.data != ''){
                socket.emit('chat reply', res.data)
              }
            })
          }).catch(err => {
            console.log(err)
          })
    })
    
    
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(process.env.PORT, () => {
  console.log('listening on *:3000');
});