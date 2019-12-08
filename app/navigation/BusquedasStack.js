import {createStackNavigator} from 'react-navigation-stack';
import BusquedaScreem from '../screems/Busqueda';

const BusquedasScreemStacks = createStackNavigator(
    {
        Destacados: {
            screen: BusquedaScreem,
            navigationOptions:()=>({
                  title:"Busquedas"
            })
        }
    }
)

export default BusquedasScreemStacks;

