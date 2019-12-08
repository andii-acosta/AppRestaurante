import React, {useState,useEffect} from 'react';
import {StyleSheet,View,ScrollView,Alert,Dimensions} from 'react-native';
import {Input,Icon,Button,Avatar,Image} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as  Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import ModalMap from '../../components/modals/ModalMap';
import Loading from '../loading/Loading';

import uuid from 'uuid/v4';
import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const WidthScreen = Dimensions.get("window").width;

export default function FormAddRestaurante(props){

    const { navigation,toastRef,setIsLoading} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [ubicacion, setUbucacion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isVisibleMap,setIsVisibleMap] = useState(false);
    const [locationrestaurante,setLocationrestaurante] = useState(null);
    const [isVisibleLoading,setIsVisibleLoading] = useState(false);


    const addRestaurante = () =>{

        if(!titulo || !fecha || !ubicacion || !telefono || !descripcion){
            toastRef.current.show("Todos los campos deben esta completos",2000);
        }else if (imagesSelected.length === 0){
            toastRef.current.show("Debes cargar minimo 1 foto y maximo 4",2000);
        }else if(!locationrestaurante){
            toastRef.current.show("Debes ingresar la ubicacion en el mapa",2000);
        }else{
            setIsVisibleLoading(true);
            uploadImagegaleri(imagesSelected).then(arrayImage => {
                console.log(arrayImage);

                db.collection("App/Info/Detalle").add({
                    name: titulo,
                    date: fecha,
                    location: ubicacion,
                    cell: telefono,
                    price:precio,
                    description: descripcion,
                    image: arrayImage,
                    rating:0,
                    ratingTotal:0,
                    quantityVote:0,
                    creteAt: new Date(),
                    createBy:firebaseApp.auth().currentUser.uid
                }).then(() =>{
                    setIsVisibleLoading(false);
                    navigation.navigate("Home");
                   }
                ).catch((error) =>{
                    setIsVisibleLoading(false);
                    toastRef.current.show("Error creando el nuevo item");
                    console.log(error);
                });
                
                setIsVisibleLoading(false);
            });
        } 
    }

    const uploadImagegaleri = async (imageArray) =>{
            const imageBlob =[];

            await Promise.all(
                imageArray.map(async image => {
                    const response = await fetch(image);
                    const blob = await response.blob();
                    const ref = firebase
                    .storage()
                    .ref("Photos/Galeria/Detalle")
                    .child(uuid());
                    await ref.put(blob).then(result => {
                        imageBlob.push(result.metadata.name);
                    });
                    
                })
               
            );
            return imageBlob;
    };

    return(
        <ScrollView  style={StyleSheet.formContainer} >
            <ImagePrincipal
            imageRestaurante={imagesSelected[0]}/>
            <UploadImage
            imagesSelected={imagesSelected}
            setImagesSelected={setImagesSelected}
            toastRef={toastRef}
            />
            <FormRestaurantes
            setTitulo={setTitulo}
            setFecha={setFecha}
            setUbucacion={setUbucacion}
            setTelefono={setTelefono}
            setDescripcion={setDescripcion}
            setIsVisibleMap={setIsVisibleMap}
            locationrestaurante={locationrestaurante}
            setPrecio={setPrecio}
            />
            <Map
            isVisibleMap={isVisibleMap}
            setIsVisibleMap={setIsVisibleMap}
            setLocationrestaurante={setLocationrestaurante}
            toastRef={toastRef}
            />
             <Button
            title="Crear"
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={addRestaurante}
            type={AppText.BOTON_TYPE}
            />
            <Loading
            isvisible={isVisibleLoading}
            textshow={AppText.TEXT_SHOW_PROCESS}
            />
        </ScrollView>
    );

}

