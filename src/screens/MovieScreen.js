import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity, ScrollView, gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../component/loading';
import Cast from '../component/Cast';
import UpcomingMovies from '../component/MovieList';
import { fetchCreditsDetails, fetchMovieDetails, fetchSimilarMovies } from '../../api/moviesdb';

const { height, width } = Dimensions.get("window");

const MovieScreen = () => {
    
    const navigation = useNavigation();
    const {params:item}=useRoute() 
    const [loading, setLoading] = useState(false);
    const [cast, setCast] = useState();
    const [similar, setSimilar] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const MoviewName = "Zootopia";
const [movie,setMovie]=useState({})
    useEffect(() => {
// console.log("item_id",item.id);
getMovieDetails(item.id)
getMovieCredits(item.id)
getSimilarMovies(item.id)
    }, [item]);
    const imageUrl="https://image.tmdb.org/t/p/w500"
 
    
//     const  getMovieDetails=async(id)=>{
// let res = await fetchMovieDetails(id)
// console.log(res);
// setLoading(false)
//     }

const getMovieDetails = async (id) => {
    setLoading(true);
    let res = await fetchMovieDetails(id);
    setMovie(res.data);
    // console.log(res.data); // Log the fetched movie data
    setLoading(false);
}

useEffect(() => {
    if (movie !== "") {
        // Log the updated value of movie
        // console.log(cast.profile_path);
    }
}, [cast]);

const getMovieCredits =async(id)=>{
const res= await fetchCreditsDetails(id)
  setCast(res.data.cast)
 
}

const getSimilarMovies =async(id)=>{
const res =await fetchSimilarMovies(id)
// console.log(res.data.results);
setSimilar(res.data.results)
}
    return (
        <GestureHandlerRootView>
        <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={tw`bg-gray-800 flex-1`}>
            <SafeAreaView style={tw`flex-row absolute z-20 w-full items-center justify-between px-6 py-6`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-yellow-600 rounded-2xl`}>
                    <IconEntypo name='chevron-small-left' size={45} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <IconAntDesign name='heart' size={45} onPress={() => setIsLiked(!isLiked)} style={isLiked ? tw`text-red-700` : tw`text-white`} />
                </TouchableOpacity>
            </SafeAreaView>
           
                    <View>
                        <Image style={{ height: height * 0.55, width }} source={{ uri:`${imageUrl}`+movie.poster_path }}  />
                        <LinearGradient
                            colors={["transparent", "rgba(31, 41, 55, 0.8)", "rgba(31, 41, 55,1)"]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ ...tw`absolute bottom-0`, width, height: height * 0.44 }}
                        />
                    </View>
                    <View style={{ marginTop: -(height * 0.9), ...tw`mt--10` }}>
                        <Text style={tw`text-center text-5xl`}>
                         {movie.title}
                        </Text>
              {/* Release time date etc */}

                        <Text style={tw`text-center text-lg text-gray-400`}>{movie?.status} . {movie?.release_date?.split("-")[0]} . {movie?.runtime} mins</Text>
                      {/* generes */}
                      <View style={{ flexDirection: "row", justifyContent: "center",...tw`mx-5` }} >
<ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: "row",}}>
                      {
                        movie?.genres?.map((item,index)=>{
                        let res = index+1 == movie.genres.length
                        return(
                                                                                               
                        <Text key={index} style={tw`  text-lg text-gray-400 `}>{item?.name} {res?null: "." } </Text>
                    )
                        
                      })
                      }

</ScrollView>
                        </View>
                        <View style={tw`mx-4 my-2 `}>
                            <Text style={tw`text-center text-base text-gray-400`}>{movie?.overview}</Text>
                        </View>
                    </View>
                    <Cast Cast={cast} navigation={navigation}  />
        <UpcomingMovies hideSeeAll={true} title="Similar Movies"  data={similar}  />
        
          
        </View>
        </ScrollView>

        </GestureHandlerRootView>
    )
}

export default MovieScreen;
