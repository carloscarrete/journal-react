import {db, collection, getDocs} from '../firebase/firebase-config'

export const loadNotes = async (uid) =>{
    const snapshot = await getDocs(collection(db,`${uid}/journal/notes`));
    const data = [];

    snapshot.forEach(doc=>{
        data.push({
            id: doc.id,
            ...doc.data()
        })
    })

    return data;
}