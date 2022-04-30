import {types} from '../types/types';

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.notesActiveNote:
            return {
                ...state,
                active: {
                    ...action.payload}  //Con esto se rompe la relación...es más común
            }
        case types.notesAddNewNote:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
                //Con lo anterior se pondria primero la note al agregar y posteriormente las demas
                //notas que estan en el estado, se crea una nueva copia de las notas
            }
        case types.notesLoadNotes:
            return{
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdatedNote:
            return{
                ...state,
                notes: state.notes.map(note=>note.id===action.payload.note.id
                    ? action.payload.note
                    : note)
            }
        case types.notesRemoveNote:
            return{
                ...state,
                notes: state.notes.filter(note => note.id!== action.payload),
                active: null
            }
        case types.notesLogoutCleaning:
            return{
                ...state,
                notes: [],
                active: null
            }
        default:
            return state;
    }
}