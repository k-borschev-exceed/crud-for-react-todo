import React, { useState } from 'react';
import './Login.css';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState('');

  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        setEmailErrors(data.errors.email);
        setPasswordErrors(data.errors.password);
      } else {
        localStorage.setItem('auth', JSON.stringify(data.token));
        props.checkAuth();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={loginHandler}>
        <div className='loginMenu'>
          <h2>{'Login'}</h2>
        </div>
        <label>Email</label>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <div className='email error'>{emailErrors}</div>
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div className='password error'>{passwordErrors}</div>
        <button>Login</button>
        <p onClick={props.setSignup} className='link'>
          Don't have an account?
        </p>
      </form>
    </div>
  );
}
