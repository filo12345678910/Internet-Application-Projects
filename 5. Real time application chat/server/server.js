const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const server = io.listen(3000);
var users = [];

server.on('connection', (socket) => {
    console.log('connected');

    socket.on('login', (nickname) => {
        users.push({ nick: nickname, socketId: socket.id });
        socket.emit('loggedIn');
        server.emit('message', { user: 'Server', text: `${nickname} joined the chat` });
        server.emit('userList', users);
    });

    socket.on('message', (message) => {
        const user = users.find(u => u.socketId === socket.id);
        if (user) {
            server.emit('message', { user: user.nick, text: message });
        }
    });

    socket.on('disconnect', () => {
        const user = users.find(u => u.socketId === socket.id);
        if (user) {
            server.emit('message', { user: 'Server', text: `${user.nick} left the chat` });
            users = users.filter(u => u.socketId !== socket.id);
            server.emit('userList', users);
        }
    });
});
