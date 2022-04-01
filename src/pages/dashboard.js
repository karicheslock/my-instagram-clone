import React, { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/index';
import Login from './login';
import useAuthListener from '../hooks/use-auth-listener';

export default function Dashboard() {

    const { user } = useAuthListener();

    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <>
        {!user ? (
            <Login />
        ) : (
            <div className='bg-gray-100'>
                <Header />
                <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        )}   
        </>
    )
};