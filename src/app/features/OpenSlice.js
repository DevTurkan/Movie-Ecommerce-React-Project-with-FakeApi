import { createSlice } from '@reduxjs/toolkit'


export const openSlice = createSlice({
  name: 'openwindow',
  initialState: {
    openact:'',
    openbasketpayment:'',
    openimage:'',
    toggleact: '',
    activbuttonclass: {
      btnA: 'mcenter_button activ_button', 
      btnB: 'mcenter_button', 
      btnC: 'mcenter_button', 
      btnD: 'mcenter_button', 
      btnE: 'mcenter_button'
    },
    showmovie: "firstinfo"
    
  },
  reducers: {
    btnAfunk: (state, action) => {
      state.activbuttonclass = 
      {
        btnA: 'mcenter_button activ_button', 
        btnB: 'mcenter_button', 
        btnC: 'mcenter_button', 
        btnD: 'mcenter_button', 
        btnE: 'mcenter_button'
      }

      state.showmovie = "firstinfo"
    },
    btnBfunk: (state, action) => {
      state.activbuttonclass = 
      {
        btnA: 'mcenter_button', 
        btnB: 'mcenter_button activ_button', 
        btnC: 'mcenter_button', 
        btnD: 'mcenter_button', 
        btnE: 'mcenter_button'
      }
      state.showmovie = "secondinfo"

    },
    btnCfunk: (state, action) => {
      state.activbuttonclass = 
      {
        btnA: 'mcenter_button', 
        btnB: 'mcenter_button', 
        btnC: 'mcenter_button activ_button', 
        btnD: 'mcenter_button', 
        btnE: 'mcenter_button'
      }
      state.showmovie = "thirdinfo"

    },
    btnDfunk: (state, action) => {
      state.activbuttonclass = 
      {
        btnA: 'mcenter_button', 
        btnB: 'mcenter_button', 
        btnC: 'mcenter_button', 
        btnD: 'mcenter_button activ_button', 
        btnE: 'mcenter_button'
      }
      state.showmovie = "fourinfo"

    },
    btnEfunk: (state, action) => {
      state.activbuttonclass = 
      {
        btnA: 'mcenter_button', 
        btnB: 'mcenter_button', 
        btnC: 'mcenter_button', 
        btnD: 'mcenter_button', 
        btnE: 'mcenter_button activ_button'
      }
      state.showmovie = "fiveinfo"

    },

    openfunk: (state, action) => {
      state.openact = true;
    },

    closefunk: (state, action) => {
      state.openact = false;
    },

    openpaymentfunk: (state, action) => {
      state.openbasketpayment = true;
    },

    closepaymentfunk: (state, action) => {
      state.openbasketpayment = false;
    },

    openimgfunk: (state, action) => {
      state.openimage = true;
    },

    closeimgfunk: (state, action) => {
      state.openimage = false;
    },

    togglefunk: (state, action) => {

      if(state.toggleact == false){
        state.toggleact=true;
      }
      else{
          state.toggleact = false;
      }
      
      
    }
  }
})

export const { openimgfunk, closeimgfunk, btnAfunk, btnBfunk, btnCfunk, btnDfunk, btnEfunk, openfunk, closefunk, openpaymentfunk, closepaymentfunk, togglefunk } = openSlice.actions

export default openSlice.reducer