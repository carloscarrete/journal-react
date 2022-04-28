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
        case types.notesLoadNotes:
            return{
                ...state,
                notes: [...action.payload]
            }
        default:
            return state;
    }
}