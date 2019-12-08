import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import * as firebase from 'firebase';
import {validateEmail} from '../../utils/Validation';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


 function FormLogin(props){

   const [hidePassword,setHidePassword] = useState(true);
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");

   const [visibleLoadin,setVisibleLoading] = useState(false);
   const { toastRef,navigation } = props;


const login = async () =>{
    setVisibleLoading(true);
    console.log("email: " + email+ " contra: "+ password); 
    if(!email || !password){
        console.log("complete los datos");
        toastRef.current.show("Datos incompletos");
    }else{
        if(validateEmail(email)){
             await  firebase.auth()
             .signInWithEmailAndPassword(email,password)
             .then(() => {
                navigation.navigate("MyAccount");
                console.log("se inicio session"); 
             })
             .catch(() => {
                console.log("no se inicion session");
                toastRef.current.show("Error al iniciar session");
             })
        }else{
            toastRef.current.show("Email incorrecto");
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
             <Input
            placeholder={AppText.INPUT_CONTRASENA}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePassword}
            label={AppText.INPUT_CONTRASENA_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setPassword(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={hidePassword ? "eye-off-outline":"eye-outline"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {setHidePassword(!hidePassword)}}
                /> }
             />

            <Button
            title={AppText.BOTON_LOGIND}
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={login}
            type={AppText.BOTON_TYPE}
            />
            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoadin}
            />
        </View>
    );
}

export default withNavigation(FormLogin)


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