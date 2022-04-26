import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

  return (
    <Route {...rest}
    component={(props)=>(
        (isAuthenticated)
        ?(<Redirect to="/"/>)
        :(<Component {...props}/>)
    )}>       
    </Route>
  )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}