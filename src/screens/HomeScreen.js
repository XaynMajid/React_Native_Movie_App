import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View ,Image, TextInput, TouchableOpacity, Button, Pressable} from 'react-native';
import tw from 'twrnc';
import LatestMovies from '../component/TrendingMovies';
import Icon from 'react-native-vector-icons/Feather'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import MovieList from '../component/MovieList';
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Loading from '../component/loading';
import { fetchTrendingMovies,fetchUpComingMovies,fetchTopRatedMovies } from '../../api/moviesdb';
import Cast from '../component/Cast';

const HomeScreen = ({navigation}) => {
   // 3000 milliseconds = 3 seconds
      
     const [loading,setLoading]=useState(true)
     const [trending,setTrending]=useState([])  //dummy data were causing an issue of .length variable   
     const [upComing,setUpcoming]=useState([])
     const [topRated,settopRated]=useState([])


     navigation=useNavigation()
     const handleClick=()=>{
          navigation.navigate("Search")
     }
//    useEffect(() => {
//         getTrendingMovies() 
//         getUpComingMovies()
//         getTopRatedMovies()
//     }, [trending,topRated,upComing]);   // when the trending values changes then it updates your page with the value
    
    
 
     const getTrendingMovies = async () => {
          try {
              const res = await fetchTrendingMovies();
          //     console.log("This is the trending movies data", res.data.results);
              if (res && res.data.results){
               setTrending(res.data.results);
              }
          
          } catch (error) {
              console.log("Error fetching trending movies:", error);
          }
          setLoading(false)
          // console.log(trending);
      };
      const getUpComingMovies = async () => {
          try {
              const res = await fetchUpComingMovies();
          //     console.log("This is the trending movies data", res.data.results);
              if (res && res.data.results){
               setUpcoming(res.data.results);
              }
          } catch (error) {
              console.log("Error fetching trending movies:", error);
          }
          setLoading(false)
          // console.log(trending);
      };
      const getTopRatedMovies = async () => {
          try {
              const res = await fetchTopRatedMovies();
          //     console.log("This is the trending movies data", res.data.results);
              if (res && res.data.results){
               settopRated(res.data.results);
              }
          } catch (error) {
              console.log("Error fetching trending movies:", error);
          }
          setLoading(false)
          // console.log(trending);
      };

  return (
      
<GestureHandlerRootView>
<ScrollView showsVerticalScrollIndicator={false}>      
<View style={tw`bg-gray-800 flex-1`}>
     
<View style={tw`flex-row justify-between h-10 mx-4 mt-2 `}>
     <Icon name="menu"  size={30}/>
     <Text style={tw`text-yellow-500 text-3xl`}>M
      <Text style={tw`text-white`}>ovies</Text>
     </Text>
<TouchableOpacity onPress={()=>handleClick()
}>
     <FontAwsome name='search'  size={30}/>
     </TouchableOpacity>
    </View>

<Pressable style={tw`bg-gray-800 h-10`} onPress={()=>{getTrendingMovies() 
     getUpComingMovies()
     getTopRatedMovies()
     }} ><Text style={tw`text-center font-bold`}>Show Movies</Text></Pressable>

{
     loading?(
          <Loading search={false}/>
     ):(
     <View>
          <LatestMovies title="Trending" navigation={navigation}  data={trending} />
          <MovieList data={upComing} title="Upcoming " hideSeeAll={false} />
          <MovieList data={topRated} title="Top Rated" hideSeeAll={false} />
      </View>
          
     )
     
}



  </View> 
  </ScrollView>                   
  </GestureHandlerRootView>

)}
  

const styles = StyleSheet.create({})

export default HomeScreen;







//your full app may not scroll. for this you have to put both of these tags