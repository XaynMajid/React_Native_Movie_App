import React from 'react';
import { StyleSheet, View ,Dimensions} from 'react-native';
import tw from 'twrnc';
import * as Progress from 'react-native-progress';
// import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
let {width,height} = Dimensions.get("window")

const Loading = ({search}) => {
    return (
        <View style={{  height: search ? height * 0.8 : height,width,...tw` flex-row justify-center items-center`} } >
<Progress.CircleSnail  thickness={12} size={150}  color={"orange"} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Loading;
