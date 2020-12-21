var Nickname;
var onlineUsers = [];
$(function () {
    var socket = io();
    //get the user nick name
    if ($("#nickname").text() == "Usernickname") {
        getNickname("Enter your nick name:", socket);
    }

    //show if there are people joining
    socket.on('joined', (msg) => {
        console.log(msg);
        displayMessage(msg, { text: "text-center", color: "", textColor: "text-secondary" })
    });

    //get online users
    socket.on('online', (online)=> {
        console.log(online);
        onlineUsers = online;
    })

    //catch the event typing
    socket.on('typing', (nickname) => {
        console.log(nickname);
        appendTyping(nickname);
    })

    //get the evenet clear typing
    socket.on('clear-typing', (msg)=> {
        $("#typing").empty();
    })

    //get the message incoming from the chatmates
    socket.on('message', function (msg) {
        console.log(msg);
        displayMessage(msg.nickname + ": " + msg.message, { text: "text-left", color: "bg-secondary", textColor: "" });
    });

    //get on change event
    $("#inputMsg").keyup(() => {
        console.log($("#inputMsg").val());
        socket.emit("typing", $("#nickname").text());
    })

    //get the event when the user is not typing
    $("#inputMsg").focusout(() => {
        console.log($("#inputMsg").val());
        socket.emit('clear-typing', $("#nickname").text());
    })

    //takes the message and send
    $('#send').click(() => {
        let nickname = $("#nickname").text();
        let message = $('#inputMsg').val();
        displayMessage(message, { text: "text-right", color: "bg-primary", textColor: "" });
        userMessage(nickname, message, socket);
        socket.emit('clear-typing', nickname);
        $('#inputMsg').val('');
        return false;
    });



    //show whos online
    $(".online").click(()=> {
        let html = "<table class='table bg-dark text-white'><tbody>";
        if(onlineUsers.length > 0) {
            onlineUsers.forEach(user => {
                html += `<tr><td>${user}</td></tr>`;
            })
        }else {
            html = "<h3>No Other user online</h3>"
        }
        swal.fire({
            title: "Online Users!",
            icon: "info",
            html: html
        });
    }) 


});

function getNickname(message, socket) {
    Swal.fire({
        title: message,
        html: "<input type ='text' id='nickN' class='form-control'>",
    }).then((result) => {
        let nickname = $("#nickN").val();
        if (nickname) {
            Nickname = nickname;
            $('#nickname').text(nickname);
            userJoin(nickname, socket);
        } else {
            message = "Please enter a valid nickname:";
            getNickname(message, socket);
        }
    });
}

//this function will display and identify the message
function displayMessage(msg, attribute) {
    $('#message').append(
        `<h6 class="${attribute.text} text-white p-3">
        <span class="${attribute.color} ${attribute.textColor} radius  p-2 mr-2">${msg}</span>
      </h6>`
    );

}

//this function will emit the message and the nickname
function userMessage(nickname, message, socket) {
    socket.emit("message", {
        nickname: nickname,
        message: message,
    });
}

//this function will emit the user nickname
function userJoin(nickName, socket) {
    //emit the user nickname
    displayMessage("You joined the chat!", { text: "text-center", color: "", textColor: "text-secondary" })
    socket.emit("join-chat", nickName);
}

//append who is typing 
function appendTyping(nickName) {
    $("#typing").empty();
    $("#typing").append(`
        <h6 class="text-center text-secondary p-3">
            <span class="radius  p-2 mr-2"><small><i>${nickName} is typing</i></small></span>
        </h6>`);
}