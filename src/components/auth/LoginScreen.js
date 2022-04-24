import React from 'react';
import {Link} from 'react-router-dom';
import { useForms } from '../../hooks/useForm';
import {login} from '../../actions/auth';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [values, handleInputChange] = useForms({
    email: 'carloscarrete.sc@gmail.com',
    password: '123456'
  });

  const {email, password} = values;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login('12345','Carlos'));
  }

  return (
    <div>

      <h3 className='auth__title'>LoginScreen</h3>

      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email" name='email' className='auth__input' autoComplete='off' value={email} onChange={handleInputChange}/>
        <input type="password" placeholder="Password" name='password' className='auth__input' autoComplete='off' value={password} onChange={handleInputChange}/>
      <button type='submit' className='btn btn-primary btn-block'>
        Login
      </button>
      </form>


      <div className='auth__social-networks'>
        <p>Login with Social Media</p>

        <div
          className="google-btn"
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
    </div>
  )
}
