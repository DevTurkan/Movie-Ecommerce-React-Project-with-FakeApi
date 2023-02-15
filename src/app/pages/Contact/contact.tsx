import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import contactstyle from "./contact.module.scss";
import { postContact, ContactData } from "../../services/Contactmessages";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";

import { useDispatch, useSelector } from 'react-redux';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from "../../features/CardSlice";
import { UserData } from "../../services/UserInfo";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)

    const [userfirstname, setUserfirstname] = useState<String>("");
    const [userlastname, setUserlastname] = useState<String>("");
    const [useremail, setUseremail] = useState<String>("");
    const [usermessage, setUsermessage] = useState<String>("");
                                  
    const dispatch = useDispatch()
    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])
    
    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {

      
    }, [translate])

    const contactSystem = (e) => {
        e.preventDefault(); 

        if(userfirstname && userlastname && useremail && usermessage){
            let contactdata = {
                firstname: userfirstname,
                lastname: userlastname,
                mail: useremail,
                messages: usermessage
            }
            postContact(contactdata).then(res => {
                console.log(res)
            })

           setUserfirstname("");
           setUserlastname("");
           setUseremail("");
           setUsermessage("");

           toast.success('Your message was sent successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        }

        return false;

    }
  


    return (
        <>
        <div className={contactstyle.section1}>
                <h1>{contnt.contacth11}</h1>
        </div>

        <div className={contactstyle.section2}>
            <div className={contactstyle.container2}>
                <div className={contactstyle.section2_form}>
                <ToastContainer />
                    <p>{contnt.contactp1}</p>

                    <form onSubmit={contactSystem}>
                        <input value={userfirstname} onChange={(e) => setUserfirstname(e.target.value)} required type={'text'}  placeholder='First Name'/>
                        <input value={userlastname} onChange={(e) => setUserlastname(e.target.value)} required type={'text'} placeholder='Last Name'/>
                        <input value={useremail} onChange={(e) => setUseremail(e.target.value)} required type={'email'} placeholder='Email'/>
                        <textarea value={usermessage} onChange={(e) => setUsermessage(e.target.value)} required placeholder="Message"></textarea>
                        <button type="submit">{contnt.contacbtn}</button>
                    </form>

                </div>
            </div>
        </div>
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(ContactPage)
