import { TouchableOpacity, View, FlatList, RefreshControl } from "react-native";
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
  FolderButton,
  UploadFolderModal,
} from "../../components";
import { useIsFocused } from "@react-navigation/native";
import { IFolder } from "../../models/IFolder";
import FoldersService from "../../service/folderService";

export const FilesAndFoldersForUser = () => {
  const { wrapper, wrapperWide, header, fileItem } =
    FilesAndFoldersForUserStyles;

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const [
    { isLoading: isFilesLoading, data: filesData, error: filesError },
    setFilesForUser,
  ] = useState<IResponse<IFile[]>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const [
    { isLoading: isFoldersLoading, data: foldersData, error: foldersError },
    setFoldersForUser,
  ] = useState<IResponse<IFolder[]>>({
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

  const loadFoldersForUser = async () => {
    setFoldersForUser({
      data: null,
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await FoldersService.getFoldersForUser();
      setFoldersForUser({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error: ErrorType | any) {
      setFoldersForUser({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  useEffect(() => {
    loadFilesForUser();
    loadFoldersForUser();
  }, [isFocused]);

  if (filesError || foldersError) {
    return <Error />;
  }

  if (isFilesLoading || isFoldersLoading) {
    return <LoadingScreen />;
  }

  if (foldersData && filesData) {
    const filesAndFoldersData: any = [...filesData, ...foldersData];
    return (
      <>
        <View
          style={{
            ...wrapper,
            ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View style={header}>
            <TouchableOpacity onPress={() => setShowFileModal(true)}>
              <MaterialIcons name="file-upload" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFolderModal(true)}>
              <MaterialCommunityIcons
                name="folder-plus"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={3}
            data={filesAndFoldersData}
            renderItem={({ item }) => (
              <TouchableOpacity style={fileItem}>
                {item.files ? (
                  <FolderButton {...item} />
                ) : (
                  <FileButton {...item} />
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) =>
              item.files ? item.name + item.owner : item.name
            }
            refreshControl={
              <RefreshControl
                refreshing={isFilesLoading}
                onRefresh={() => {
                  loadFilesForUser();
                  loadFoldersForUser();
                }}
              />
            }
          />
        </View>
        <UploadFileModal
          showModal={showFileModal}
          setShowModal={setShowFileModal}
          finishedLoading={loadFilesForUser}
        />
        <UploadFolderModal
          showModal={showFolderModal}
          setShowModal={setShowFolderModal}
          finishedLoading={loadFoldersForUser}
        />
      </>
    );
  }

  return null;
};
