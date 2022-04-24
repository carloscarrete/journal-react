import { useState } from "react"

export const useForms = (initialState={}) => {

    const [values, setValues] = useState(initialState)

    const reset = () =>{
        setValues(initialState);
    }

    const handleInputchange = ({target}) =>{
        setValues({
            ...values,
            [target.name] : target.value
        })
    }

    return [values, handleInputchange,reset];

}