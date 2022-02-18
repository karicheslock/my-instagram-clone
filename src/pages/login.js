import React, {useState} from 'react';
import iphoneImage from '../images/iphone-with-profile.jpg';
import instagramLogo from '../images/logo.png';
import * as ROUTES from '../constants/routes';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();

    };

    return (
        <div className='container mx-auto'>
            <div className='flex-auto'>
                <img src={iphoneImage} alt='iPhone with Instagram app' />
            </div>
            <div className='flex-auto'>
                <div className='flex-auto'>
                    <img src={instagramLogo} alt='Instagram logo' />
                    <form onSubmit={handleSubmit}>
                        <input type='email' name='email' placeholder='Email address' onChange={handleEmailChange} value={email} />
                        <input type='password' name='password' placeholder='Password' onChange={handlePasswordChange} value={password} />
                        <input type='submit' value='Log In' />
                    </form>
                </div>
                <div className='flex-auto'>
                    <p>Don't have an account? <a href={ROUTES.SIGN_UP}>Sign up</a></p>
                </div>
            </div>
        </div>
    )
};