var button = document.getElementById('button');
var button2 = document.getElementById('button2');
var n = document.getElementById('name');
var p = document.getElementById('password')
var token;

async function login(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function init() {
    await login('http://localhost:3001/login', {
        name: n.value,
        password: p.value
    }).then(res => {
        token = res.data.token;
        if(token && n.value && p.value ){
            document.querySelector('form').style.display = 'none';
            document.getElementById('container').style.display = 'block';
        }else{
            let p = document.createElement('p');
            p.innerHTML = 'Fill the inputs'
            document.querySelector('form').appendChild(p);
        }
        openWsConnection();
        console.log("Token: " + token);
    }).catch(error => {
        console.log(error);
    });
}

button.addEventListener('click', () =>{
    init();
})

async function request(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


function openWsConnection(){

    ws = new WebSocket("ws://localhost:3001/request?token=" + token);

    ws.onopen = (event) => {
        console.log("WebSocket connection established.");
        ws.send(token);
    }

    // Display any new messages received in the `messageDiv`.
    ws.onmessage = (event) => {
        console.log("WebSocket message received: ", event.data);

    }

    ws.onerror = (event) => {
        console.log("WebSocket error received: ", event);
    }

    ws.onclose = (event) => {
        console.log("WebSocket connection closed.");
    }
}