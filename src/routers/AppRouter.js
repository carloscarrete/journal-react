import { onAuthStateChanged, auth } from '../firebase/firebase-config'
import React, { useEffect } from 'react'
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

import {useDispatch} from 'react-redux'
import {login} from '../actions/auth'

export const AppRouter = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
      }
    })
  }, [dispatch])
  
  

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/auth" component={AuthRouter} />
            <Route exact path='/' component={JournalScreen}/>
            <Redirect to="/auth/login" />
        </Switch>
    </BrowserRouter>
  )
}
