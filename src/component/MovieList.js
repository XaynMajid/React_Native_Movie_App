import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const UpcomingMovies = ({ title, hideSeeAll, data }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  if (!data || data.length === 0) {
    return null; // Return null if data is empty
  }

  const RenderItem = ({ item }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
      navigation.push("Movies", item);
    };

    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <View style={tw`mx-4`}>
          <Image
            source={{ uri: `${imageUrl}${item.poster_path}` }}
            style={tw`h-70 w-40 rounded-xl`}
          />
          <Text style={tw`text-center my-1`}>
            {item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`mt-4`}>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-2xl font-bold mb-8 mx-6 text-white`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => console.log("hi")}>
            <Text style={tw`text-sm mb-8 mx-8 mt-1.5 text-yellow-300`}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id.toString()} // Assuming 'id' is unique for each item
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UpcomingMovies;
