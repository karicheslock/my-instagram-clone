import React, { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/index';

export default function Dashboard() {

    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <p>Hello from Dashboard</p>
    )
};