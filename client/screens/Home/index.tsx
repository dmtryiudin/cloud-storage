import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IResponse } from "../../models/response/IResponse";
import { IFile } from "../../models/IFile";
import { IFolder } from "../../models/IFolder";
import FileService from "../../service/fileService";
import FoldersService from "../../service/folderService";
import { Error as ErrorType } from "../../models/IError";
import {
  LoadingScreen,
  Error,
  Heading,
  FolderButton,
  FileButton,
} from "../../components";
import { IPaginated } from "../../models/IPaginated";
import { HomeStyles } from "./styles";
import { Dimensions, FlatList, RefreshControl, View } from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";

export const Home = observer(() => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const isFocused = useIsFocused();
  const [
    { isLoading: isFilesLoading, data: filesData, error: filesError },
    setFiles,
  ] = useState<IResponse<IPaginated<IFile>>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [
    { isLoading: isFoldersLoading, data: foldersData, error: foldersError },
    setFolders,
  ] = useState<IResponse<IPaginated<IFolder>>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadFiles = async () => {
    setFiles({
      data: null,
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await FileService.getPublicFiles();
      setFiles({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error: ErrorType | any) {
      setFiles({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  const loadFolders = async () => {
    setFolders({
      data: null,
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await FoldersService.getPublicFolders();
      setFolders({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error: ErrorType | any) {
      setFolders({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  useEffect(() => {
    loadFiles();
    loadFolders();
  }, [isFocused]);

  const { wrapper, wrapperWide, header, fileItem } = HomeStyles;

  const windowHeight = Dimensions.get("window").height;

  if (filesError || foldersError) {
    return <Error />;
  }

  if (isFilesLoading || isFoldersLoading) {
    return <LoadingScreen />;
  }

  if (foldersData && filesData) {
    const filesAndFoldersData: any = [
      ...filesData.response,
      ...foldersData.response,
    ];
    return (
      <>
        <View
          style={{
            ...wrapper,
            ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View style={header}>
            <Heading label="Public files and folders" />
          </View>
          <FlatList
            numColumns={3}
            style={{ height: windowHeight - 112 }}
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
            keyExtractor={(item) =>
              item.files ? item.name + item.owner : item.name
            }
            refreshControl={
              <RefreshControl
                refreshing={isFilesLoading}
                onRefresh={() => {
                  loadFiles();
                  loadFolders();
                }}
              />
            }
          />
        </View>
      </>
    );
  }

  return null;
});
