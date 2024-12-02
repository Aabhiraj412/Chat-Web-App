// Set up Socket.IO with proper CORS settings
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://10.0.34.46:5500", // Frontend origin
        methods: ["GET", "POST", "PUT"], // Allowed methods
        allowedHeaders: ["Content-Type"], // Headers to allow
        credentials: true // Allow cookies if needed
    }
});

// Object to store connected users
const users = {};

// Listen for Socket.IO connections
io.on('connection', (socket) => {
    // When a new user joins
    socket.on('new-user-join', (name) => {
        console.log(`${name} joined`);
        users[socket.id] = name; // Map the user's name to their socket ID
        socket.broadcast.emit('user-join', name); // Notify others of the new user
    });

    // When a user sends a message
    socket.on('send', (message) => {
        socket.broadcast.emit('recived', {
            message: message,
            name: users[socket.id]
        });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} left`);
        socket.broadcast.emit('leave', users[socket.id]); // Notify others of the user's departure
        delete users[socket.id]; // Remove user from the list
    });
});