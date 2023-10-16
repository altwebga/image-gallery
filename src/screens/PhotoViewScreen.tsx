import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/models/navigation";

type PhotoViewScreenRouteProp = RouteProp<
  RootStackParamList,
  "PhotoViewScreen"
>;

type Props = {
  route: PhotoViewScreenRouteProp;
};

const PhotoViewScreen: React.FC<Props> = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.url }} style={styles.image} />
      <Text style={styles.title}>{photo.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default PhotoViewScreen;
