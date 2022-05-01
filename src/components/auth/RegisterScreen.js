import React from 'react'
import { Link } from 'react-router-dom';
import { useForms } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorMessage, setErrorMessage } from '../../actions/ui';
import { startRegisterWithEmailAndPassword } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const {msgError} = useSelector(state=>state.ui);

  const [formValues, handleInputChange] = useForms({
    name: 'Carlos',
    email: 'carloscarreteg@gmail.com',
    password: '123456',
    password2: '123456'
  })

  const {name, email, password, password2} = formValues;

  const handleRegister = (e)=>{
    e.preventDefault();
    if(isValid()){
      console.log('All is fine!');
      dispatch(startRegisterWithEmailAndPassword(email, name, password));
    }
  }

  const isValid = () =>{
    if(name.trim().length===0){
      dispatch(setErrorMessage('Name is required'))
      return false
    }else if(!validator.isEmail(email)){
      dispatch(setErrorMessage('Email is not valid'))
      return false;
    }else if(password!==password2 || password<5){
      dispatch(setErrorMessage('Password should be at lest 6 characters or match each other'))
      return false;
    }
    dispatch(removeErrorMessage());
    return true;
  }

  return (
    <div>

      <h3 className='auth__title'>Register</h3>

      {
        msgError&&
        (
      <div className='auth__alert-error'>
          {msgError}
      </div>
        )
      }

      <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">
        <input type="text" placeholder="Name" name='name' className='auth__input' autoComplete='off' value={name} onChange={handleInputChange}/>
        <input type="text" placeholder="Email" name='email' className='auth__input' autoComplete='off' value={email} onChange={handleInputChange}/>
        <input type="password" placeholder="Password" name='password' className='auth__input' autoComplete='off' value={password} onChange={handleInputChange}/>
        <input type="password" placeholder="Confirm password" name='password2' className='auth__input' autoComplete='off' value={password2} onChange={handleInputChange}/>
      <button type='submit' className='btn btn-primary btn-block mb-5'>
        Register
      </button>
      <Link to="/auth/login">
        Already Register?
      </Link>
      </form>

    </div>
  )
}
