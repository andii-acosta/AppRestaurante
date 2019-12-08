import {createStackNavigator} from 'react-navigation-stack';
import MyAccountScreem from '../screems/cuenta/MyCuenta';
import LogingScreen from '../screems/cuenta/Loging';
import RegisterScremm from '../screems/cuenta/Register';
import RecuperarScremm from '../screems/cuenta/ForgetAccount';


const MyAccountScreemStacks = createStackNavigator(
    {
        MyAccount: {
            screen: MyAccountScreem,
            navigationOptions:()=>({
                  title:"Mi Cuenta"
            })
        },
        login:  {
        screen: LogingScreen,
        navigationOptions: () => ({
            title: "Login"
           })
        },
        Register:  {
        screen: RegisterScremm,
        navigationOptions: () => ({
            title: "Registro"
           })
        },
        Recuperarpassword:  {
            screen: RecuperarScremm,
            navigationOptions: () => ({
                title: "Recuperar"
               })
            }
    }
);

export default MyAccountScreemStacks;

