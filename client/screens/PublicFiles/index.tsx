import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IResponse } from "../../models/response/IResponse";
import { IFile } from "../../models/IFile";
import FileService from "../../service/fileService";
import { Error as ErrorType } from "../../models/IError";
import {
  LoadingScreen,
  Error,
  Heading,
  FileButton,
  Input,
} from "../../components";
import { IPaginated } from "../../models/IPaginated";
import { PublicFilesStyles } from "./styles";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";
import { StackNavigation } from "../types";

export const PublicFiles = observer(() => {
  const navigation = useNavigation<StackNavigation>();
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<number>(0);
  const isFocused = useIsFocused();
  const [currentLogin, setCurrentLogin] = useState<string>("");
  const [{ isLoading, data, error }, setFiles] = useState<
    IResponse<IPaginated<IFile>>
  >({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadFiles = async () => {
    if (
      data === null ||
      data.response.length !== maxItems ||
      currentPage === 0
    ) {
      if (currentPage === 0) {
        setFiles({
          data: null,
          isLoading: true,
          error: null,
        });
      }
      try {
        const responseData = await FileService.getPublicFiles(
          currentPage.toString(),
          "18",
          currentLogin
        );
        setFiles({
          isLoading: false,
          error: null,
          data:
            data === null || currentPage === 0
              ? responseData.data
              : {
                  ...data,
                  response: [...data.response, ...responseData.data.response],
                },
        });
        setMaxItems(responseData.data.maxCount);
      } catch (error: ErrorType | any) {
        setFiles({
          isLoading: false,
          error,
          data: null,
        });
      }
    }
  };

  const refresh = async () => {
    setCurrentPage(0);
    if (currentPage === 0) {
      loadFiles();
    }
  };

  useEffect(() => {
    loadFiles();
  }, [isFocused, currentPage]);

  const loadMoreItems = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const { wrapper, wrapperWide, header, fileItem, linkText, loader } =
    PublicFilesStyles;

  const windowHeight = Dimensions.get("window").height;

  const renderLoader = () => {
    if (data === null || data.response.length !== maxItems) {
      return (
        <View style={loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <>
        <View
          style={{
            ...wrapper,
            ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View style={header}>
            <Heading label="Public files" />
          </View>
          <Input
            noError={true}
            labelText="Search file by name"
            defaultValue={currentLogin}
            onChangeText={(value: string) => setCurrentLogin(value)}
            onSubmitEditing={refresh}
          />
          <FlatList
            numColumns={3}
            style={{ height: windowHeight - 258 }}
            data={data.response}
            renderItem={({ item }) => (
              <View style={fileItem}>
                <FileButton file={item} />
              </View>
            )}
            keyExtractor={(item) => item.name}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  refresh();
                }}
              />
            }
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("PublicFolders")}
          >
            <Text style={linkText}>Public folders</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return null;
});
