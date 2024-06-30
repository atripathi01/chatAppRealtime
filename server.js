const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  const users = {};
  //console.log(users);
io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    //console.log(socket.id)
    users[socket.id] = username;
    //console.log(users)
  });

  socket.on('send-message', ({ roomId, message, username }) => {
    //console.log(`User ${username} sent message in room: ${roomId, message}`);
    io.to(roomId).emit('receive-message', { message, username });
  });

  socket.on('direct-message', ({ targetUser, message, username }) => {
    const targetSocketId = Object.keys(users).find(
      (id) => users[id] === targetUser
    );
    //console.log(`User ${username} sent direct message to ${targetUser}: ${message}, ${targetSocketId}`);
    if (targetSocketId) {
      io.to(targetSocketId).emit('receive-message', { message, username });
      socket.emit('receive-message', { message, username });
    }else{
        //console.log(`No user found with name: ${targetUser}`);
    }
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    //console.log('user disconnected');
  });
});


  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('started in http://localhost:3000');
  });
});
