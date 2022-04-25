import { googleAuthProvider, auth, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from '../firebase/firebase-config';
import {types} from '../types/types';

export const startLoginWithEmailAndPassword = (email, password) =>{
    return (dispatch)=>{
        setTimeout(() => {
            dispatch(login(email, password));
        }, 3500);
    }
}

 export const startLoginWithGoogle = () =>{
    return(dispatch)=>{
        signInWithPopup(auth, googleAuthProvider)
        .then(({user})=>{
            dispatch(login(user.uid, user.displayName));
        })
    }
} 

export const startRegisterWithEmailAndPassword = (email, name, password) =>{
    return(dispatch)=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(async ({user})=>{
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            dispatch(login(user.uid, user.displayName));
        })
    }
}

export const login = (uid, name) =>{
    return {
        type: types.login,
        payload: {
            uid,
            name,
        } 
    }
}