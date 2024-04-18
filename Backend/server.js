const io = require('socket.io')(8000)

const users = {}
// Access-Control-Allow-Origin: "http://localhost:5500"
// Access-Control-Allow-Methods: GET, POST, PUT
// Access-Control-Allow-Headers: Content-Type

io.on('connection',socket=>{
    socket.on('new-user-join',name=>{
        console.log(name +" Joined")
        users[socket.id]=name
        socket.broadcast.emit('user-join',name)
    })

    socket.on('send',message=>{
        socket.broadcast.emit('recived',{message: message,name: users[socket.id]})
    })

    socket.on('disconnect',name=>{
        console.log(name +" left")
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id]
    })
})