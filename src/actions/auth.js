import { googleAuthProvider, auth, signInWithPopup } from '../firebase/firebase-config';
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

export const login = (uid, name) =>{
    return {
        type: types.login,
        payload: {
            uid,
            name,
        } 
    }
}