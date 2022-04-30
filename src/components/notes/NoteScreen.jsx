import { useDispatch, useSelector } from "react-redux"
import { NoteAppBar } from "./NoteAppBar"
import {useForms} from '../../hooks/useForm'
import { useEffect, useRef } from "react";
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {

     const {active:notes} = useSelector(state => state.notes);
     const [formValues, handleInputchange, reset] = useForms(notes);
     
     const dispatch = useDispatch();

     const {body, title} = formValues;

     const ref = useRef(notes.id);   //refIdFromNote

     useEffect(() => {
          if(ref.current !== notes.id){
               reset(notes);
               ref.current = notes.id;
          }
     }, [notes, reset])
     
     useEffect(() => {
          dispatch(activeNote(formValues.id, {...formValues}));
     }, [formValues, dispatch])
     

     const handleDelete = () =>{
          dispatch(startDeleting(ref.current));
     }

  return (
      <div className="notes__main-content">
          <NoteAppBar />
          <div className="note__content">
               <input
                    type="text"
                    placeholder="Add note"
                    className="note__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputchange}
                    name="title"
               />
               <textarea
                placeholder="What happened today?" 
                className="note__textarea"
                value={body}
                onChange={handleInputchange}
                name="body"
               >
               </textarea>
               
               {
                    notes.url&&
                    (
               <div className="notes__image">
                    <img src={notes.url} alt='awesome' />
               </div>
                    )
               }
          </div>

          <div className="btn btn-danger" onClick={handleDelete}>
               Delete
          </div>
      </div>
  )
}
