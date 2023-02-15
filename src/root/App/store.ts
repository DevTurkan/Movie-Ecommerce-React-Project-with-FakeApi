import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../../app/features/LoginSlice'
import openReducer from '../../app/features/OpenSlice'
import userReducer from '../../app/features/UserSlice'
import cardReducer from '../../app/features/CardSlice'
import langReducer from '../../app/features/Language'

// import Language from '../features/Language'
export default configureStore({
  reducer: {
    loginn: loginReducer,
    openn: openReducer,
    userr: userReducer,
    cardd: cardReducer,
    language: langReducer,
  }
})
