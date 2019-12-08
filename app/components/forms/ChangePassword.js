import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as firebase from 'firebase';
import {reautenticate} from '../../utils/api/Api';


export default  function ChangePassword(props){

    const {setIsVisibleModal,toastRef}=props;
    const [hidePassword,setHidePassword] = useState(true);
    const [newHidePassword,setNewHidePassword] = useState(true);
    const [newHidePasswordConfirmate,setNewHidePasswordConfirmate] = useState(true);
    const [visibleLoadin,setVisibleLoading] = useState(false);
    const [password,setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [newPasswordConfirmate,setNewPasswordConfirmate] = useState("");
    const [error,setError] = useState({});

const updatePassword = () =>{
    setError({});
    let objError = {};
    if(!password || !newPassword || !newPasswordConfirmate ){
        !password && (objError.password = "Dato vacio");
        !newPassword && (objError.newPassword = "Dato vacio");
        !newPasswordConfirmate && (objError.newPasswordConfirmate = "dato vacio");
        setError(objError);
    }else if(newPassword != newPasswordConfirmate){
        objError = {
            newPassword : "Deben ser iguales",
            newPasswordConfirmate : "Deben ser iguales"
        };
        setError(objError); 
    } else
            setVisibleLoading(true);
            console.log("entro update");
            reautenticate(password)
            .then(() => {
                firebase.auth().currentUser.updatePassword(newPassword)
                .then(() =>{
                    console.log("cambio OK");
                    toastRef.current.show("newPassword actualizado OK");
                    setVisibleLoading(false);
                    setIsVisibleModal(false);
                    //firebase.auth().signOut();
                }).catch(() => {
                    console.log("Error cambio");
                    toastRef.current.show("Error actualizando la contraseña");
                    setVisibleLoading(false);
                    setIsVisibleModal(false);
                })
            })
            .catch(() => {
                console.log("contraseña invalida");
                objError = {
                    password : "Contraseña invalida"
                };
                setError(objError); 
                setVisibleLoading(false);
            });
        
}


    return(
        <View style={styles.formContainer}>
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
            <Input
            placeholder={AppText.INPUT_CONTRASENA}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={newHidePassword}
            label={AppText.INPUT_CONTRASENA_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setNewPassword(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={newHidePassword ? "eye-off-outline":"eye-outline"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {setNewHidePassword(!newHidePassword)}}
                /> }
                errorMessage={error.newPassword}
             />
             <Input
            placeholder={AppText.INPUT_CONTRASENA}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={newHidePasswordConfirmate}
            label={AppText.INPUT_CONTRASENA_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setNewPasswordConfirmate(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={newHidePasswordConfirmate ? "eye-off-outline":"eye-outline"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {setNewHidePasswordConfirmate(!newHidePasswordConfirmate)}}
                /> }
                errorMessage={error.newPasswordConfirmate}
             />

            <Button
            title="Cambiar Contraseña"
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={updatePassword}
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