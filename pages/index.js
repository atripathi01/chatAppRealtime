// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [targetUser,setTargetUser]=useState('');
  const router = useRouter();

  const createRoom = () => {
    router.push(`/chat?room=${roomId}`);
  };
  const directChat = () => {
    router.push(`/chat?user=${targetUser}`);
  };

  return (
    <div>

      <Container>
        <div className='py-4'>
          <p className='text-2xl font-bold'>Create or Join a Chat Room</p>
          <FormGroup as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Col sm='5'>
              <FormControl
                placeholder='Create or Join a Chat Room'
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </Col>
            <Col sm='2'>
              <button
                className='py-1 px-2 bg-black text-white rounded-md'
                onClick={createRoom}
              >
                Go to Room
              </button>
            </Col>
          </FormGroup>
        </div>
        <div className='py-4'>
          <p className='text-2xl font-bold'>Direct Messaage</p>
          <FormGroup as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Col sm='5'>
              <FormControl
                placeholder='Enter your friends username'
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
              />
            </Col>
            <Col sm='2'>
              <button
                className='py-1 px-2 bg-black text-white rounded-md'
                onClick={directChat}
              >
                Start Direct Chat
              </button>
            </Col>
          </FormGroup>
        </div>
      </Container>
    </div>
  );
};

export default Home;
