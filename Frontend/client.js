const socket = io('http://localhost:8000')

const id = document.getElementById('id')
const form = document.getElementById('sent')
const message = document.getElementById('in')
const btn = document.getElementById('btn')
const container = document.querySelector(".container")


form.addEventListener('submit',(e)=>{
    // console.log("test2")
    e.preventDefault()
    const mess = message .value;
    append(`You: ${mess}`,'right')
    socket.emit('send',mess)
    message.value = ''
})
const append = (message,position)=>{
    const ele = document.createElement('div')
    ele.innerHTML = message
    ele.classList.add('message')
    ele.classList.add(position)
    container.append(ele)
}
const name = prompt("Enter Your Name:")
console.log(name)
id.innerHTML=name
socket.emit('new-user-join',name)

socket.on('user-join',name=>{
    if(name!=null){
        console.log(name)
        append(`${name} Joined the Chat`, 'center')
    }
})

socket.on('recived',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('leave',name=>{
    if(name!=null){
        console.log(`${name} Left`)
        append(`${name} Left the Chat`,'center')
    }
})