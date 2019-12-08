import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as firebase from 'firebase';
import {reautenticate} from '../../utils/api/Api';


export default  function ChangeEmail(props){

    const {email,setIsVisibleModal,toastRef,setReloadData}=props;
    const [hidePassword,setHidePassword] = useState(true);
    const [visibleLoadin,setVisibleLoading] = useState(false);
    const [newEmail,setNewEmail] = useState(null);
    const [password,setPassword] = useState("");
    const [error,setError] = useState({});

const updateEmail = () =>{
    setError({});
    if(newEmail != null && email != newEmail && password){
            setVisibleLoading(true);
            reautenticate(password)
            .then(() => {
                firebase.auth().currentUser.updateEmail(newEmail)
                .then(() =>{
                    setReloadData(true);
                    toastRef.current.show("Email actualizado OK");
                    setVisibleLoading(false);
                    setIsVisibleModal(false);
                }).catch(() => {
                    setError({email:"Error actualizando email"});
                    setVisibleLoading(false);
                })
            })
            .catch(() => {
                setError({password: "La contraseña no es correcta"})
                setVisibleLoading(false);
            });
        }else{
            setError({email:"Los datos estan incompletos"});
        }
    
    
}


    return(
        <View style={styles.formContainer}>
            <Input
            placeholder={AppText.INPUT_CORREO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_USUARIO_LABEL}
            labelStyle={styles.labelStyles}
            defaultValue={email && email}
            onChange={e => setNewEmail(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
                errorMessage={error.email}
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
                errorMessage={error.password}
             />

            <Button
            title="Cambiar email"
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={updateEmail}
            type={AppText.BOTON_TYPE}
            loading={visibleLoadin}
            />
        </View>
    );
}



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