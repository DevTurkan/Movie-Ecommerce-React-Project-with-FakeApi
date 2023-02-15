import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import bgvideo from "../../../assets/images/basketbg.mp4";

import basketstyle from "./basket.module.scss";
import './basket.scss';

// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";
import { useNavigate } from 'react-router-dom';
import { getAllUsers, UserData, putAllUsers } from "../../services/UserInfo";
import { totalitemFunction, selecteduserBasketDelete, favoritecountFunction, watchcountFunction } from "../../features/CardSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import {openpaymentfunk, closepaymentfunk} from '../../features/OpenSlice';

import swal from 'sweetalert';
import Swal from 'sweetalert2';

const BasketPage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)

    const totalitems = useSelector(state => state.cardd.totalitem);
    const opn = useSelector(state => state.openn.openbasketpayment)
    const [allusers, setAllusers] = useState<UserData[]>([])
    // const [updateselectuser, setUpdateselectuser] = useState<UserData>(JSON.parse(localStorage.getItem('storageselectusermovie')));
       const [updateselectuser, setUpdateselectuser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const navigate = useNavigate();
    
    const dispatch = useDispatch()
                                 // const [totalpriceforusers, setTotalpriceforusers] = useState<UserData[]>([])
    const [totalprice, setTotalprice]  = useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.card.map(x => (x.price * x.quantity)) : [])
                                 // const [totalpricee, setTotalpricee]  = useState(localStorage.getItem('storageselectusermovie') ? totalpriceforusers.map(x => x.card.map(y => (y.price * y.quantity))) : [])

    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.watchlist.length : 0)

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])

    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])


const [activclass, setActivclass] = useState({categoryA: 'categorydesign activv', categoryB: 'categorydesign'});
const [category, setCategory]  = useState('moviecategory');

const activeA = () => {
    setActivclass({categoryA: 'categorydesign activv', categoryB: 'categorydesign'});
    setCategory('moviecategory');
}

