import React, {useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {Input,Icon,Button} from 'react-native-elements';
import {validateEmail} from '../../utils/Validation';
import * as firebase from 'firebase';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';

import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

function FormularioRegister(props){


    const { toastRef,navigation } = props;
    const [hidePassword,sethidePassword] = useState(true);
    const [hidePasswordtwo,sethidePasswordtwo] = useState(true);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");

    const [isVisibleLoadin,setisvisibleLoading] = useState(false);


    const crearcuenta = async () =>{
        setisvisibleLoading(true);
         if(!email || !password || !repeatPassword ){

            toastRef.current.show("Todos los campos son obligatorios");
            
         }else{

            if(validateEmail(email)){
                if(password!==repeatPassword){
                    toastRef.current.show("Las contraseñas no coinciden");
                }else{
                    
                    await firebase.auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(() => {
                        navigation.navigate("MyAccount");
                    })
                    .catch(() =>{
                        toastRef.current.show("no se puede crear la cuenta");
                    }) 


                }
            }else{
                toastRef.current.show("El email no es correcto");
            }
         }
         setisvisibleLoading(false);
    }

    return(
        <View  style={StyleSheet.formContainer} >

            <Input
            placeholder={AppText.INPUT_CORREO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CORREO_LABEL}
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

         <Input
            placeholder={AppText.INPUT_CONTRASENA_CONFIRMACION}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePasswordtwo}
            label={AppText.INPUT_CONTRASENA_CONFIRMACION_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setRepeatPassword(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={hidePasswordtwo ? "eye-off-outline":"eye-outline"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {sethidePasswordtwo(!hidePasswordtwo)}}
                /> }
             />

             <Button
             title={AppText.BOTON_CREAR_CUENTA}
             containerStyle={styles.btnContainer}
             buttonStyle={styles.btnRegister}
             onPress={crearcuenta}
             type={AppText.BOTON_TYPE}
             ></Button>

             <Loading
             textshow ={AppText.TEXT_SHOW_PROCESS}
             isvisible={isVisibleLoadin}
             />

        </View>
    );

}

export default withNavigation(FormularioRegister);


const styles = StyleSheet.create({

    formContainer:{
        flex:1,
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
        marginTop:AppStyles.MARGIN_TOP
    },
    btnContainer:{
        marginTop:AppStyles.MARGIN_TOP,
        width:AppStyles.WIDTH
    },
    btnRegister:{
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