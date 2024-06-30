import React from 'react';
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const LoginComponent = ({ handleClose,setIsNewUser,setUserData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const onSubmit = (data) => {
    //console.log(data);
    setCookie('email', data.email, 7); // Save email for 7 days
    setCookie('isUserLogin', 'true', 7); 
    setUserData({
        email:data.email,
        isUserLogin:true
    })
    handleClose();
  };
  return (
    <div>
      <p className='text-2xl font-bold'>Login</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <FormLabel column sm='2'>
            Email
          </FormLabel>
          <Col sm='10'>
            <FormControl
              placeholder='email@example.com'
              type='email'
              {...register('email', { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </Col>
        </FormGroup>
        <FormGroup as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <FormLabel column sm='2'>
            Password
          </FormLabel>
          <Col sm='10'>
            <FormControl
              placeholder='***********'
              type='password'
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </Col>
        </FormGroup>
        <button
          type='submit'
          className='px-2 py-1 bg-[#060c19] cursor-pointer text-white rounded-none border-none'
        >
          Login
        </button>
      </Form>
      <p className='mt-3'>Dont have account? <span className='text-purple-600 cursor-pointer' onClick={()=>setIsNewUser(true)}>Register</span></p>
    </div>
  );
};

export default LoginComponent;
