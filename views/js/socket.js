var socket = io();
$(function () {
    socket.on('eventClient', function (data) {
        console.log(data);
    });    $('form').submit(function(e){
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg, currentUser){
        // $('#messages').prepend($('<li class="message row">').text(msg));
        $('#messages').prepend('<li class="message row">' + '<span class="col-sm-2 user text-primary">' + currentUser + ':' + '</span>' + '<span class="col-sm-7">' + msg + '</span>' + '<small class="col-sm-3 text-danger">' + new Date().toLocaleTimeString() + '</small>' + '</li>');
    });
});
