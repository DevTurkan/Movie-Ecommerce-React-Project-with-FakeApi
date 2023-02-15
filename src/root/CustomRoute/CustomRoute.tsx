import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

export const CustomRoute = ({ options = {}, ...rest }) => {
  // const isLogged = localStorage.getItem('token') ? true : false

  // if (options.fallbackComponent && !isLogged) {
  //   return <Route {...rest} component={options.fallbackComponent} />
  // }

  return <Route {...rest} />
}

// CustomRoute.propTypes = {
//   options: PropTypes.shape({
//     fallbackComponent: PropTypes.func.isRequired,
//   }),
// }

export default CustomRoute
