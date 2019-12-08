import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import * as firebase from 'firebase';
import {validateEmail} from '../../utils/Validation';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


 function FormularioRecuperar(props){

   const [email,setEmail] = useState("");

   const [visibleLoadin,setVisibleLoading] = useState(false);
   const { toastRef,navigation } = props;


const resetpassword = async () =>{
    setVisibleLoading(true);
    console.log("email: " + email); 
    if(!email){
        console.log("complete los datos");
    }else{
        if(validateEmail(email)){
             await  firebase.auth()
             .sendPasswordResetEmail(email)
             .then(() => {
                navigation.navigate("login");
                console.log("se a enviado el correo"); 
                toastRef.current.show("Se envio el correo con exito");
             })
             .catch(() => {
                console.log("no se envio el corrreo");
                toastRef.current.show("no se pudo enviar el correo");
             })
        }else{
         
        console.log("incorrecto");
        }
    }
    setVisibleLoading(false);
}

    return(
        <View style={styles.formContainer}>
            <Input
            placeholder={AppText.INPUT_USUARIO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_USUARIO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setEmail(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
             />

            <Button
            title={AppText.BOTON_LOGIND}
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={resetpassword}
            type={AppText.BOTON_TYPE}
            />
            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoadin}
            />
        </View>
    );
}

export default withNavigation(FormularioRecuperar)


const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
        marginTop:AppStyles.MARGIN_TOP
    },
    ContainerbtnLogin:{
        marginTop:AppStyles.MARGIN_TOP,
        width:AppStyles.WIDTH
    },
    btnLogin:{
        backgroundColor:AppStyles.SECONDARY_COLOR
    },
    inputForm:{
        width:AppStyles.WIDTH,
        marginTop:AppStyles.MARGIN_TOP  
    },
    iconRight:{
       color:AppStyles.ICON_RIGTH_COLOR
    },
    labelStyles:{
        color:AppStyles.INPUT_LABEL_COLOR
    }
})