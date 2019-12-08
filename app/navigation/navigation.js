import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Icon} from 'react-native-elements';
import  HomeScreemStacks from './HomeStacks';
import  DestacadosScreenStack from './DestacadosStacks';
import  BusquedasScreenStacks from './BusquedasStack';
import  MiCuentaScreenStacks from './MyAccountStack';

const NavigationStacks = createBottomTabNavigator(
   {
    Home: {
        screen: HomeScreemStacks,
        navigationOptions: () => ({
            tabBarLabel: "Home",
            tabBarIcon: ({tintColor}) =>(
              <Icon
              type="materias-community"
              name="home"
              size={22}
              color={tintColor}/>
            )
        })
    },
    Destacados:{
        screen: DestacadosScreenStack,
        navigationOptions: () => ({
            tabBarLabel: "Destacados",
            tabBarIcon: ({tintColor}) =>(
              <Icon
              type="materias-community"
              name="person"
              size={22}
              color={tintColor}/>
            )
        })
    },
    Busquedas:{
      screen: BusquedasScreenStacks,
      navigationOptions: () => ({
          tabBarLabel: "Busquedas",
          tabBarIcon: ({tintColor}) =>(
            <Icon
            type="materias-community"
            name="person"
            size={22}
            color={tintColor}/>
          )
      })
     },
     MiCuenta:{
       screen: MiCuentaScreenStacks,
       navigationOptions: () => ({
           tabBarLabel: "Mi Cuenta",
           tabBarIcon: ({tintColor}) =>(
             <Icon
             type="materias-community"
             name="home"
             size={22}
             color={tintColor}/>
           )
       })
      }
   },

   
   {
     initialRouteName: "Home",
     order: ["MiCuenta","Busquedas","Home","Destacados"],
     tabBarOptions:{
       inactiveTintColor: "#646464",
       activeTintColor: "#00a680"
     }
   }
   
);

export default createAppContainer(NavigationStacks);














