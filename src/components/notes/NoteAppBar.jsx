import { useDispatch, useSelector } from "react-redux"
import { startSaveNote } from "../../actions/notes";

import {startFileUploading} from '../../actions/notes'

export const NoteAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSaveNote = () =>{
        dispatch(startSaveNote(active));
    }

    const handleUploadImage = () =>{
        document.querySelector('#fileSelector').click();
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            dispatch(startFileUploading(file));
        }
    }

    return (
        <div className="notes_appbar">
            <span>22 de abril del 2022</span>
            <input 
                type="file"
                name="file"
                id="fileSelector"
                onChange={handleImageChange}
                style={{display:'none'}}
            />

            <div>
                <button className="btn" onClick={handleUploadImage}>
                    Picture
                </button>
                <button className="btn" onClick={handleSaveNote}> 
                    Save
                </button>
            </div>
        </div>
    )
}
