var head = document.getElementsByTagName('HEAD')[0];
var body = document.getElementsByTagName('body')[0];

const $ = (id) => {
    return document.getElementById(id);
}
const newE = (type) => {
    return document.createElement(type)
}

function openChatbot(){
    $('it-if-iContainer').style.display = 'block'
}
function closeChatbot(){
    $('it-if-iContainer').style.display = 'none'
}

let link = newE('link')
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '/www/css/style.css';
head.appendChild(link);

head.innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>';
head.innerHTML += '<script src="https://kit.fontawesome.com/c11ddac06e.js" crossorigin="anonymous"></script>';


let chatButton = document.createElement('button')
chatButton.innerHTML = 'Chat Now &nbsp&nbsp<i class="fas fa-solid fa-robot"></i>';
chatButton.setAttribute('id', 'chatButton');
chatButton.position = 'absolute';
chatButton.onclick = openChatbot
$('body').appendChild(chatButton);

let closeButton = document.createElement('button');
closeButton.id = "closeChatbot";
closeButton.type = 'button';
closeButton.onclick = closeChatbot
closeButton.className = 'btn-close'

let iFrame = newE('iframe')
iFrame.id = 'id-iframe';
iFrame.className = 'id-iframe';
iFrame.src = 'https://chat-bot-web-app.azurewebsites.net/chatbot';

let iCont = newE('div');
iCont.id = 'it-if-iContainer'
iCont.className = 'iContainer';
iCont.appendChild(iFrame)
iCont.appendChild(closeButton)
$('body').appendChild(iCont)