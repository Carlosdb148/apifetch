var button = document.getElementById('button');
var button2 = document.getElementById('button2');
var n = document.getElementById('name').value;
var p = document.getElementById('password').value;
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
        name: n,
        password: p
    }).then(res => {
        token = res.data.token;
        if(token && n && p ){
            document.querySelector('form').style.display = 'none';
            document.getElementById('container').style.display = 'block';
            this.expression();
        }else{
            let p = document.createElement('p');
            p.innerHTML = 'Fill the inputs'
            document.querySelector('form').appendChild(p);
        }
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


function expression(){
    button2.addEventListener('click', () =>{
        request("http://localhost:3001/request", 
        {
            regular_exp : document.getElementById('expression').value
        })
        .then(response => {
            console.log(response);
        }).catch(response => console.log(response));
    })
}