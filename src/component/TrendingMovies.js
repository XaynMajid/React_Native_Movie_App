
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View ,FlatList,Text,Image, Dimensions, Pressable, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import tw from 'twrnc';
import Carousel from 'react-native-reanimated-carousel';
// import Carousel from 'react-native-snap-carousel';
let {width,height} = Dimensions.get("window")

const LatestMovies = ({title,navigation,data}) => {
    const imageUrl="https://image.tmdb.org/t/p/w500"
    const RenderItem=({item})=>{
        const navigation = useNavigation(); // Move useNavigation here  //
        const handleClick = (item) => {
            navigation.navigate("Movies", item);
            console.log("hi");
        }
        return(
            <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
                <Image source={{ uri:`${imageUrl}`+item.poster_path }} style={{...tw` h-${height*.18/2} w-${width*.25} rounded-lg   justify-center  items-center  `,} } />
            </TouchableWithoutFeedback>
        )
    }

    return(
        <View  style={tw`h-90`} >
            <Text style={tw`text-2xl font-bold mt-4 mx-6 text-white`}>{title}</Text>
            <Carousel
                width={width}
                height={height / 2}
                // autoPlay={true}
                data={data}
                mode='parallax'
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollAnimationDuration={300}
                renderItem={({item})=> <RenderItem item={item} />}
            
            /> 
        </View>  
    )
}

export default LatestMovies;