function FormRestaurantes(props){

   const {setTitulo,setFecha,setUbucacion,setTelefono,setDescripcion,setIsVisibleMap,locationrestaurante,setPrecio} = props;

    return(
        <View style={styles.viewFrom}>

           <Input
            placeholder="Titulo"
            containerStyle={styles.inputForm}
            label="Ingrese el titulo"
            labelStyle={styles.labelStyles}
            onChange={e => setTitulo(e.nativeEvent.text)}
             />
             <Input
            placeholder="Fecha"
            containerStyle={styles.inputForm}
            label="Ingrese la fecha"
            labelStyle={styles.labelStyles}
            onChange={e => setFecha(e.nativeEvent.text)}
             />
             <Input
             placeholder="Direccion"
             label="Ingrese la direccion"
             labelStyle={styles.labelStyles}
             containerStyle={styles.containerIconMap}
             rightIcon={{
                type: "material-community",
                name:"google-maps",
                color: locationrestaurante ? AppStyles.SECONDARY_COLOR : AppStyles.INPUT_LABEL_COLOR,
                onPress:() => setIsVisibleMap(true)
             }}
             onChange={e => setUbucacion(e.nativeEvent.text)}
             />
             <Input
            placeholder="Telefono"
            containerStyle={styles.inputForm}
            label="Ingrese el telfono"
            labelStyle={styles.labelStyles}
            onChange={e => setTelefono(e.nativeEvent.text)}
             />
             <Input
            placeholder="Precio"
            containerStyle={styles.inputForm}
            label="Ingrese el Precio"
            labelStyle={styles.labelStyles}
            onChange={e => setPrecio(e.nativeEvent.text)}
             />
             <Input
            placeholder="Descripcion"
            containerStyle={styles.inputForm}
            label="Ingrese el Descripcion"
            labelStyle={styles.labelStyles}
            onChange={e => setDescripcion(e.nativeEvent.text)}
             />
             
        </View>
    );
}

function ImagePrincipal(props){
    const {imageRestaurante} = props;
    return(
        <View style={styles.viewprincipalStyle}>
            {imageRestaurante ? 
            <Image
            source={{uri: imageRestaurante}}
            style={styles.imageprincipalStyle}
            />
            :
            <Image
            source={require("../../../assets/no-image.png")}
            style={styles.imageprincipalStyle}
            />
            }
        </View>
    );
}


function UploadImage(props){

     const {imagesSelected,setImagesSelected,toastRef} = props;

     const seleccionarimagen = async() => {
         const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
         const resultpermissionCamera = resultPermission.permissions.cameraRoll.status;

         console.log(resultpermissionCamera);

         if(resultpermissionCamera === "granted"){
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect:[4, 3]
            });
            if(result.cancelled){
                toastRef.current.show("no se selecciono ninguna imagen de la galeria",2000);    
            }else{
                console.log(result.uri);
                setImagesSelected([...imagesSelected, result.uri]);
            }
         }else{
            toastRef.current.show("Es necesario aceptar permisos para usar la camara y galeria",2000);
         }
         console.log(imagesSelected);
     }


const removeImage = (image) => {

    const arrayImage = imagesSelected;

    Alert.alert("Eliminar imagen","Estase seguro de eliminar la imagen",
    [{
        text:"Cancelar",
        style:"cancel"
     },
     {
        text:"Eliminar",
        onPress: () => setImagesSelected(arrayImage.filter(imageUrl => imageUrl !== image))
     }
],{cancelable: false});

}

     return (
         <View style={styles.viewImage}>
             {imagesSelected.length < 5 && 
             <Icon
             type="material-community"
             name="camera"
             color={AppStyles.INPUT_LABEL_COLOR}
             containerStyle={styles.containerIcon}
             onPress={seleccionarimagen}
             />}
               
               {imagesSelected.map(imagen => {
                      
                      <Avatar
                           style={styles.avatarStyles}
                           key={imagen}
                           onPress={() =>{ removeImage(image)}}
                           source={{
                                       uri:imagen
                                   }}
                       />
               })}
         </View>
     );

}

function Map(props){
    const {isVisibleMap,setIsVisibleMap,setLocationrestaurante,toastRef} = props;

    const [location,setLocation] = useState(null);

    console.log("estado isVisibleMap: "+isVisibleMap);

    return(
        <ModalMap
        location={location}
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
        setLocation={setLocation}
        setLocationrestaurante={setLocationrestaurante}
        >
        </ModalMap>
    );
}

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
    },
    viewImage:{
        flexDirection:"row",
        margin:AppStyles.MARGIN_TOP
    },
    containerIcon:{
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
        marginRight: 10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    avatarStyles:{
        width:70,
        height:70,
        marginRight: 10
    },
    ContainerbtnLogin:{
        marginTop:AppStyles.MARGIN_TOP,
        width:AppStyles.WIDTH
    },
    btnLogin:{
        backgroundColor:AppStyles.SECONDARY_COLOR,
        marginLeft: AppStyles.MARGIN_TOP,
        marginRight: AppStyles.MARGIN_TOP,
        marginBottom: AppStyles.MARGIN_TOP
    },
    imageprincipalStyle:{
        width:WidthScreen,
        height:200
    },
    viewFrom:{
        marginLeft: AppStyles.MARGIN_TOP,
        marginRight: AppStyles.MARGIN_TOP
    },
    containerIconMap:{
        padding: 5
    },
    mapStyles: {
        padding: 5
    }


})