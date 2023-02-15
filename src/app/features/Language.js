import { createSlice } from '@reduxjs/toolkit'
const langitem = localStorage.getItem('currentlang') ? JSON.parse(localStorage.getItem('currentlang')) : 'EN'
import Translation from '../Translation/Data.json';

export const Language = createSlice({
  name: 'Language',
  initialState: {
    lang: langitem,
    content: Translation[langitem]
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
     

      state.content = Translation[state.lang]; 
      localStorage.setItem('currentlang', JSON.stringify(state.lang))
      // state.crlang += action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeLang } = Language.actions

export default Language.reducer