import { doc, db, collection, setDoc } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';

export const startNewNote = () => {
    return async (dispatch, getState) =>{
        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const ref = doc(collection(db, `${uid}/journal/notes`));
        await setDoc(ref, newNote)

        dispatch(activeNote(ref.id,newNote));
    }
}

export const activeNote = (id, note) =>{
    return{
        type: types.notesActiveNote,
        payload: {
            id,
            note
        }
    }
}

export const startLoadingNotes = (uid) =>{
    return async (dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) =>{
    return {
        type: types.notesLoadNotes,
        payload: notes
    }
}