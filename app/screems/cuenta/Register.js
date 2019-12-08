import React,{useRef} from 'react';
import {StyleSheet,View,Image,ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormularioRegister from '../../components/forms/FormularioRegister';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function Register(){


    const toastRef = useRef();

    return(<ScrollView>
       <KeyboardAwareScrollView>
            <Image 
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            >
            </Image>

            <View 
            style={styles.viewForm}>
               <FormularioRegister toastRef={toastRef} />
            </View>
           <Toast position={AppStyles.CENTRADO} opacity={0.7} ref={toastRef}/>

        </KeyboardAwareScrollView>

    </ScrollView>
        
    );


}

const styles = StyleSheet.create({

    logo:{
       width:AppStyles.WIDTH,
       height:150,
       marginTop:AppStyles.MARGIN_TOP
        },
    viewForm:{
            marginLeft:AppStyles.MARGIN_TOP,
            marginRight:AppStyles.MARGIN_TOP
        }
});