import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileParamList } from "../Profile/types";
import { Button } from "../../components";
import FileService from "../../service/fileService";
import { IFile } from "../../models/IFile";
import { useState } from "react";
import { FileSettingsStyles } from "./styles";
import { conditionStyles } from "../../utils/conditionStyles";
import { useMediaQuery } from "react-responsive";

export const FileSettings = () => {
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const { isPublic, href } = params.file as IFile;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const { wrapper, wrapperWide } = FileSettingsStyles;

  const downloadFile = async () => {
    setIsLoading(true);
    try {
      if (isPublic) {
        await FileService.downloadFile(href);
      } else {
        await FileService.downloadProtectedFile(href);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        ...wrapper,
        ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
      }}
    >
      <Button title="Download" onPress={downloadFile} isLoading={isLoading} />
    </View>
  );
};
