import {
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
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
  FolderButton,
  UploadFolderModal,
  Heading,
} from "../../components";
import { useIsFocused } from "@react-navigation/native";
import { IFolder } from "../../models/IFolder";
import FoldersService from "../../service/folderService";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxView } from "react-native-drax";

export const FilesAndFoldersForUser = () => {
  const { wrapper, wrapperWide, header, fileItem, headerButtonsWrapper } =
    FilesAndFoldersForUserStyles;

  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [chosenFolder, setChosenFolder] = useState<string>("");

  const isFocused = useIsFocused();
  const [
    { isLoading: isFilesLoading, data: filesData, error: filesError },
    setFilesForUser,
  ] = useState<IResponse<IFile[]>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [draggedFile, setDraggedFile] = useState<string>("");
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

  const setFolderForFile = async (fileHref: string, folderId: string) => {
    try {
      setFilesForUser({ data: filesData, error: filesError, isLoading: true });
      await FileService.setFolder(fileHref, folderId);
      await loadFilesForUser();
      setChosenFolder("");
    } catch (error: ErrorType | any) {
      setFoldersForUser({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

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
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <DraxProvider>
            <View
              style={{
                ...wrapper,
                ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
              }}
            >
              <View style={header}>
                <Heading label="User's files and folders" />
                <View style={headerButtonsWrapper}>
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
              </View>

              <FlatList
                numColumns={3}
                data={filesAndFoldersData}
                style={{ height: windowHeight - 120 }}
                renderItem={({ item }) =>
                  item.files ? (
                    <DraxView
                      style={fileItem}
                      onReceiveDragEnter={() => {
                        setChosenFolder(item.id);
                      }}
                      onReceiveDragExit={() => {
                        setChosenFolder("");
                      }}
                      onReceiveDragDrop={({ dragged: { payload } }) => {
                        setFolderForFile(payload, item.id);
                      }}
                    >
                      <FolderButton
                        folder={item}
                        isChosen={item.id === chosenFolder}
                      />
                    </DraxView>
                  ) : (
                    <DraxView
                      payload={item.href}
                      longPressDelay={500}
                      style={fileItem}
                      onDragStart={() => {
                        setDraggedFile(item.href);
                      }}
                      onDragEnd={() => {
                        setDraggedFile("");
                      }}
                      onDragDrop={() => {
                        setDraggedFile("");
                      }}
                    >
                      <FileButton
                        file={item}
                        isDragging={item.href === draggedFile}
                      />
                    </DraxView>
                  )
                }
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
          </DraxProvider>
        </GestureHandlerRootView>
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