const activeB = () => {
    setActivclass({categoryA: 'categorydesign', categoryB: 'categorydesign activv'});
    setCategory('productcategory');
}

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        getUserListforBasket();
        
                        // if(!localStorage.getItem('loggedUser')){
                        //     navigate('/signUp')
                        // }
      
    }, [translate])

    useEffect(() => {
        getUserListforBasket();
        // getselectuser();
        
        // fff();
        console.log('ok')
    }, [updateselectuser])


    useEffect(() => {
        if (opn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
       
     }, [opn]);

                                        // useEffect(() => {
                                        //     getselectuser();
                                        // }, [allusers])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));

        
        // fff();
        console.log('ok')
    }, [totalitem])

    const getUserListforBasket = async () => {
        const get_basketroducts= await getAllUsers();
        // console.log("getuser::", get_basketroducts)
        setAllusers(old_data => get_basketroducts);
        // setTotalpriceforusers(oldd_data => get)
    }

                                    // const getselectuser =  () => {
                                    //     // setTotalpriceforusers(allusers.filter(x => x.id == updateselectuser.id).map(x => x.card));
                                    //     setTotalpriceforusers(allusers.filter(x => x.id == updateselectuser.id));

                                    //     console.log(totalpriceforusers);
                                    //     setTotalpricee(totalpriceforusers.map(x => x.card.map(y => (y.price * y.quantity))))
                                    // }

    // const klikket =() =>{
    //     const arraay = [];
    //     arraay.push(updateselectuser.card.map(x => Number((Number(x.price) * x.quantity).toFixed(2))));
    //     // console.log(arraay.reduce((a, b) => a + b, 0));
        
    //     // console.log((totalpricee[0].reduce((a, b) => a + b, 0)).toFixed(2))
    // }

    const deletebasket = (prdId:number) => {
        Swal.fire({
            title: 'Are you sure?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1b26c0',
            cancelButtonColor: '#d80808',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(selecteduserBasketDelete([updateselectuser, prdId]));
                localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
                // setTotalprice(updateselectuser.card.map(x => Number(x.price * x.quantity).toFixed(2)));
                setTotalprice(updateselectuser.card.map(x => (x.price * x.quantity)));
    
                setTotalitem(updateselectuser.card.map(x => x.quantity))
    
                updateapi();
                getUserListforBasket();

              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            }
          })
        
     
    }
    const updateapi = () => {
       const userinfo = allusers.find(row => row.id == updateselectuser.id)
        let dataa = {
            userName: userinfo?.userName,
            email: userinfo?.email,
            password: userinfo?.password,
            watchlist:updateselectuser.watchlist,
            card:updateselectuser.card,
            wishlist: updateselectuser.wishlist
        }

        putAllUsers(dataa, `${updateselectuser.id}`).then(res => {
            console.log(res)
        })

              getUserListforBasket();

    }
        const increase = (prdid:number, prdcat:string) => {
           const findprd = updateselectuser.card.find(x => x.id==prdid && x.category == prdcat);
           findprd.quantity= findprd.quantity + 1;
           localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
           updateapi();
           getUserListforBasket();
           
        //    setTotalprice(updateselectuser.card.map(x => Number(x.price * x.quantity).toFixed(2)));
           setTotalprice(updateselectuser.card.map(x => (x.price * x.quantity)));

           setTotalitem(updateselectuser.card.map(x => x.quantity))

        }

        const decrease = (prdid:number, prdcat:string) => {
            const findprd = updateselectuser.card.find(x => x.id==prdid && x.category == prdcat);
            // findprd.quantity= findprd.quantity - 1;
            // findprd.quantity= findprd.quantity > 1 ? findprd.quantity - 1 : deletebasket(findprd?.id)
            // findprd.quantity > 1 ? findprd.quantity - 1 : deletebasket(findprd?.id)

            if(findprd.quantity > 1){
                findprd.quantity = findprd.quantity - 1
            }
            else if(findprd.quantity == 1){
                deletebasket(findprd?.id)
            }
           
            localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
            updateapi();
            getUserListforBasket();
        
            // setTotalprice(updateselectuser.card.map(x => Number(x.price * x.quantity).toFixed(2)));
            setTotalprice(updateselectuser.card.map(x => (x.price * x.quantity)));

            setTotalitem(updateselectuser.card.map(x => x.quantity))

        }

        const clearCart=() => {
            if(updateselectuser.card.length > 0){
                Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#1b26c0',
                    cancelButtonColor: '#d80808',
                    confirmButtonText: 'Yes, delete all!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        updateselectuser.card.splice(0, updateselectuser.card.length);
                        localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
                        // setTotalprice(updateselectuser.card.map(x => Number(x.price * x.quantity).toFixed(2)));
                        setTotalprice(updateselectuser.card.map(x => (x.price * x.quantity)));
    
                        setTotalitem(updateselectuser.card.map(x => x.quantity))
    
                        updateapi();
                        getUserListforBasket();

                      Swal.fire(
                        'Deleted!',
                        'Your all products has been deleted.',
                        'success'
                      )
                    }
                  })
                
               
                
            }
            
        }

        const orderFinished = (e) => {
            e.preventDefault(); 
            swal({
                title: "Success!",
                text: "Your order was completed successfully",
                icon: "success",
                button: "OK",
            });
            dispatch(closepaymentfunk())
            return false;
        }
     
    return (
        <>
        <div className={basketstyle.section1}>
                     {/* <video src={bgvideo} autoPlay loop muted /> */}
            <div className={basketstyle.container1}>
                <div className={basketstyle.container1_header}>
                    <h1>{contnt.basketh11}</h1>

                    <div className={basketstyle.keepshopping}>
                        <NavLink to="/productshop"><h3><FontAwesomeIcon icon={faArrowLeftLong} />{contnt.basketlink1}</h3></NavLink>
                        <NavLink to="/mediacenter"><h3><FontAwesomeIcon icon={faArrowLeftLong} />{contnt.basketlink2}</h3></NavLink>
                    </div>
                </div>
                
                <div className={basketstyle.container1_cartcategory}>
                    <h4 onClick={activeA} className={activclass.categoryA}>{contnt.basketcateg1}</h4>
                    <h4 onClick={activeB} className={activclass.categoryB}>{contnt.basketcateg2}</h4>
                </div>

                <div className={basketstyle.container1_cartcategory_common}>
                        <div className={basketstyle.container1_cartcategoryAB}>
                                {
                                    category == 'moviecategory' ? 
                                    <>
                                        <div className={basketstyle.container1_cartcategory_movie}>
                                            <ul>
                                                {
                                                    allusers?.filter(userrow => userrow.id == updateselectuser.id)?.map(currentuser => {
                                                        return(
                                                            <>
                                                                {
                                                                    currentuser.card?.filter(rowc => rowc.category !== "Spectacles" && rowc.category !== "Snacks" && rowc.category !== "Beverages").length == 0 ? <h1 className={basketstyle.emptycart}>Movie cart is empty</h1> :
                                                                    currentuser.card?.filter(rowc => rowc.category !== "Spectacles" && rowc.category !== "Snacks" && rowc.category !== "Beverages")?.map(rowmovie => {
                                                                        return(
                                                                            <>
                                                                                <li>
                                                                                    <div className={basketstyle.container1_cartcategory_movie_s1}>
                                                                                        <button onClick={() => deletebasket(rowmovie.id)} type="button"><FontAwesomeIcon icon={faCircleXmark} /></button>
                                                                                        <div className={basketstyle.movie_link}>
                                                                                            <img src={rowmovie.image} />
                                                                                            <NavLink to={`/mediacenter/movieabout?moviename=${rowmovie.name}`}></NavLink>
                                                                                        </div>
                                                                                        
                                                                                        <ul className={basketstyle.movie_catname}>
                                                                                            <li>{rowmovie.category}</li>
                                                                                            <li>{rowmovie.name}</li>
                                                                                            <li>{rowmovie.episodes} episodes</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    
                                                                                    <h5>${rowmovie.price}</h5>
                                                                                
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    })
                                                                
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </>

                                    :

                                    <>
                                        <div className={basketstyle.container1_cartcategory_product}>
                                        <ul>
                                                {
                                                    allusers?.filter(userrow => userrow.id == updateselectuser.id)?.map(currentuser => {
                                                        return(
                                                            <>
                                                                {
                                                                    currentuser.card?.filter(rowc => rowc.category !== "Film" && rowc.category !== "Series" && rowc.category !== "Documentary" && rowc.category !== "Kids").length == 0 ? <h1 className={basketstyle.emptycart}>Product cart is empty</h1> : 
                                                                    currentuser.card?.filter(rowc => rowc.category !== "Film" && rowc.category !== "Series" && rowc.category !== "Documentary" && rowc.category !== "Kids")?.map(rowproduct => {
                                                                        return(
                                                                            <>
                                                                                <li>
                                                                                    <div className={basketstyle.container1_cartcategory_product_s1}>
                                                                                        <button onClick={() => deletebasket(rowproduct.id)} type="button"><FontAwesomeIcon icon={faCircleXmark} /></button>
                                                                                        <div className={basketstyle.product_img}>
                                                                                            <img src={rowproduct.image} />
                                                                                        </div>
                                                                                        
                                                                                        <ul className={basketstyle.prd_catname}>
                                                                                            <li>{rowproduct.name}</li>
                                                                                            <li>{rowproduct.category}</li>
                                                                                            {/* <li>{rowproduct.quantity} quantity</li> */}
                                                                                        </ul>
                                                                                    </div>
                                                                            
                                                                                    <div className={basketstyle.container1_cartcategory_product_s2}>
                                                                                        <div className={basketstyle.prd_quantity}>
                                                                                            <button onClick={() => decrease(rowproduct.id, rowproduct.category)} type="button">-</button>
                                                                                            <input type="text" value={rowproduct.quantity} />
                                                                                            <button onClick={() => increase(rowproduct.id, rowproduct.category)} type="button">+</button>
                                                                                        </div>
                                                                                    <h5>${(Number(rowproduct.price) * rowproduct.quantity).toFixed(2)}</h5>
                                                                                    </div>
                                                                                    {/* <h1>{rowproduct.name}</h1>
                                                                                    <h3>{rowproduct.category}</h3>
                                                                                    <p>{rowproduct.quantity}</p> */}
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    })
                                                                
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </>
                                }
                        </div>

                        <div className={basketstyle.container1_cartcategorycommon_right}>
                                <div className={basketstyle.container1_cartcategorycommon_right_s}>
                                    <p>{contnt.basketp1}</p>
                                    <h3>{totalitem.reduce((a, b) => a + b, 0)}</h3>
                                </div>
                                <div className={basketstyle.container1_cartcategorycommon_right_s}>
                                    <p>{contnt.basketp2}</p>
                                    <h3>${(totalprice.reduce((a, b) => a + b, 0)).toFixed(2)}</h3>
                                </div><div className={basketstyle.container1_cartcategorycommon_right_s}>
                                    <p>{contnt.basketp3}</p>
                                    <h3>$5.99</h3>
                                </div><div className={basketstyle.container1_cartcategorycommon_right_s}>
                                    <p>{contnt.basketp4}</p>
                                    <h3>${(totalprice.reduce((a, b) => a + b, 0) + 5.99).toFixed(2)}</h3>
                                </div>
                                <button type="button"
                                    onClick={() => {
                                        dispatch(openpaymentfunk(false))                       
                                    }}
                                >{contnt.basketbtn1}</button>
                                <button onClick={clearCart} type="button">{contnt.basketbtn2}</button>
                                

                        </div>

                </div>




            </div>
        </div>

    
        {
            opn && 
            <div className={basketstyle.modalback}>
                <div className={basketstyle.modalcommon}>
                    <h1>{contnt.basketh12}</h1>
                    <button onClick={() => {dispatch(closepaymentfunk())}} className={basketstyle.modalcommon_close} type="button">X</button>
                    <form onSubmit={orderFinished}>
                        <div className={basketstyle.modalcommon_name}>
                            <input type={'text'} required placeholder='First Name' />
                            <input type={'text'} required placeholder='Last Name' />
                        </div>
                        <input type={'email'} required placeholder='Email' />
                        <input type={'tel'} required placeholder='Phone' />
                        <input type={'text'} required placeholder='Country/Region' />
                        <input type={'text'} required placeholder='City' />
                        <input type={'text'} required placeholder='Street Address' />
                        <textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        <button type="submit">{contnt.basketbtn3}</button>
                    </form>
                </div>
            </div>
        }

        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(BasketPage)
