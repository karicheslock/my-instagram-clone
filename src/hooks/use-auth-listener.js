import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, [auth]);

    return { user };
}