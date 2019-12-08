import React from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native';
import { Overlay} from 'react-native-elements';


export default function Loading(props){

    const {isvisible,textshow} = props;

    return(
        <Overlay
        
        isVisible={isvisible}
        windowBackgroundColor="rgba(0,0,0, .5)"
        overlayBackgroundColor="transparent"
        overlayStyle={style.overlay}
        >
            <View style={style.view}>
                  <ActivityIndicator
                  size="large"
                  color="#00a680"
                  />
                     {textshow && (<Text style={style.textshow}>{textshow}</Text>)}
            </View>
        </Overlay>
    );

}

const style= StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor:"#00a680",
        borderWidth:2,
        borderRadius:10
    },
    view:{
        flex:1,
        alignContent:"center",
        justifyContent: "center"
    },
    textshow:{
        color:"#00a680",
        textTransform: "uppercase"
    }
})


