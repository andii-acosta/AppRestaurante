import React,{useState} from 'react';
import {StyleSheet,View,Text} from 'react-native'; 
import {AirbnbRating,Button,Input} from 'react-native-elements';


export default function AddReviewRestaurant(props){

    const {navigation} = props;

    const {idrestaurant} = navigation.state.params;
    const [rating, setRating] = useState(null);

    const [titulos,setTitulos]= useState("");
    const [coment,setComent]= useState("");

    const addReview = () =>{
     console.log(rating);

     


    }

    return(
        <View style={styles.viewBody}>
            <View style={styles.viewraiting}>
                <AirbnbRating
                count={5}
                reviews={["pesimo","Deficiente","Normal","Muy Bueno","Excelente"]}
                defaultRating={0}
                size={35}
                onFinishRating={value => {setRating(value)}}
                />
            </View>
            <View style={styles.viewformulario}>

               <Input
               placeholder="Titulo"
               containerStyle={styles.containerbooton}
               onChange={e => setTitulos(e.nativeEvent.text)}
               />

            <Input
               placeholder="Comentario"
               containerStyle={styles.containerbootoncoment}
               onChange={e => setComent(e.nativeEvent.text)}
               multiline={true}
               />
                <Button
                title="Enviar review"
                onPress={addReview}
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btnstyles}
                />
            </View>
        </View>
    
    );

}

const styles = StyleSheet.create({
    viewBody :{
        flex:1
    },
    viewraiting:{
       height:110,
       backgroundColor:"#f2f2f2" 
    },
    viewformulario:{
          flex:1,
          alignItems:"center",
          margin:10,
          marginTop:40
    },
    containerbooton:{
         marginBottom:10
    },
    containerbootoncoment:{
        height:150,
        width:"100%",
        padding:0,
        margin:0

    },
    btncontainer:{
        flex:1,
        justifyContent:"flex-end",
        marginTop:10,
        marginBottom:10,
        width:"90%"
    },
    btnstyles:{
        backgroundColor:"#00a680"
    }
})