import React,{useState} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import ModalEditAccount from '../modals/ModalEditAccount';



export default function ListDataAccount (props){

    const {userInfo,setReloadData,toastRef}=props;

   const [isVisibleModal,setIsVisibleModal ] =  useState(false);
   const [renderComponent,setRenderComponent] = useState(false);


const menuOptions =[
    {
        title:"Cambiar nombre y apellidos",
        iconType:"material-community",
        iconnameLeft: "account-circle",
        iconColorLeft:"#ccc",
        iconNameRight: "chevron-right",
        iconColorRigth:"#ccc",
        onPress:() => selectedComponent("name")
    },
    {
        title:"Cambiar correo",
        iconType:"material-community",
        iconnameLeft: "account-circle",
        iconColorLeft:"#ccc",
        iconNameRight: "chevron-right",
        iconColorRigth:"#ccc",
        onPress:() => selectedComponent("email")
    },
    {
        title:"Cambiar contraseña",
        iconType:"material-community",
        iconnameLeft: "account-circle",
        iconColorLeft:"#ccc",
        iconNameRight: "chevron-right",
        iconColorRigth:"#ccc",
        onPress:() => selectedComponent("password")
    }
];

const selectedComponent= (key) => {
    console.log(key);
    setRenderComponent(key);
    setIsVisibleModal(true);
}



    return(
        <View>
           {
               menuOptions.map((menu,index)=>(
                <ListItem
                   key={index}
                   title={menu.title}
                   leftIcon={{
                       type: menu.iconType,
                       name: menu.iconnameLeft,
                       color: menu.iconColorLeft
                   }}
                   rightIcon={{
                    type: menu.iconType,
                    name: menu.iconNameRight,
                    color: menu.iconColorRigth
                   }}
                   onPress={menu.onPress}
                   containerStyle={styles.MenuItemStyle}
                   />
               ))
           }
           {renderComponent && (
                <ModalEditAccount 
                isVisible={isVisibleModal} 
                setIsVisible={setIsVisibleModal}
                renderComponent={renderComponent}
                userInfo={userInfo}
                setIsVisibleModal={setIsVisibleModal}
                setReloadData={setReloadData}
                toastRef={toastRef}
                />
           )}
                 
           
        </View>
    );
}

const styles = StyleSheet.create({
    MenuItemStyle:{
        borderBottomWidth:1,
        borderBottomColor: "#e3e3e3"
    }
})