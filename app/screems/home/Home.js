import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);
import ListItems from '../../components/listitems/ListItems';

export default function Home(props){

    const [user,setUser] = useState(null);
    const {navigation} = props;

    const [items,setItems] = useState({});
    const [startItems,setStartItems] = useState(null);
    const [isLoading,setIsloading] = useState(false);
    const [totalItems,setTotalItems] = useState(false);
    const [isreload,setIsreload] = useState(false);
    const limiteItems = 6;

    console.log("restaurantes: "  + items );

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, [])

    useEffect(() => {
        db.collection("App/Info/Detalle")
        .get()
        .then(snap => {
            setTotalItems(snap.size);
            //console.log(snap.size);
        });

        (async () => {
             let resultItems = [];

             const restaurants = db.collection("App/Info/Detalle")
             .orderBy("creteAt","desc")
             .limit(limiteItems);
        
        await restaurants.get().then(response => {
            setStartItems(response.docs[response.docs.length -1]);
   
            response.forEach(doc => {
                let restautant = doc.data();
                restautant.id = doc.id;
                resultItems.push({restautant});

            });
            setItems(resultItems);
            
        });
        })();
        setIsreload(false);
    }, [isreload])

    const handlerLoadMore = async () => {

        const resultRestaurantes = [];
         
        items.length < totalItems && setIsloading(true);

        const restaurantDb = db.collection()
        .orderBy("creteAt","desc")
        .startAfter(startItems)
        .limit(limiteItems);
        
        await restaurantDb.get()
        .then(response => {
            if(response.length > 0){
                 setStartItems(Response.docs[response.docs.length - 1]);

            } else {
                setIsloading(false);
            }

            response.forEach(doc => {
                let restaurant= doc.data();
                restaurant.id = dioc.id;
                resultRestaurantes.push({restaurant});
            });

            setItems([...items,...resultRestaurantes]);
        })
    
    }

    

    return(
        <View style={styles.viewBody}>
            <ListItems
            items={items}
            isLoading={isLoading}
            handlerLoadMore={handlerLoadMore}
            navigation={navigation}
            />
            {user && (
            <AddRestaurantesbutton
            navigation={navigation}
            setIsreload={setIsreload}
            />)}
            
        </View>
    );
}

function AddRestaurantesbutton(props){
    const {navigation,setIsreload} = props;
    return(
        <ActionButton
        buttonColor={AppStyles.SECONDARY_COLOR}
        onPress={() => 
            navigation.navigate("AddRestaurante",{setIsreload})
        }
        />
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    }
})