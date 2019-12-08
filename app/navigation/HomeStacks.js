import {createStackNavigator} from 'react-navigation-stack';
import HomeScreem from '../screems/home/Home';
import FavoritosScreem from '../screems/Favoritos';
import AddRestaurantesScreem from '../screems/home/AddRestaurante';


const HomeScreemStacks = createStackNavigator(
    {
        Home: {
            screen: HomeScreem,
            navigationOptions:()=>({
                  title:"Home"
            })
        },
        AddRestaurante: {
            screen: AddRestaurantesScreem,
            navigationOptions:()=>({
                  title:"Agregar Restaurante"
            })
        }
    }
)

export default HomeScreemStacks;


























