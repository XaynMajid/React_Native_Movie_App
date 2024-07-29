import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const Cast = ({ Cast }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w185";
  const fallBackPersonImage = "../assets/cast2.jpg"; // Update with the path to your fallback image

  const RenderItem1 = ({ item }) => {
    const navigation = useNavigation();

    const handler = (item) => {
      navigation.push("Character", item);
    };

    useEffect(() => {
      // console.log(Cast.profile_path);
      // console.log(Cast);
    }, [Cast]);

    return (
      <TouchableOpacity
        onPress={() => {
          handler(item);
        }}
      >
        <View
          style={tw`p-4 bg-gray-700 items-center content-center mx-2 my-2 rounded-3xl`}
        >
          <View style={tw``}>
            <Image
              source={{
                uri: item.profile_path
                  ? `${imageUrl}${item.profile_path}`
                  :"https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
              }}
              style={tw`rounded-full h-20 w-20`}
            />
          </View>
          <Text style={tw`pt-2`}>
            {item.character.length > 10
              ? item.character.slice(0, 10) + "..."
              : item.character}
          </Text>
          <Text style={tw`text-gray-400`}>
            {item.original_name.length > 10
              ? item.original_name.slice(0, 10) + "..."
              : item.original_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (!Cast || Cast.length === 0) {
    return null; // Return null or any other fallback UI when Cast is empty
  }

  return (
    <View>
      <Text style={tw`text-2xl font-bold mt-4 mx-6 text-white`}>Top Cast</Text>
      <FlatList
        data={Cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RenderItem1 item={item} />}
      />
    </View>
  );
};

export default Cast;
