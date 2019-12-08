import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import * as firebase from 'firebase';




export default function ListItems(props){

 const {items,isLoading,handlerLoadMore} = props;

    return(
         <View>
             {items ? (
                 <FlatList
                 data={items}
                 renderItem={restaurant =>  <Mycard restaurant={restaurant} /> }
                 keyExtractor={(itm,index) =>{index.toString()}}
                 //onEndReached={handlerLoadMore}
                 onEndReachedThreshold={0}
                 //ListFooterComponent={<FooterList isLoading={isLoading}/>}
                 />
             ) : (
                 <View style={styles.loaderRestaurant}>
                     <ActivityIndicator size="large" />
                     <Text>
                         Cargando restaurantes ...
                     </Text>
                 </View>
             )} 
         </View>
    );
}


function Mycard (props){

    const {restaurant} = props;
     
    const {name,location,image,description} = restaurant.item.restautant;

    const [imageRestaurant,setImageRestaurant] = useState(null);

    useEffect(() => {
        
        const images= image[0];
        firebase.storage().ref(`Photos/Galeria/Detalle/${images}`).getDownloadURL()
        .then(result => {
            console.log(result);
            setImageRestaurant(result);
        })
    }, [])

    console.log(restaurant);

    return(
        <TouchableOpacity
        onPress={() => {console.log("seleccion rest")}}
        >
            <View style={styles.viewCard}>
                 
                 <View style={styles.viewCardImage}>
                     <Image
                     resizeMode="cover"
                     source={{uri:imageRestaurant}}
                     style={styles.cardImage}
                     PlaceholderContent={<ActivityIndicator color ="#fff"/>}
                     ></Image>
                 </View>
                 <View>
                         <Text style={styles.titleCard}>
                                  {name}
                         </Text>
                         <Text style={styles.locationCard}>
                                  {location}
                         </Text>
                         <Text style={styles.descriptionCard}>
                                  {description.substr(0,60)}...
                         </Text>
                 </View>
                  
            </View>
        </TouchableOpacity>
    );
}


function FooterList(props){

    const {isLoading} = props;

    return(
        <View>
            <Text>
                    No hay mas restaurantes
                 </Text>
        </View>
    );
    /*if(isLoading){
        return(
            <View style={styles.loadingItems}>
                    <ActivityIndicator size="large"/>
            </View>
            );
    } else {
        return(
            <View style={styles.notFound}>
                 <Text>
                    No hay mas restaurantes
                 </Text>
            </View>
            );
    }*/
}


const styles = StyleSheet.create({
    
    loadingItems:{
        marginTop:20,
        alignItems:"center"
    },
    viewCard:{
        flexDirection:"row",
        margin:10
    },
    viewCardImage:{
        marginRight:10
    },
    cardImage:{
        width:80,
        height:80
    },
    titleCard:{
        fontWeight:"bold"
    },
    locationCard:{
        paddingTop:2,
        color:"grey"
    },
    descriptionCard:{
        paddingTop:2,
        color:"grey",
        width:300
    },
    notFound:{
        marginTop:10,
        marginBottom:20,
        alignItems:"center"
    },
    loaderRestaurant:{
        marginTop:10,
        marginBottom:10
    }

})