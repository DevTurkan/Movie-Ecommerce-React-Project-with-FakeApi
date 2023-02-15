import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

// import rootReducer from '../src/app/store/reducers/index'
import {rootReducer} from 'store/reducers/index'
import ErrorHandler from './middlewares/ErrorHandler'

const middlewares = [ErrorHandler, thunk]
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  composeEnhancers
  (applyMiddleware(...middlewares)
  ))

export default store
