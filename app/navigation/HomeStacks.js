import {createStackNavigator} from 'react-navigation-stack';
import HomeScreem from '../screems/home/Home';
import FavoritosScreem from '../screems/Favoritos';
import AddRestaurantesScreem from '../screems/home/AddRestaurante';
import DetalleScreem from '../screems/home/Detalle';
import AddReviewrestauranteScreen from '../screems/home/AddReviewRestaurant';

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
        },
        Detalle: {
            screen: DetalleScreem,
            navigationOptions:props =>({
                  title: props.navigation.state.params.restaurant.item.restautant.name
            })
        },
        AddReview: {
            screen: AddReviewrestauranteScreen,
            navigationOptions:() =>({
                  title: "Add Comentario"
            })
        }
    }
)

export default HomeScreemStacks;


























