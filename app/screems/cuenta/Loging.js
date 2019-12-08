import React,{useRef} from 'react';
import {StyleSheet,View, ScrollView,Text,Image, Button} from 'react-native';
import {Divider} from 'react-native-elements';
import FormLogin from '../../components/forms/FormLogin';
import Toast from 'react-native-easy-toast';
import LoginFb from'../../components/logingfacebook/LoginFb';


export default function Loging (props) {

const {navigation}= props;

const toastRef = useRef();

    return(<ScrollView>
       <Image 
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"/>

        <View style={styles.viewcontainer}>
          <FormLogin
          toastRef={toastRef}
          />     
          <CreateAccount navigation={navigation}/> 
          <ForgetAccount navigation={navigation}/>     
        </View>

        <Divider style={styles.containerDivider}/>
        
        <View style={styles.viewContainer}>
        <LoginFb
        toastRef={toastRef}
        navigation={navigation}
        />
        </View>
        <Toast
        ref={toastRef} position="center" opacity={0.7}
        />
    </ScrollView>
    );
}

function ForgetAccount(props){

    const {navigation} = props;

    return(
        <Text style={styles.Register}>
            <Text 
            style={styles.btnRegister}
            onPress={() => {navigation.navigate("Recuperarpassword")}}
            >
                Recuperar
            </Text>
             { " "} mi contraseña.
        </Text>
    );
};

function CreateAccount(props){

    const {navigation} = props;

    return(
        <Text style={styles.Register}>

            Crea tu cuenta aqui { " "}
            <Text 
            style={styles.btnRegister}
            onPress={() => {navigation.navigate("Register")}}
            >
                Registrate.
            </Text>
        </Text>
    );
};



const styles = StyleSheet.create({
logo:{
    width:"80%",
    height:100,
    marginTop:20
},
viewcontainer:{
    marginRight:40,
    marginLeft:40,
    alignContent:"center",
},
containerDivider: {
 backgroundColor:"#a00680",
 margin:40
},
Register:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    alignItems:'center'
},btnRegister:{
    color:"#00a680",
    fontWeight:"bold"
}
})