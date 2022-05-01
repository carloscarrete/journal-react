import React from 'react';
import {Link} from 'react-router-dom';
import { useForms } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginWithEmailAndPassword, startLoginWithGoogle } from '../../actions/auth';
import { removeErrorMessage, setErrorMessage } from '../../actions/ui';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const {msgError, loading} = useSelector(state=>state.ui);

  const [values, handleInputChange] = useForms({
    email: 'carloscarrete.sc@gmail.com',
    password: '123456'
  });

  const {email, password} = values;

  const handleLogin = (e) => {
    e.preventDefault();
    if(isValid()){
      dispatch(startLoginWithEmailAndPassword(email, password));
    }
  }

  const handleLoginWithGoogle = (e) =>{
    e.preventDefault();
    dispatch(startLoginWithGoogle());
  }
  
  const isValid = () =>{
    if(!validator.isEmail(email)){
      dispatch(setErrorMessage('Email is invalid'));
      return false;
    }
    dispatch(removeErrorMessage());
    return true;
  }

  return (
    <div>

      <h3 className='auth__title'>Login</h3>
      {
        msgError&&
        (
        <div className='auth__alert-error'> 
          {msgError}
        </div>
        )
      }

      <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
        <input type="text" placeholder="Email" name='email' className='auth__input' autoComplete='off' value={email} onChange={handleInputChange}/>
        <input type="password" placeholder="Password" name='password' className='auth__input' autoComplete='off' value={password} onChange={handleInputChange}/>
      <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
        Login
      </button>
      <div className='auth__social-networks'>
        <p>Login with Social Media</p>

        <div
          className="google-btn"
          onClick={handleLoginWithGoogle}
        >
          <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </div>
      <Link to="/auth/register">
          Create new account  
        </Link>
      </form>
    </div>
  )
}
