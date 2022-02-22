import React, { useState, useEffect } from 'react';
import iphoneImage from '../images/iphone-with-profile.jpg';
import instagramLogo from '../images/logo.png';
import * as ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const isInvalid = password === '' || email === '';

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password).then((result) => {
                navigate(ROUTES.DASHBOARD);
            }) 
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = "Login - Instagram";
    }, []);

    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
                <img src={iphoneImage} alt='iPhone with Instagram app' />
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border mb-4'>
                    <h1 className='flex justify-center w-full'>
                        <img src={instagramLogo} alt='Instagram logo' className='mt-2 w-6/12 mb-4' />
                    </h1>
                    {error && <p className='mb-4 text-xs text-red-500'>{error}</p>}
                
                    <form onSubmit={handleSubmit} method='POST'>
                        <input 
                            aria-label='Enter your email address'
                            className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2' 
                            type='email' 
                            name='email' 
                            placeholder='Email address' 
                            onChange={handleEmailChange} 
                            value={email}
                        />
                        <input
                            aria-label='Enter your password'
                            className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2' 
                            type='password' 
                            name='password' 
                            placeholder='Password' 
                            onChange={handlePasswordChange} 
                            value={password} 
                        />
                        <button
                            disabled={isInvalid} 
                            type='submit'
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                        >
                            Log In
                        </button> 
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
                    <p className='text-sm'>Don't have an account? <a href={ROUTES.SIGN_UP} className='font-bold'>Sign up</a></p>
                </div>
            </div>
        </div>
    )
};