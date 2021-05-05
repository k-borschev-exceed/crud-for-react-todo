import React, { useState } from 'react';
import './Signup.css';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState('');

  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        setEmailErrors(data.errors.email);
        setPasswordErrors(data.errors.password);
      }
      if (data.userId && data.token) {
        // localStorage.setItem('auth', JSON.stringify(data));
        // props.checkAuth();
        props.setLogin();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signup'>
      <form onSubmit={signupHandler}>
        <div className='signupMenu'>
          <h2>{'Signup'}</h2>
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
        <button>Signup</button>
        <p onClick={props.setLogin} className='link'>
          Already have an account?
        </p>
      </form>
    </div>
  );
}
