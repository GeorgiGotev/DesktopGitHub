import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';

import { authenticated as auth } from '../lib/firebase';
// todo: catch errors

export const register = async (values) => {
    if(values.displayName.trim()===''){
        throw new Error('Your name is important for us!')
    }
    if (values.email.trim() === '') {
        throw new Error('Email is mandatory.');
    }
    if (values.password !== values.rePassword) {
        throw new Error("Passwords don't match");
    }
    if (values.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
    }

    const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
    );

    if (!res) {
        throw new Error('Email is already in use!');
    }

    try {
        updateProfile(auth.currentUser, {
            displayName: values.displayName,
        });        
    } catch (err) {
        console.log(err);
    }

    const user = res.user;
    return user;
};
export const login = async (values) => {
    const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
    );
    const user = res.user;
    return user;
};

export const logout = () => {
    signOut(auth);
};
