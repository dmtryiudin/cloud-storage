import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IResponse } from "../../models/response/IResponse";
import { IPaginated } from "../../models/IPaginated";
import { IFolder } from "../../models/IFolder";
import FoldersService from "../../service/folderService";
import { Error as ErrorType } from "../../models/IError";
import { PublicFoldersStyles } from "./styles";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  LoadingScreen,
  Error,
  Heading,
  FolderButton,
  Input,
} from "../../components";
import { conditionStyles } from "../../utils/conditionStyles";
import { StackNavigation } from "../types";

export const PublicFolders = () => {
  const navigation = useNavigation<StackNavigation>();
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<number>(0);
  const isFocused = useIsFocused();
  const [currentLogin, setCurrentLogin] = useState<string>("");
  const [{ isLoading, data, error }, setFolders] = useState<
    IResponse<IPaginated<IFolder>>
  >({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadFolders = async () => {
    if (
      data === null ||
      data.response.length !== maxItems ||
      currentPage === 0
    ) {
      if (currentPage === 0) {
        setFolders({
          data: null,
          isLoading: true,
          error: null,
        });
      }
      try {
        const responseData = await FoldersService.getPublicFolders(
          currentPage.toString(),
          "18",
          currentLogin
        );
        setFolders({
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
        setFolders({
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
      loadFolders();
    }
  };

  useEffect(() => {
    loadFolders();
  }, [isFocused, currentPage]);

  const loadMoreItems = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const { wrapper, wrapperWide, header, fileItem, linkText, loader } =
    PublicFoldersStyles;

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
            <Heading label="Public folders" />
          </View>
          <Input
            noError={true}
            labelText="Search folder by name"
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
                <FolderButton folder={item} />
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
          <TouchableOpacity onPress={() => navigation.navigate("PublicFiles")}>
            <Text style={linkText}>Public files</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return null;
};
