const ErrorHandler = store => next => action => {
  if (action.type) {
    if (action.type.includes('SUCCESS') && action.payload && action.payload.notify) {
      store.dispatch({
        payload: {
          message: action.payload.message,
          notify: action.payload.notify,
          type: action.payload.type,
        },
        type: 'NOTIFY',
      })
    } else if (action.type.includes('ERROR') && action.error && action.error.notify) {
      store.dispatch({
        payload: {
          message: action.error.message,
          notify: action.error.notify,
          type: action.error.type,
        },
        type: 'NOTIFY',
      })
    }
  }
  return next(action)
}

export default ErrorHandler
