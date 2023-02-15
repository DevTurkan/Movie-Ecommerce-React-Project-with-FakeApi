import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedUser : localStorage.getItem('loggedUser') ?? false,
    // inpval:{name:''},
    // alluserslist:[],
    // selecteduser:[]
  },
  reducers: {

    loginfunk: (state, action) => {
      // state.inpval.name = action.payload
      const mailname = action.payload[0];
      const id = action.payload[1];
      const name = action.payload[2];
      localStorage.setItem('loggedUser', JSON.stringify({mail: mailname, id: id, name: name}));
    }

    // getuserfunk: (state, action) => {
    //   state.alluserslist = action.payload
    // },

    // selecteduserfunk: (state, action) => {
    //   state.selecteduser = action.payload
    // }
  }
})

export const { loginfunk } = loginSlice.actions

export default loginSlice.reducer