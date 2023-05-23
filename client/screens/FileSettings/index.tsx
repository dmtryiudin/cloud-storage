import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileParamList } from "../Profile/types";

export const FileSettings = () => {
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  console.log(params.file);
  return <View />;
};
