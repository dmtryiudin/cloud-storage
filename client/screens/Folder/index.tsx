import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { useMediaQuery } from "react-responsive";
import { ProfileParamList } from "../Profile/types";
import { useState } from "react";
import { IResponse } from "../../models/response/IResponse";
import { IFolder } from "../../models/IFolder";

export const Folder = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const [{ isLoading, data, error }, setUserData] = useState<
    IResponse<IFolder>
  >({
    isLoading: true,
    error: null,
    data: null,
  });
  console.log(params.folderId);
  return <View></View>;
};
