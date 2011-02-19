$(function() {
    
    window.Socket = new io.Socket();
    
    Socket.connect();
    
    new Hand({
        id: 'left'
    });
    
    new Hand({
        id: 'right'
    });
    
});