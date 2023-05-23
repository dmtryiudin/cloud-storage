import { Dimensions, FlatList, RefreshControl, View } from "react-native";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { TrashStyles } from "./styles";
import {
  Heading,
  LoadingScreen,
  Error,
  FileButton,
  FolderButton,
} from "../../components";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IResponse } from "../../models/response/IResponse";
import { IFile } from "../../models/IFile";
import { IFolder } from "../../models/IFolder";
import FoldersService from "../../service/folderService";
import FileService from "../../service/fileService";
import { Error as ErrorType } from "../../models/IError";

export const Trash = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const { wrapper, wrapperWide, header, fileItem } = TrashStyles;
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
      const { data } = await FileService.getFilesFromTrash();
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
      const { data } = await FoldersService.getFoldersFromTrash();
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

  const windowHeight = Dimensions.get("window").height;

  if (filesError || foldersError) {
    return <Error />;
  }

  if (isFilesLoading || isFoldersLoading) {
    return <LoadingScreen />;
  }

  if (foldersData && filesData) {
    const filesAndFoldersData: any = [...filesData, ...foldersData];
    return (
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View style={header}>
          <Heading label="User's trash" />
        </View>
        <FlatList
          numColumns={3}
          keyExtractor={(item) =>
            item.files ? item.name + item.owner : item.name
          }
          style={{ height: windowHeight - 113 }}
          refreshControl={
            <RefreshControl
              refreshing={isFilesLoading}
              onRefresh={() => {
                loadFilesForUser();
                loadFoldersForUser();
              }}
            />
          }
          data={filesAndFoldersData}
          renderItem={({ item }) =>
            item.files ? (
              <View style={fileItem}>
                <FolderButton folder={item} />
              </View>
            ) : (
              <View style={fileItem}>
                <FileButton file={item} />
              </View>
            )
          }
        />
      </View>
    );
  }

  return null;
};
