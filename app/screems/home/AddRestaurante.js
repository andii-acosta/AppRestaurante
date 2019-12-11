import React,{useRef,useState} from 'react';
import {View,Text} from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/loading/Loading';
import FormAddRestaurante from '../../components/forms/FormAddRestautante';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function AddRestaurantes (props){

    const {navigation} = props;
    const {setIsreload} = navigation.state.params;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();


    console.log(navigation);

    return(
        <View>
            <FormAddRestaurante
            navigation={navigation}
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            setIsreload={setIsreload}
            />

            <Toast
            ref={toastRef}
            position ="center"
            opacity={0.7}
            />

           <Loading
             isvisible={isLoading}
             textshow={AppText.TEXT_SHOW_PROCESS}
            />
        </View>
    );
}

