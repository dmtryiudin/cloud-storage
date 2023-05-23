import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FilesAndFoldersForUserStyles } from "./styles";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { useEffect, useState } from "react";
import { IFile } from "../../models/IFile";
import { IResponse } from "../../models/response/IResponse";
import { Error as ErrorType } from "../../models/IError";
import FileService from "../../service/fileService";
import {
  FileButton,
  LoadingScreen,
  UploadFileModal,
  Error,
} from "../../components";

export const FilesAndFoldersForUser = () => {
  const { wrapper, wrapperWide, header, fileItem } =
    FilesAndFoldersForUserStyles;

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [{ isLoading, data, error }, setFilesForUser] = useState<
    IResponse<IFile[]>
  >({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadFilesForUser = async () => {
    setFilesForUser({
      data: null,
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await FileService.getFilesForUser();
      setFilesForUser({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error: ErrorType | any) {
      setFilesForUser({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  useEffect(() => {
    loadFilesForUser();
  }, []);

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View style={header}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <MaterialIcons name="file-upload" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="folder-plus"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={3}
          data={data}
          renderItem={({ item }) => (
            <View style={fileItem}>
              <FileButton {...item} />
            </View>
          )}
          keyExtractor={(item) => item.name}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadFilesForUser}
            />
          }
        />
      </View>
      <UploadFileModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};
