import React,{useState,useEffect} from 'react';
import * as firebase from 'firebase';
import Loading from '../../components/loading/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import AppText from '../../utils/text/text.all';

export default function MyCuenta(){

const [login,setLogin] = useState(null);

useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        !user ? setLogin(false) :  setLogin(true);
    })
},[]);

if(login==null){
return (
    <Loading  isvisible={true} textshow={AppText.TEXT_SHOW_PROCESS} />
)
}

return login ? <UserLogged/> : <UserGuest/>

}