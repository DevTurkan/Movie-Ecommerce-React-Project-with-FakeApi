import { createSlice } from '@reduxjs/toolkit';
import { ProductData } from 'app/services/Product';
import { UserData } from 'app/services/UserInfo';
import { UserStateRdx } from 'app/services/UserInfo';

const initialState: UserStateRdx ={
  alluserslist:[],
  selecteduser:{}
}

export const userSlice = createSlice({
  name: 'user',
  // initialState:{
  //   alluserlist: [],
  //   selectuser: []
  // },
  initialState,
  reducers: {

    getuserfunk: (state, action) => {
      state.alluserslist = action.payload
    },

    selecteduserfunk: (state, action:any) => {
      state.selecteduser = action.payload
    },

    // selecteduserWatchlist: (state, action:any) => {
    //   const { id, price, name, category, image } = action.payload;
    //   // state.selecteduser.watchlist.id = action.payload;
    //   // const id: number = action.payload;
      
    //   const findmovie = state.selecteduser.watchlist.find<ProductData>((movieitem) => movieitem.id = id);

    //   if(findmovie == undefined){
    //     state.selecteduser.watchlist.push<ProductData>({
    //       id, 
    //       price, 
    //       name,
    //       category,
    //       image,
    //     });
    //   }

    //   else if(findmovie != undefined){
    //     state.selecteduser.watchlist.splice(state.selecteduser.watchlist.indexOf(findmovie), 1);
    //   }
       
    // }
  }
})

export const { getuserfunk, selecteduserfunk } = userSlice.actions

export default userSlice.reducer