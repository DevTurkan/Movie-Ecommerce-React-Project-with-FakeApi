import { createSlice } from '@reduxjs/toolkit'
import { ProductData, ShopProductData } from '../services/Product';
import { getAllUsers, postAllUsers, UserData } from '../services/UserInfo';



export const cardSlice = createSlice({
  name: 'card',
 
  initialState:  {
    totalitem:[],
    favoritecount: 0,
    watchlistcount: 0

    
  },
  reducers: {

    totalitemFunction: (state, action:any) => {
      state.totalitem=action.payload;
    },
   
    favoritecountFunction: (state, action:any) => {
      state.favoritecount=action.payload;
    },

    watchcountFunction: (state, action:any) => {
      state.watchlistcount=action.payload;
    },
    selecteduserMovieBasket: (state, action:any) => {
      const cardmovie:UserData = action.payload[0];
      const idmovie:number = action.payload[1];
      const filterallmovie:ProductData = action.payload[2];
      const catgmovie:string = action.payload[3];

      const quantity:number = 1;
      let findmovie = cardmovie.card.find(item => item.id == idmovie && item.category == catgmovie);

      if(findmovie===undefined){
        cardmovie.card.push({id: filterallmovie.id, name: filterallmovie.name, price: filterallmovie.price, image: filterallmovie.image, category: filterallmovie.category, episodes: filterallmovie.episodes, quantity: quantity});        
      }

      else if(findmovie!==undefined){
        let findindexmovie = cardmovie.card.findIndex(itemm => itemm.id == idmovie);
        cardmovie.card.splice(findindexmovie,1)
      }
     

    },

    selecteduserBasketDelete: (state, action:any) => {
      const cardmovie:UserData = action.payload[0];
      const idmovie:number = action.payload[1];
      let findindexmovie = cardmovie.card.findIndex(itemm => itemm.id == idmovie);
      cardmovie.card.splice(findindexmovie,1)
    },
    
    selecteduserWatchlist: (state, action:any) => {
      const cardmovie:UserData = action.payload[0];
      const idmovie:number = action.payload[1];
      const filterallmovie:ProductData = action.payload[2];

      let findmovie = cardmovie.watchlist.find(item => item.id == idmovie);

      if(findmovie===undefined){
        cardmovie.watchlist.push({id: filterallmovie.id, name: filterallmovie.name, price: filterallmovie.price, image: filterallmovie.image, category: filterallmovie.category, episodes: filterallmovie.episodes});        
      }

      else if(findmovie!==undefined){
        let findindexmovie = cardmovie.watchlist.findIndex(itemm => itemm.id == idmovie);
        cardmovie.watchlist.splice(findindexmovie,1)
      }
     

    },

    selecteduserWatchlistDelete: (state, action:any) => {
        const cardmovie:UserData = action.payload[0];
        const idmovie:number = action.payload[1];
        
            let findindexmovie = cardmovie.watchlist.findIndex(itemm => itemm.id == idmovie);
            cardmovie.watchlist.splice(findindexmovie,1)
       
  
    },

       
    selecteduserProductBasket: (state, action:any) => {
      const cardproduct:UserData = action.payload[0];
      const idproduct:number = action.payload[1];
      const filterallproduct:ShopProductData = action.payload[2];
      const catgprd:string = action.payload[3];
const quantity:number = 1;

      let findprd = cardproduct.card.find(item => item.id == idproduct && item.category == catgprd);

      if(findprd===undefined){
        cardproduct.card.push({id: filterallproduct.id, name: filterallproduct.name, price: filterallproduct.price, image: filterallproduct.image, category: filterallproduct.category, quantity: quantity});        
      }

      else if(findprd!==undefined){
       findprd.quantity = findprd.quantity + 1;
        // cardproduct.card = cardproduct.card.map((row) => 
        //   (row.id == idproduct && row.category == catgprd) ? {...row, quantity: quantity+1} : quantity
        // )

        // let findindexprd = cardproduct.wishlist.findIndex(itemm => itemm.id == idproduct);
        // cardproduct.wishlist.splice(findindexprd,1)
      }
           


    },

    selecteduserWishlist: (state, action:any) => {
      const cardproduct:UserData = action.payload[0];
      const idproduct:number = action.payload[1];
      const filterallproduct:ShopProductData = action.payload[2];

      let findprd = cardproduct.wishlist.find(item => item.id == idproduct);

      if(findprd===undefined){
        cardproduct.wishlist.push({id: filterallproduct.id, name: filterallproduct.name, price: filterallproduct.price, image: filterallproduct.image, category: filterallproduct.category});        
      }

      else if(findprd!==undefined){
        let findindexprd = cardproduct.wishlist.findIndex(itemm => itemm.id == idproduct);
        cardproduct.wishlist.splice(findindexprd,1)
      }
     

    },

    selecteduserWishlistDelete: (state, action:any) => {
      const cardproduct:UserData = action.payload[0];
      const idproduct:number = action.payload[1];
      
      let findindexprd = cardproduct.wishlist.findIndex(itemm => itemm.id == idproduct);
      cardproduct.wishlist.splice(findindexprd,1)
     

    }
  }
})

export const { totalitemFunction, favoritecountFunction, watchcountFunction, selecteduserMovieBasket, selecteduserBasketDelete, selecteduserWatchlist, selecteduserWatchlistDelete, selecteduserProductBasket, selecteduserWishlist, selecteduserWishlistDelete } = cardSlice.actions

export default cardSlice.reducer