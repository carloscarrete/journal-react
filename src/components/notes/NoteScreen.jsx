import { NoteAppBar } from "./NoteAppBar"

export const NoteScreen = () => {
  return (
      <div className="notes__main-content">
          <NoteAppBar />
          <div className="note__content">
               <input
                    type="text"
                    placeholder="Add note"
                    className="note__title-input"
                    autoComplete="off"
               />
               <textarea placeholder="What happened today?" className="note__textarea">
               </textarea>

               <div className="notes__image">
                    <img src="https://images6.alphacoders.com/806/thumb-1920-806274.png" alt='awesome' />
               </div>
          </div>
      </div>
  )
}
