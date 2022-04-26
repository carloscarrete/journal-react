import { googleAuthProvider,
     auth, 
     signInWithPopup, 
     createUserWithEmailAndPassword, 
     updateProfile,
     signInWithEmailAndPassword } from '../firebase/firebase-config';
import {types} from '../types/types';

export const startLoginWithEmailAndPassword = (email, password) =>{
    return(dispatch)=>{
        signInWithEmailAndPassword(auth,email,password)
        .then(res=>{
            dispatch(login(res.user.uid, res.user.displayName))
        })
        .catch(error=>console.log(error));
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