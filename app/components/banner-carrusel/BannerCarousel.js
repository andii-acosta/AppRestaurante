import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Image} from 'react-native-elements';
import Carousel from 'react-native-banner-carousel';

export default function BannerCarousel (props) {

    const {imageRestaurant,width,height} = props;

    return(
        <Carousel
        autoplay
        autoplayTimeout={3000}
        loop
        index={0}
        pageSize={width}
        pageIndicatorStyle={styles.indicator}
        activePageIndicatorStyle={styles.indicatorActive}
        >

          {imageRestaurant.map(img => (

             <View key={img}>
                 <Image 
                 style={{width,height}}
                 source={{uri: img}}
                 />
             </View>
          ))
          }

        </Carousel>
    );
}

const styles = StyleSheet.create({

    indicator: {
        backgroundColor: "#00a680",
    },
    indicatorActive:{
        backgroundColor:"#00ffc5"
    }
})