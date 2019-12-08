import React, { useEffect } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as  Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';



export default function ModalMap (props){
   
   const {isVisibleMap,setIsVisibleMap,location,toastRef,setLocation,setLocationrestaurante} =props;


   useEffect(() => {
    (async() =>{
       let result = await Permissions.askAsync(Permissions.LOCATION);
       console.log(result);
       let resultlocation = result.permissions.location.status;
       if(resultlocation === "granted"){
        toastRef.current.show("Se aceptaron los permisos");
        const loc  = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
        });
       }else{
        toastRef.current.show("acepta los permisos para la location");
        setIsVisibleMap(false);
       }
    }) ();

}, [])

const confirLocation = () =>{
    setLocationrestaurante(location);

    toastRef.current.show("Ubicacion seleccionada");
    setIsVisibleMap(false);
}


   const claseModal = () => setIsVisibleMap(false);

    return(
        <Overlay
        isVisible={isVisibleMap}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.OverlayStyle}
        onBackdropPress={claseModal}
        >
        <View>
                {location &&(
                    <MapView 
                    style={styles.mapStyles}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={region => setLocation(region)}
                    >
                        <Marker
                        coordinate = {{
                            latitude:location.latitude,
                            longitude: location.longitude
                        }}
                        title={"title"}
                        description={"description"}
                        draggable
                        />

                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                    title="Confirmar"
                    onPress={confirLocation}
                    containerStyle={styles.btnContainerStylesMap}
                    buttonStyle={styles.btnStylesSave}
                    />
                    <Button
                    title="Cancelar"
                    onPress={() => setIsVisibleMap(false)}
                    containerStyle={styles.btnContainerStylesMap}
                    buttonStyle={styles.btnStylesCancele}
                    />
                </View>
            </View>

        </Overlay>
    );
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:400,
        width:"90%",
        backgroundColor:"#fff"        
    },
    viewMapBtn: {
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 10
    },
    btnContainerStylesMap:{
        padding:10,
        margin: 10,
    },
    btnStylesSave:{
        backgroundColor:AppStyles.SECONDARY_COLOR
    },
    btnStylesCancele:{
        backgroundColor:AppStyles.INPUT_COLOR_ERROR
    },
    mapStyles:{
        padding:20,
        width:"100%",
        height:300
    }

})