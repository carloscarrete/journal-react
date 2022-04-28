import { onAuthStateChanged, auth } from '../firebase/firebase-config'
import React, { useEffect, useState } from 'react'
import {Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

import {useDispatch} from 'react-redux'
import {login} from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import {  startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {

  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);
        dispatch(startLoadingNotes(user.uid));
      }else{
        setIsLogged(false);
      }
      setChecking(false);
    })
  }, [dispatch,setIsLogged, setChecking])

  if(checking){
    return <h1>Loading...</h1>
  }
  
  return (
    <BrowserRouter>
        <Switch>
            <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLogged}/>
            <PrivateRoute isAuthenticated={isLogged} exact path='/' component={JournalScreen}/>
            <Redirect to="/auth/login" />
        </Switch>
    </BrowserRouter>
  )
}
