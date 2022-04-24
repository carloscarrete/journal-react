import {types} from '../types/types';

export const login = (uid, name) =>{
    return {
        type: types.login,
        payload: {
            uid,
            name,
        } 
    }
}