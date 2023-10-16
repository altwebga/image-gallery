import { Photo } from "./photo";

export type RootStackParamList = {
    PhotosScreen: undefined;
    PhotoViewScreen: { photo: Photo };
  };