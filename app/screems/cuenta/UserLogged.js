import React,{useState,useEffect,useRef}  from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/infouser/InfoUser';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/loading/Loading';
import ListDataAccount from '../../components/listoptions/ListDataAccount';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function UserLogged(){


    const [userInfo,setUserInfo] = useState({});
    const [reloadData,setReloadData] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [textLoading,setTextLoading] = useState("");
    const toastRef = useRef();

    useEffect(() => {
        (async() => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false)
    }, [reloadData])

    return(
        <View style={styles.viewUserinfo}>
            <InfoUser 
            userInfo ={userInfo}
            setReloadData={setReloadData}
            toastRef={toastRef}/>
            <ListDataAccount
            userInfo={userInfo}
            setReloadData={setReloadData}
            toastRef={toastRef}
            />
            <Button
            title={AppText.BOTON_EXIST}
            containerStyle={styles.ContainerbtnLogin}
            buttonStyle={styles.btnLogin}
            onPress={()=>{firebase.auth().signOut()}}
            buttonStyle={styles.titleSession}
            type={AppText.BOTON_TYPE}
            />
            <Toast
            ref={toastRef}
            position ="center"
            opacity = {0.7}
            setIsLoading={setIsLoading}
            setTextLoading={setTextLoading}
            />
            <Loading
            isvisible={isLoading}
            textshow={textLoading}
            />
        </View>
    )
} 


const styles = StyleSheet.create({
    
    viewUserinfo:{
        minHeight:"100%",
        backgroundColor:AppStyles.INPUT_LABEL_COLOR
    },
    ContainerbtnLogin:{
        marginTop:AppStyles.MARGIN_TOP,
        width:AppStyles.WIDTH
    },
    btnLogin:{
        backgroundColor:AppStyles.COLOR_BLANCO
    },
    titleSession:{
        backgroundColor:AppStyles.SECONDARY_COLOR
    }

})
