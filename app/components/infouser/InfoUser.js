import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';



export default function InfoUser(props){

    const {
        userInfo: {uid,displayName,email,photoURL},
        setReloadData,
        toastRef,
        setTextLoading,
        setIsLoading
    } = props; 

const changeAvatar=async () =>{

    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

    if(resultPermissionCamera === "denied"){
        toastRef.current.show("Es necesario otorgar permisos");
    }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if(result.cancelled){
            toastRef.current.show("Galeria Cerrada");
        }else{
            uploadImage(result.uri,uid).then(() => {
                console.log("imagen up ....");  
                updatePhotourl(uid);
                setIsLoading(false);
            })
        }

    }

}

const uploadImage =  async (uri,nameImage) => {
    //setTextLoading("Cargando avatar");
    //setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(uri+"  " + nameImage);
    const ref = firebase
    .storage()
    .ref()
    .child(`Photos/Users/Avatar/${nameImage}`);
    console.log(blob);
    return ref.put(blob);
};

const updatePhotourl = uid => {
    console.log(uid);
    firebase.storage()
    .ref(`Photos/Users/Avatar/${uid}`)
    .getDownloadURL()
    .then(async result => {
      const update ={photoURL:result}
      await firebase.auth().currentUser.updateProfile(update);
      setReloadData(true);
      setIsLoading(false);
      console.log("Se cambio la imagen ...");
      toastRef.current.show("Se actualizo el Avnatar");
    }).catch(() => {
        console.log("Error ...");
        toastRef.current.show("Error al actualizar el Avatar");
    })
}


    return(
        <View style={styles.viewuserInfo}>
            <Avatar
            rounded
            size='large'
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
                uri:photoURL ? photoURL : "https://api.adorable.io/avatars/100/abott@adorable.png"
            }}
            />

            <View>
                <Text
                style={styles.displayName}
                >
                 {displayName ? displayName : "Anonimo"}

                </Text>
                <Text
                style={styles.displayName}
                >
                 {email ? email : "Session Facebook"}
                </Text>
            </View>
               

        </View>
    );
}


const styles = StyleSheet.create({
    viewuserInfo:{
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
        flexDirection:"row",
        backgroundColor:AppStyles.INPUT_LABEL_COLOR,
        paddingTop:AppStyles.MARGIN_TOP,
        paddingBottom: AppStyles.MARGIN_TOP
        
    },
    userInfoAvatar:{
        marginRight:AppStyles.MARGIN_TOP
    },
    displayName:{
        fontWeight:"bold",

    }
})