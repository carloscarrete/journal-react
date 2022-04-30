import Swal from "sweetalert2";
import { doc, db, collection, setDoc, updateDoc, deleteDoc } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
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
            ...note
        }
    }
}

export const startSaveNote = (note) =>{
    return async (dispatch, getState) =>{
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const ref = doc(db,`${uid}/journal/notes/${note.id}`);
        await updateDoc(ref, noteToFireStore);

        dispatch(refreshNote(note.id, noteToFireStore));

        Swal.fire({
            icon: 'success',
            title: 'Tu nota ha sido guardada',
            showConfirmButton: false,
            timer: 1500
          })

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

export const refreshNote = (id, note) =>{

/*     const deleteTod = {
        type: 'Cama',
        payload: {
            id, note
        }
    }

    const deleteTodo = {
        type: 'Paa',
        payload: {
            note: { 
                id,
                ...note
            }
        }
    }

    console.log(deleteTod);
    console.log('*-*-*-*-*-*-*-');
    console.log(deleteTodo); */

     return{
        type: types.notesUpdatedNote,
        payload: {
            note: {
                id,
                ...note
            }
        }
    } 
}

export const startFileUploading = (file) =>{
    return async (dispatch, getState)=>{
        const {active} = getState().notes;

        Swal.fire(
            {title: 'Uploading',
             text: 'Please wait...',
             allowOutsideClick: false,             
             didOpen: () =>{
                 Swal.showLoading();
             }
            }
        )

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        dispatch(startSaveNote(active));
        
        Swal.close();
    }
}


export const startDeleting = (id) =>{
    return async (dispatch, getState)=>{
        const {uid} = getState().auth;         
        await deleteDoc(doc(db,`${uid}/journal/notes/${id}`));

        dispatch(deleteNote(id));
     }
}

export const deleteNote = (id) =>{
    return{
        type: types.notesRemoveNote,
        payload: id
    }
}

export const noteLogout = () =>{
    return{
        type: types.notesLogoutCleaning
    }
}