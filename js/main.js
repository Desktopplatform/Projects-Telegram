const chat = [{
        name: 'yeganeh',
        time: '06:33 PM',
        message: 'برای تمرین فردا جیکاری باید انجام بدیم؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbS0x33s_C6J9hr3tOb340Foe_F3nGXGoPw&s',
        lastseen: '12ساعت قبل'
    },
    {
        name: 'zahra',
        time: '05:03 PM',
        message: 'چه طوری یگانه؟؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbS0x33s_C6J9hr3tOb340Foe_F3nGXGoPw&s',
        lastseen: '12ساعت قبل'
    },
    {
        name: 'mohammad',
        time: '02:00 PM',
        message: 'سلام خوبی؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s',
        lastseen: '12ساعت قبل'
    },
    {
        name: 'asghar',
        time: '03:06 PM',
        message: 'برای تمرین فردا جیکاری باید انجام بدیم؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s',
        lastseen: '12ساعت قبل'
    },
    {
        name: 'fatemeh',
        time: '09:04 PM',
        message: 'برای تمرین فردا جیکاری باید انجام بدیم؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbS0x33s_C6J9hr3tOb340Foe_F3nGXGoPw&s',
        lastseen: '12ساعت قبل'
    },
    {
        name: 'sara',
        time: '12:01 PM',
        message: 'برای تمرین فردا جیکاری باید انجام بدیم؟',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbS0x33s_C6J9hr3tOb340Foe_F3nGXGoPw&s',
        lastseen: '12ساعت قبل'
    }
];

const chatList = document.getElementById("chatList");
const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const recordButton = document.getElementById("recordButton");

function renderChats() {
    chatList.innerHTML = ''; //پاک کردن محتوای قبلی
    chat.forEach((item) => {
        const divchat = document.createElement('div');
        divchat.setAttribute('class', 'chat-box');
        divchat.setAttribute('onclick', `onclickChekList('${item.name}')`);
        divchat.innerHTML = `
            <div class="image chat-img">
                <img src="${item.img}" alt="${item.name}" id="chatImage" />
            </div>
            <div class="details">
                <h3 id="chatName">${item.name}</h3>
                <span id="lastSeen">${item.lastseen}</span>
                <span id="time-detail">${item.time}</span>
            </div>
        `;
        chatList.appendChild(divchat);
    });

}
const chatConteinerDetails = document.getElementById('chatConteiner-details');

function onclickChekList(chatName) {
    const chatDetails = chat.find(item => item.name === chatName);
    if (chatDetails) {
        chatConteinerDetails.innerHTML = `
            <h2>${chatDetails.name}</h2>
            <p>${chatDetails.message}</p>
            <span>${chatDetails.time}</span>
        `;
    }
    chatConteinerDetails.style.display = "block";

}
//ارسال پیام
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage(messageText);
        messageInput.value = '';
    }
}

function addMessage(text) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('sent-message');
    newMessage.innerHTML = `
        <p>${text}</p>
        <span class="time-detail">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // اسکرول به پایین
}

//سرچ
function searchInput() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    chatList.innerHTML = '';
    if (searchValue === '') {
        renderChats();
        return;
    }
    chat.forEach((ch) => {
        if (ch.name.toLowerCase().includes(searchValue)) {
            const chatBoxlist = document.createElement('div');
            chatBoxlist.classList.add('chat-box');
            chatBoxlist.innerHTML = `
                <div class="chat-img">
                    <img src="${ch.img}" alt="${ch.name}" loading="lazy">
                </div>
                <div class="chat-details">
                    <div class="chat-title">
                        <h3>${ch.name}</h3>
                        <span>${ch.time}</span>
                    </div>
                    <div class="chat-msg">
                        <p>${ch.message}</p>
                    </div>
                </div>
            `;
            chatList.appendChild(chatBoxlist);
        }
    });
}

// ضبط صدا
let mediaRecorder;
let audioChunks = [];

recordButton.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, {
            type: 'audio/wav'
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        addAudioMessage(audioUrl);
        audioChunks = [];
    };

    recordButton.style.backgroundColor = "#ffffff";
    recordButton.style.color = "#000";
    recordButton.style.padding = "12px";
    recordButton.style.borderRadius = "8px";
    recordButton.style.margin = "3px";

    recordButton.innerText = "stop";
    recordButton.onclick = () => {
        mediaRecorder.stop();
        recordButton.innerText = "recod";
    };
});

function addAudioMessage(audioUrl) {
    const audioMessage = document.createElement('div');
    audioMessage.classList.add('sent-message');
    audioMessage.innerHTML = `
        <audio controls>
            <source src="${audioUrl}" type="audio/wav">
        </audio>
        <span class="time-detail">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    chatContainer.appendChild(audioMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // اسکرول به پایین
}

renderChats();


//menu