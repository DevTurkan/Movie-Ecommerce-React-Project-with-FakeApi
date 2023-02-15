import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState:  {
    // loggedUser : localStorage.getItem('loggedUser') ?? false,
    // inpval:{name:''},
    alluserslist:[],
    selecteduser:{}
  },
  reducers: {

    getuserfunk: (state, action) => {
      state.alluserslist = action.payload
    },

    selecteduserfunk: (state, action) => {
      state.selecteduser = action.payload
    }

   
  }
})

export const { getuserfunk, selecteduserfunk } = userSlice.actions

export default userSlice.reducer