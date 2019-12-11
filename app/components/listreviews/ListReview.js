import React,{useState,UseEffect} from 'react';
import {StyleSheet,View,Text,FlatList} from 'react-native'; 
import {Button,Avatar,Rating} from 'react-native-elements';

export default function ListReview(props){

    const {navigation,idRestaurante,id}=props;


    return(
        <View>
              <Button
              buttonStyle={styles.butttonreview}
              titleStyle={styles.titlereview}
              title="Escribir una opinion"
              onPress={() => navigation.navigate("AddReview",{
                  idrestaurant:id
                })}
              icon={{
                  type:"material-community",
                  name:"square-edit-outline",
                  color:"#00a680"
              }}
              />
              

        </View>
    );

}

const styles = StyleSheet.create({
    
    butttonreview:{
        backgroundColor:"#fff"

    },
    titlereview:{
        color:"#00a680"
    }

})