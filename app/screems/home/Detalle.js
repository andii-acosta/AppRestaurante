import React,{useState,useEffect} from 'react';
import {StyleSheet,ScrollView,View, Text,Dimensions} from 'react-native';
import * as firebase from 'firebase';
import BannerCarousel from '../../components/banner-carrusel/BannerCarousel';
import {Rating} from 'react-native-elements';
import ListReview from '../../components/listreviews/ListReview';

const anchodisplay = Dimensions.get("window").width;

export default function Detalle(props){

    const {navigation}= props;
    const {restaurant} = navigation.state.params.restaurant.item;
    const {info} = navigation.state.params;
     const [imageRestaurant,setImageRestaurant]= useState([]);

     const img = navigation.state.params.restaurant.item.restautant.image;
     const name = navigation.state.params.restaurant.item.restautant.name;
     const rating = navigation.state.params.restaurant.item.restautant.rating;
     const description = navigation.state.params.restaurant.item.restautant.description;
     const id = navigation.state.params.restaurant.item.restautant.id;
    //console.log(props);
    console.log("id : "+ id);


    console.log("_____________________________");
    console.log(JSON.stringify(imageRestaurant));
    console.log("*****************************");
    console.log(JSON.stringify(img));
   useEffect(() => {
       const arryUrl= [];

       (async () =>{
           await Promise.all(
            img.map(async idImage => {
                   await firebase
                   .storage()
                   .ref(`Photos/Galeria/Detalle/${idImage}`)
                   .getDownloadURL()
                   .then(imageUrl => {
                    arryUrl.push(imageUrl);
                       console.log(imageUrl);
                   });
               })
           )
           setImageRestaurant(arryUrl);
       })();

   }, []);


    return(
        <ScrollView style={styles.viewBody}>
            <BannerCarousel
            imageRestaurant={imageRestaurant}
            width={anchodisplay}
            height={200}
            />
            <TitleRestaurante
            name={name}
            description={description}
            rating={rating}
            />
            <ListReview
            navigation={navigation}
            id={id}
            />
        </ScrollView>
    );
}

function TitleRestaurante(props){
    const {name,description,rating} = props;

    return(
      <View style={styles.viewrestaurantTitle}>
            <View style={{flexDirection:'row'}}>
               <Text style={styles.nameRestaurant}>{name}</Text>
               <Rating
               style={styles.stylesRaiting}
               imageSize={20}
               readonly
               startingValue={parseFloat(rating)}
               />
            </View>
            <Text style={styles.descriptionStyles}>{description}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewrestaurantTitle:{
       margin:15 
    },
    nameRestaurant:{
      fontSize:20,
      fontWeight:'bold'
    },
    stylesRaiting:{
        position:'absolute',
        right:0
    },
    descriptionStyles:{
        marginTop:5,
        color: "grey"
    }
})