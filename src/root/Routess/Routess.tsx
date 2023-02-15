import React , {useEffect, useState} from 'react'
import {
  Layout
} from 'antd';
const { Content } = Layout;
import { Route, Routes, useLocation } from 'react-router-dom'
import {connect, useDispatch} from "react-redux";
import RequireAuth from './RequiredAuth'


/**/
import ScrollToTop from './ScrollToTop';
import HeaderComponent from "../../app/layouts/Header";

import HomePage from 'pages/Home/index'
import AboutPage from 'pages/About/about'
import ContactPage from 'pages/Contact/contact'
import MediaPage from 'pages/MediaCenter/mediaCenter'
import ProductshopPage from 'pages/Productshop/productshop';
import FooterComponent from '../../app/layouts/Footer'
import MovieAboutPage from 'pages/MovieAbout/movieabout';
import SignInPage from 'pages/Registration/signin';
import SignUpPage from 'pages/Registration/signup';
import FavoritePage from 'pages/Favorite/favorites';
import BasketPage from 'pages/Basket/basketcard';
import MyAccountPage from 'pages/Myaccount/myaccount';
import SettingsPage from 'pages/AccountSettings/accountsetting';
import WatchlistPage from 'pages/Watchlist/watchlist';

import Loginauth from 'pages/RequireAuth/logindex';
import { UserData } from 'app/services/UserInfo';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from '../../app/features/CardSlice';

const routes = [
    {
        element: HomePage,
        // exact: true,
        path: '/',
    },
    {
        element: AboutPage,
        // exact: true,
        path: '/about',
    },
    {
        element: MediaPage,
        // exact: true,
        path: '/mediacenter',
    },
    {
        element: ProductshopPage,
        // exact: true,
        path: '/productshop',
    },
    {
        element: ContactPage,
        // exact: true,
        path: '/contact',
    },
    {
        element: MovieAboutPage,
        // exact: true,
        path: '/mediacenter/movieabout',
    },
    {
        element: SignInPage,
        // exact: true,
        path: '/signIn',
    },
 
    {
        element: SignUpPage,
        // exact: true,
        path: '/signUp',
    },
    {
        element: RequireAuth(FavoritePage),
        // exact: true,
        path: '/favorite',
    },
    {
        element: RequireAuth(BasketPage),
        // exact: true,
        path: '/basket',
    },
    {
        element: RequireAuth(MyAccountPage),
        // exact: true,
        path: '/myaccount',
    },
    {
        element: RequireAuth(WatchlistPage),
        // exact: true,
        path: '/watchlist',
    },
    {
        element: RequireAuth(SettingsPage),
        // exact: true,
        path: '/settings',
    },
    /* {
        component: RequireAuth(Profile),
        exact: true,
        path: '/profile',
    }, */
    

]


const Routess:React.FC<any> = ({translate}) =>  {
    // const dispatch = useDispatch()

    // const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    // const [favcount, setFavcount]=useState<number>(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    // const [watchcount, setWatchcount]=useState<number>(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    // useEffect(() => {
    //     dispatch(watchcountFunction(watchcount));
    // }, [watchcount])

    // useEffect(() => {
    //     dispatch(favoritecountFunction(favcount));
    // }, [favcount])

    // useEffect(() => {
    //     dispatch(totalitemFunction(totalitem));
    // }, [totalitem])

  const location = useLocation();
  const pathname=location.pathname;

  useEffect(() => {
    
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })

  }, [pathname])

  // @ts-ignore
  return (
      <>

          <HeaderComponent />

          <main className={'main full '} role={'main'}  >

              
                <Routes>
                  {
                      routes.map((route:any) => {

                          return <Route {...route} element={<route.element/>} key={route.path}/>
                      })

                  }
                </Routes>
              

          </main>

                  

          <FooterComponent/>
        
          <ScrollToTop />

      </>

  )
}


const mapStateToProps = (state: any) => ({
    translate:  []
})

export default connect(mapStateToProps, {})(Routess);
