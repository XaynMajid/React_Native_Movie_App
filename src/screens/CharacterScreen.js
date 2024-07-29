import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import UpcomingMovies from "../component/MovieList";
import {
  fallBackPersonImage,
  fetchPersonDetails,
  fetchPersonSimilarMovies,
} from "../../api/moviesdb";
const { height, width } = Dimensions.get("window");
// import {  } from 'react-native-reanimated/lib/typescript/Animated';

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";
const Character = () => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [person, setPerson] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();

  useEffect(() => {
    setLoading(true);
    // console.log(item);
    getPersonDetail(item.id);
    getSimilarMovies(item.id);
    setPerson(item.id);
  }, [item]);

  useEffect(() => {
    // console.log(item);
    // console.log(similarMovies);
  }, [similarMovies]);

  const imageuri = "https://image.tmdb.org/t/p/w342";

  const getPersonDetail = async (id) => {
    const res = await fetchPersonDetails(id);
    if (res) setPerson(res.data);
    // setPersonId(res.data.id)
    setLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const res = await fetchPersonSimilarMovies(id);
    if (res && res.data) setSimilarMovies(res.data.cast);
  };

  return (
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`bg-gray-800 flex-1`}>
          <SafeAreaView
            style={tw`flex-row  z-20 w-full items-center justify-between px-6  ${verticalMargin}`}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`bg-yellow-600 rounded-2xl`}
            >
              <IconEntypo name="chevron-small-left" size={45} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconAntDesign
                name="heart"
                size={45}
                onPress={() => setIsLiked(!isLiked)}
                style={isLiked ? tw`text-red-700` : tw`text-white`}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={tw`mt-10`}>
            <View style={{ ...tw`flex-row justify-center  ` }}>
              <View
                style={{
                  ...tw` rounded-full overflow-hidden h-72 w-72 flex-row justify-center  items-center border-white border-2`,
                  shadowColor: "#000",
                  shadowOpacity: 1,
                  shadowRadius: 40,
                  elevation: 25,
                  shadowOffset: { width: 0, height: 5 },
                }}
              >
                <Image
                  style={{ height: height * 0.44, width: width * 0.74 }}
                  source={{
                    uri:
                      `${imageuri}` + person?.profile_path ||
                      fallBackPersonImage,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={tw`text-center mt-10`}>
            <Text style={tw`text-center text-3xl text-white`}>
              {person?.name || "N/a"}
            </Text>

            <Text style={tw`text-center text-lg text-gray-400`}>
              {person?.place_of_birth || "N/a"}
            </Text>
          </View>
          <View
            style={{
              ...tw`bg-gray-500 mx-auto mt-10 flex-row justify-between p-4 rounded-full p-5`,
            }}
          >
            <View
              style={{
                ...tw`items-center border-r-2 border-white `,
                width: width * 0.2,
              }}
            >
              <Text style={tw` text-white`}>Gender</Text>
              <Text>{person?.gender == 2 ? "Male" : "Female" || "N/a"}</Text>
            </View>
            <View
              style={{
                ...tw`items-center border-r-2 border-white `,
                width: width * 0.2,
              }}
            >
              <Text style={tw` text-white`}>Birthday</Text>
              <Text>{person?.birthday || "N/a"}</Text>
            </View>
            <View
              style={{
                ...tw`items-center border-r-2 border-white `,
                width: width * 0.2,
              }}
            >
              <Text style={tw` text-white`}>Known for</Text>
              <Text>{person?.known_for_department || "N/a"} </Text>
            </View>
            <View style={{ ...tw`items-center `, width: width * 0.2 }}>
              <Text style={tw` text-white`}>Popularity</Text>
              <Text>{person?.popularity?.toFixed(2) || "N/a"}%</Text>
            </View>
          </View>
          <View>
            <Text style={tw`text-2xl font-bold my-3 mx-6 text-white`}>
              Biography:
            </Text>
            <Text style={tw` text-base text-center text-gray-400 mx-4`}>
              {person?.biography || "N/a"}
            </Text>
          </View>
          <UpcomingMovies
            title="Movies"
            hideSeeAll={false}
            data={similarMovies}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default Character;
