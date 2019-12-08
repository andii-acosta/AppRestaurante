import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as firebase from 'firebase';


export default function ChangeNames(props){

    const {displayName,setIsVisibleModal,toastRef,setReloadData}=props;
    const [visibleLoadin,setVisibleLoading] = useState(false);
    const [newDisplyName,setNewDisplayName] = useState(null);
    const [error,setError] = useState(null);

const updateDisplayName = () =>{
    setError(null);
    if(newDisplyName != null && displayName != newDisplyName){
        setVisibleLoading(true);
            const update = {
                displayName:newDisplyName
            }
            firebase.auth().currentUser.updateProfile(update)
            .then(() =>{
                setReloadData(true);
                toastRef.current.show("Nombre actualizado OK");
                setVisibleLoading(false);
                setIsVisibleModal(false);
            }).catch(() => {
                setError("Error actualizar nombre");
                setVisibleLoading(false);
            })
    }else{
        setError("El nombre esta vacio o es el mismo");
    }
}


    return(
        <View style={styles.formContainer}>
            <Input
            placeholder={AppText.INPUT_USUARIO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_USUARIO_LABEL}
            labelStyle={styles.labelStyles}
            defaultValue={displayName && displayName}
            onChange={e => setNewDisplayName(e.nativeEvent.text)}
            leftIcon={
                <Icon 
                type="material-community"
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
                errorMessage={error}
             />

            <Button
            title="Cambiar nombre"
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={updateDisplayName}
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