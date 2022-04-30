export const fileUpload = async (file) =>{
    const url = 'https://api.cloudinary.com/v1_1/durango/image/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal');
    formData.append('file', file);

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if(res.ok){
            const resJournal = await res.json();
            return await resJournal.secure_url;
        }else{
            throw await res.json();
        }
    } catch (error) {
        throw error;
    }
}