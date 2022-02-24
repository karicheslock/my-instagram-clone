import React from 'react';
import * as ROUTES from '../constants/routes';
import instagramLogo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import karlPhoto from '../images/avatars/karl.jpg';


export default function Header() {

    const user = {
        displayName: 'karl',
        image: karlPhoto
    };

    //const user = false;

    return (
        <header className='h-16 bg-white border-b mb-8'>
            <div className='container mx-auto max-width-lg h-full'>
                <div className='flex justify-between h-full'>
                    <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
                        <h1>
                            <a aria-label='Dashboard' href={ROUTES.DASHBOARD}>
                                <img src={instagramLogo} alt='Instagram logo' className='mt-2 w-6/12' />
                            </a>
                        </h1>
                    </div>
                    <div className='text-gray text-center flex items-center align-items'>
                        {user ? (
                            <>
                                <Link to={ROUTES.DASHBOARD}>
                                    <p>Dashboard</p>
                                </Link>

                                <button 
                                    title='Sign Out' 
                                    onClick={() => signOut(auth) } 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            signOut(auth)
                                        }
                                    }}
                                >
                                    Sign Out
                                </button>
                                <div className='flex items-center cursor-pointer'>
                                    <Link to={`/p/${user.displayName}`}>
                                        <img 
                                            className='rounded-full h-8 w-8 flex'
                                            src={`${user.image}`}
                                            alt={`${user.displayName} profile picture`}
                                        />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'>
                                        Log In
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button className='font-bold text-sm rounded text-blue w-20 h-9'>
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}