import { googleAuthProvider,
     auth, 
     signInWithPopup, 
     createUserWithEmailAndPassword, 
     updateProfile,
     signInWithEmailAndPassword,
     signOut } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginWithEmailAndPassword = (email, password) =>{
    return(dispatch)=>{
        dispatch(startLoading());
        signInWithEmailAndPassword(auth,email,password)
        .then(res=>{
            dispatch(login(res.user.uid, res.user.displayName))
            dispatch(finishLoading());
        })
        .catch(()=>dispatch());
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

export const startLogout = () =>{
    return  async (dispatch)=>{
        await signOut(auth);
        dispatch(logout());
    }
}

export const logout = ()=>{
    return {
        type: types.logout
    }
}