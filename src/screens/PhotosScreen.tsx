import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPhotos } from "../store/photoSlice";
import { Photo } from "../models/photo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/models/navigation";

type PhotosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PhotosScreen"
>;

type Props = {
  navigation: PhotosScreenNavigationProp;
};

const PhotosScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { photos, status, error } = useAppSelector((state) => state.photos);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPhotos(1));
    }
  }, [dispatch, status]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchPhotos(1)).finally(() => setRefreshing(false));
  };

  const loadMore = () => {
    if (status === "succeeded" && photos.length > 0) {
      dispatch(fetchPhotos(photos.length / 10 + 1));
    }
  };

  const renderItem = ({ item }: { item: Photo }) => (
    <Pressable
      onPress={() => navigation.navigate("PhotoViewScreen", { photo: item })}
      style={styles.imageContainer}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
      <Text>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          numColumns={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default PhotosScreen;
