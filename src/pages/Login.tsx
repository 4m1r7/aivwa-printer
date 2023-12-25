import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post('/authentication/login', null, {
        params: params
      });
      localStorage.setItem('aivwa-printer-auth-token', response.data);
      setMessage('Login successful!');
      // Redirect to another page or update the state as needed
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setMessage('Incorrect username or password.');
        } else {
          setMessage('Something went wrong!');
        }
      } else {
          setMessage('Can\'t reach the server!');
      }
    }
  };

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-min h-min max-w-full max-h-full p-8 rounded-2xl shadow-main flex flex-col justify-center gap-12 overflow-scroll'>
          <div className='w-full h-full'>
            <h2 className='ml-3 text-customGray font-medium'>Log in to access the Printer</h2>
            <div className='relative w-full h-full border border-b-color rounded-2xl py-16 px-8 flex justify-center items-center'>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-2"
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className='text-center rounded-lg border border-customGray p-2'

                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className='text-center rounded-lg border border-customGray p-2'
                />
                <button type="submit" className='bg-customBlue text-white rounded-lg p-2'>Login</button>
              </form>
              {message && 
                <p className='w-full absolute bottom-0 text-center pb-3'>
                    {message.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
