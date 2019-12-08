import React,{useState, Fragment} from 'react';
import {SocialIcon} from 'react-native-elements';
import { View } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import FacebookApli from '../../utils/Social';
import AppText from '../../utils/text/text.all';
import Loading from '../../components/loading/Loading';


export default function LoginRb(props){


  const {toastRef,navigation} = props;
  const [isLoading, setIsloading] =useState(false);

  const login = async () => {
    setIsloading(true);
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(
      FacebookApli.ID_FACEBOOK,
      {permissions: [FacebookApli.PERMISSIONS]}
    );
  
    if(type==="success"){
       const credentials = firebase.auth.FacebookAuthProvider.credential(token);
       await firebase.auth()
       .signInWithCredential(credentials)
       .then(() => {
        setIsloading(false);
        toastRef.current.show("Se inicio session");
        navigation.navigate("MyAccount");
       })
       .catch(() => {
        setIsloading(false);
         toastRef.current.show("Error al iniciar session");
       });
    }else if(type === "cancel"){
      setIsloading(false);
      toastRef.current.show("Cancelado");
    }else{
      setIsloading(false);
      toastRef.current.show("Error desconocido");
    }
  };


    return(
        <>
        <SocialIcon
        title="Iniciar con Facebook"
        button
        type='facebook'
        onPress={login}
        />
        <Loading
        isvisible={isLoading}
        textshow={AppText.TEXT_SHOW_PROCESS}
        />
        </>

    );

}