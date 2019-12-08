import {createStackNavigator} from 'react-navigation-stack';
import DestacadosScreem from '../screems/Destacados';

const DestacadosScreemStacks = createStackNavigator(
    {
        Destacados: {
            screen: DestacadosScreem,
            navigationOptions:()=>({
                  title:"Destacados"
            })
        }
    }
)

export default DestacadosScreemStacks;
