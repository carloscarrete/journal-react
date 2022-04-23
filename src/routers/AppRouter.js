import React from 'react'
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
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
