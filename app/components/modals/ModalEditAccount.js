import React from 'react';
import {StyleSheet,Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import ChangeNames from '../forms/ChangeNames';
import ChangeEmail from '../forms/ChangeEmail';
import ChangePassword from '../forms/ChangePassword';


export default function ModalEditAccount (props){
   
   const {isVisible,setIsVisible,renderComponent,userInfo,setIsVisibleModal,toastRef,setReloadData} =props;


   const claseModal = () => setIsVisible(false);

    return(
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.OverlayStyle}
        onBackdropPress={claseModal}
        >

        { renderComponent == "name"
            ? <ChangeNames 
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData} 
            toastRef={toastRef}
            />
               : ( renderComponent == "email"
            ? <ChangeEmail 
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData} 
            toastRef={toastRef}
            />
                : ( renderComponent == "password"
            ? <ChangePassword 
            setIsVisibleModal={setIsVisibleModal} 
            toastRef={toastRef}
            />
                : <Text>No hay formulario</Text>
                  )
                  )
        }

        </Overlay>
    );
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:400,
        width:"90%",
        backgroundColor:"#fff"        
    }
})