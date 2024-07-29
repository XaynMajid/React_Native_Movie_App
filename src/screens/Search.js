import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Touchable,
  Image,
  TouchableOpacity,
  Pressable,
  
} from "react-native";
// import { debounce } from 'lodash';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
// import { Text } from 'react-native-reanimated/lib/typescript/Animated';
import tw from "twrnc";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import Loading from "../component/loading";
import { fetchSearhMovies } from "../../api/moviesdb";
// import {  } from 'react-native-reanimated/lib/typescript/Animated';
const { height, width } = Dimensions.get("window");

const Search = () => {
  // const handleChangeDebounce = useCallback(debounce(handleChange, 400), []);
  const imageUrl="https://image.tmdb.org/t/p/w342"

  // console.log(val);
    // fetchSearhMovies({
    //   query: val,
    //   include_adult: "false",
    //   language: "en-US",
    //   page: "1"
    // }).then(data => {
    //   setLoading(false);
    //   if (data && data.results) {
    //     setData(data.results);
    //     console.log(val);
    //   }
    // }).catch(error => {
    //   setLoading(false);
    //   console.error(error);
    // });
const [loading, setLoading] = useState(false);
 
  const navigate = useNavigation();
  const [data, setData] = useState([]);
  const movieName = "Turbo";

  const handleChange = async(val) => {
  if (val && val.length ) {
    // setLoading(true);
  
   let res= await fetchSearhMovies({
        query: val,
        include_adult: "false",
        language: "en-US",
        page: "1"
      })
      // console.log(res);
      if(res){
        setLoading(false)
        setData(res.data.results)
        // console.log(res.data.results);
        console.log(res.data.results.poster_path);
      }
   
  } else {
    setLoading(false);
    setData([]);
  }
}
 
  // const 
  // handleChange =(text)=>{

  // }
  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("Movies", item);
        }}
      >
        <View style={tw`justify-center items-center`}>
        <Image
            style={{
              ...tw`m-4 rounded-lg`,
              height: height * 0.32,
              width: width * 0.43,
            }}
            source={
              item.poster_path
                ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                : require("../assets/four.jpg")
            }
          />
          <Text>
            {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-gray-800 `}>
        <View style={tw`flex-1`}>
          <View
            style={{
              ...tw`h-15  border-2 border-gray-400 rounded-full mx-auto my-3 overflow-hidden flex-row justify-between`,
              width: width * 0.9,
            }}
          >
            <TextInput
              placeholder="Search"
              style={{ width: width * 0.7, ...tw`text-xl pl-4  ` }}
              onChangeText={handleChange}
              
            />
            <TouchableOpacity
              onPress={() => {
                navigate.goBack();
              }}
            >
              <IconEntypo name="circle-with-cross" size={55} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <Loading search={true} />
          ) : //   <Text>zain</Text>
          data? (
            <View style={tw`mt-10`}>
              <Text style={tw` text-xl text-white ml-4 `}>
               Result({data.length}) 
                
              </Text>
              <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem item={item} />}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <Image
              style={{
                ...tw`m-auto`,
                height: height * 0.7,
                width: width * 0.7,
                opacity: 0.78,
              }}
              source={require("../assets/silvester.png")}
            />
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default Search;

// .length > 0 ?