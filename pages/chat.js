// pages/chat.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '../context/SocketContext';
import { Container } from '@mui/material';
import { Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import Image from 'next/image';
import Ava from '../images/ava.jpg';

const Chat = () => {
  const socket = useSocket();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});
  const { room ,user} = router.query;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const getCookie = (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
  const fetchUserData = () => {
    const name = getCookie('name');
    const email = getCookie('email');
    const isUserLogin = getCookie('isUserLogin');

    if (name && email) {
      //console.log('name:', name);
      //console.log('Email:', email);
      //console.log('isUserLogin:', isUserLogin);
      setUserData({
        name: name,
        email: email,
        isUserLogin: isUserLogin,
      });
      setUsername(name);
    } else {
      //console.log('No data found in cookies');
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (socket && (room || user) && username) {
      //console.log('room:', room);
      socket.emit('join-room', { roomId: room, username });

      socket.on('receive-message', (res) => {
        //console.log(res);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: res.message,
            username: res.username,
          },
        ]);
        
      });
      playNotifications();
    }

    return () => {
      if (socket) {
        socket.off('receive-message');
      }
    };
  }, [socket, room,user]);

  const playNotifications =()=>{
    var audio = new Audio("/images/ring.mp3");
    audio.play();
  }
  const sendMessage = () => {
    //console.log('message:', message);
    if (socket && message) {
        if(room){
            socket.emit('send-message', { roomId: room, message, username });
            setMessage('');
        }else{
            socket.emit('direct-message', { targetUser: user, message, username });
            setMessage('');
        }
      
    }
  };

  return (
    <div>
      <Container>
        <p className='text-2xl font-bold mt-2'>
         {room ? `Chat Room: ${room}`:`Username : ${user}`}
        </p>
        <div>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className='flex justify-start items-start flex-col my-2'
            >
              <p className='text-sm font-semibold text-gray-500 my-1'>
                {msg?.username}:
              </p>
              <div className='flex justify-start items-center flex-row gap-3'>
                <Image
                  src={Ava}
                  alt='avatar'
                  width={30}
                  height={30}
                  className=''
                  style={{ borderRadius: '50%' }}
                />
                <span className='bg-[#00000054] text-black py-1 rounded-md px-2'>
                  {msg?.message}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <FormGroup as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Col sm='5'>
              <FormControl
                placeholder='Enter Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Col>
            <Col sm='2'>
              <button
                className='py-1 px-2 bg-black text-white rounded-md'
                onClick={sendMessage}
              >
                Send
              </button>
            </Col>
          </FormGroup>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
